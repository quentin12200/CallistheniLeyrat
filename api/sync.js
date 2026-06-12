'use strict';

const { createClient } = require('@libsql/client');

let db = null;
let dbReady = false;

function getDb() {
  if (!db) {
    let url = process.env.TURSO_URL || '';
    // Turso serverless needs https:// not libsql://
    if (url.startsWith('libsql://')) url = 'https://' + url.slice('libsql://'.length);
    if (!url) throw new Error('TURSO_URL env var not set');
    if (!process.env.TURSO_TOKEN) throw new Error('TURSO_TOKEN env var not set');
    db = createClient({ url, authToken: process.env.TURSO_TOKEN });
  }
  return db;
}

async function ensureTable() {
  if (dbReady) return;
  await getDb().execute(`
    CREATE TABLE IF NOT EXISTS profiles (
      user TEXT PRIMARY KEY,
      pin TEXT,
      data TEXT NOT NULL DEFAULT '{}',
      updated_at TEXT NOT NULL DEFAULT ''
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

async function checkPin(user, pin) {
  if (!user || !pin) return false;
  // Check env vars first (Quentin/Sophie)
  const envKey = 'PIN_' + user.toUpperCase();
  const envPin = process.env[envKey];
  if (envPin) return String(pin) === String(envPin);
  // Check DB pin for custom profiles
  const result = await getDb().execute({
    sql: 'SELECT pin FROM profiles WHERE user = ?',
    args: [user.toLowerCase()],
  });
  if (result.rows.length === 0) return false;
  return String(pin) === String(result.rows[0].pin);
}

module.exports = async function handler(req, res) {
  Object.entries(corsHeaders()).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await ensureTable();
  } catch (err) {
    console.error('DB init error:', err.message || err);
    console.error('TURSO_URL set:', !!process.env.TURSO_URL);
    console.error('TURSO_TOKEN set:', !!process.env.TURSO_TOKEN);
    return res.status(500).json({ ok: false, error: 'DB unavailable: ' + (err.message || String(err)) });
  }

  // ── GET /api/sync?action=list — liste profils custom (sans PIN) ─
  if (req.method === 'GET' && req.query.action === 'list') {
    try {
      const result = await getDb().execute('SELECT user FROM profiles WHERE pin IS NOT NULL');
      const users = result.rows.map(r => r.user);
      return res.status(200).json({ ok: true, users });
    } catch (err) {
      console.error('List error:', err.message || err);
      return res.status(500).json({ ok: false, error: 'Erreur serveur' });
    }
  }

  // ── GET /api/sync?user=X&pin=Y ─────────────────────────────────
  if (req.method === 'GET') {
    const { user, pin } = req.query;

    if (!user || !pin) {
      return res.status(400).json({ ok: false, error: 'Paramètres manquants' });
    }

    if (!await checkPin(user, pin)) {
      return res.status(401).json({ ok: false, error: 'PIN invalide' });
    }

    try {
      const result = await getDb().execute({
        sql: 'SELECT data, updated_at FROM profiles WHERE user = ?',
        args: [user.toLowerCase()],
      });

      if (result.rows.length === 0) {
        return res.status(200).json({ ok: true, data: {}, updated_at: null });
      }

      const row = result.rows[0];
      let data = {};
      try { data = JSON.parse(row.data); } catch { data = row.data; }

      return res.status(200).json({ ok: true, data, updated_at: row.updated_at });
    } catch (err) {
      console.error('GET error:', err);
      return res.status(500).json({ ok: false, error: 'Erreur serveur' });
    }
  }

  // ── POST /api/sync ─────────────────────────────────────────────
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { body = {}; }
    }

    const { action, user, pin, data } = body || {};
    const userKey = (user || '').toLowerCase().trim();

    if (!userKey || !pin) {
      return res.status(400).json({ ok: false, error: 'Paramètres manquants' });
    }

    // ── Créer un nouveau profil ──────────────────────────────────
    if (action === 'register') {
      const pinStr = String(pin);
      if (pinStr.length < 4) {
        return res.status(400).json({ ok: false, error: 'PIN trop court (4 chiffres minimum)' });
      }
      // Check user doesn't already exist
      const existing = await getDb().execute({
        sql: 'SELECT user FROM profiles WHERE user = ?',
        args: [userKey],
      });
      // Also block overwriting Quentin/Sophie env-pin profiles
      const envPin = process.env['PIN_' + userKey.toUpperCase()];
      if (existing.rows.length > 0 || envPin) {
        return res.status(409).json({ ok: false, error: 'Ce nom de profil est déjà utilisé' });
      }
      try {
        await getDb().execute({
          sql: `INSERT INTO profiles (user, pin, data, updated_at) VALUES (?, ?, '{}', ?)`,
          args: [userKey, pinStr, new Date().toISOString()],
        });
        return res.status(200).json({ ok: true });
      } catch (err) {
        console.error('Register error:', err.message || err);
        return res.status(500).json({ ok: false, error: 'Erreur création profil: ' + (err.message || 'inconnue') });
      }
    }

    // ── Sauvegarder les données ──────────────────────────────────
    if (!await checkPin(userKey, pin)) {
      return res.status(401).json({ ok: false, error: 'PIN invalide' });
    }

    const dataStr = typeof data === 'string' ? data : JSON.stringify(data || {});
    const updatedAt = new Date().toISOString();

    try {
      await getDb().execute({
        sql: `INSERT INTO profiles (user, data, updated_at)
              VALUES (?, ?, ?)
              ON CONFLICT(user) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
        args: [userKey, dataStr, updatedAt],
      });
      return res.status(200).json({ ok: true, updated_at: updatedAt });
    } catch (err) {
      console.error('POST error:', err);
      return res.status(500).json({ ok: false, error: 'Erreur serveur' });
    }
  }

  return res.status(405).json({ ok: false, error: 'Méthode non autorisée' });
};
