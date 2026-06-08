'use strict';

const { createClient } = require('@libsql/client');

let db = null;
let dbReady = false;

function getDb() {
  if (!db) {
    db = createClient({
      url: process.env.TURSO_URL,
      authToken: process.env.TURSO_TOKEN,
    });
  }
  return db;
}

async function ensureTable() {
  if (dbReady) return;
  await getDb().execute(`
    CREATE TABLE IF NOT EXISTS profiles (
      user TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  dbReady = true;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function checkPin(user, pin) {
  if (!user || !pin) return false;
  const envKey = 'PIN_' + user.toUpperCase();
  const expected = process.env[envKey];
  if (!expected) return false;
  return String(pin) === String(expected);
}

module.exports = async function handler(req, res) {
  // Set CORS headers on every response
  Object.entries(corsHeaders()).forEach(([k, v]) => res.setHeader(k, v));

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    await ensureTable();
  } catch (err) {
    console.error('DB init error:', err);
    return res.status(500).json({ ok: false, error: 'DB unavailable' });
  }

  // ── GET /api/sync?user=quentin&pin=010820 ──────────────────────
  if (req.method === 'GET') {
    const { user, pin } = req.query;

    if (!user || !pin) {
      return res.status(400).json({ ok: false, error: 'Paramètres manquants' });
    }

    if (!checkPin(user, pin)) {
      return res.status(401).json({ ok: false, error: 'PIN invalide' });
    }

    try {
      const result = await getDb().execute({
        sql: 'SELECT data, updated_at FROM profiles WHERE user = ?',
        args: [user.toLowerCase()],
      });

      if (result.rows.length === 0) {
        // Valid PIN but no data stored yet — return empty profile
        return res.status(200).json({ ok: true, data: {}, updated_at: null });
      }

      const row = result.rows[0];
      let data = null;
      try {
        data = JSON.parse(row.data);
      } catch {
        data = row.data;
      }

      return res.status(200).json({ ok: true, data, updated_at: row.updated_at });
    } catch (err) {
      console.error('GET error:', err);
      return res.status(500).json({ ok: false, error: 'Erreur serveur' });
    }
  }

  // ── POST /api/sync  body: { user, pin, data } ──────────────────
  if (req.method === 'POST') {
    let body = req.body;

    // Parse body if it's a string (some Vercel configs)
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { body = {}; }
    }

    const { user, pin, data } = body || {};

    if (!user || !pin || data === undefined) {
      return res.status(400).json({ ok: false, error: 'Paramètres manquants' });
    }

    if (!checkPin(user, pin)) {
      return res.status(401).json({ ok: false, error: 'PIN invalide' });
    }

    const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
    const updatedAt = new Date().toISOString();

    try {
      await getDb().execute({
        sql: `INSERT INTO profiles (user, data, updated_at)
              VALUES (?, ?, ?)
              ON CONFLICT(user) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
        args: [user.toLowerCase(), dataStr, updatedAt],
      });

      return res.status(200).json({ ok: true, updated_at: updatedAt });
    } catch (err) {
      console.error('POST error:', err);
      return res.status(500).json({ ok: false, error: 'Erreur serveur' });
    }
  }

  return res.status(405).json({ ok: false, error: 'Méthode non autorisée' });
};
