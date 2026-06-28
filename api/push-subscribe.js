'use strict';

const { createClient } = require('@libsql/client');

let db = null;

function getDb() {
  if (!db) {
    let url = process.env.TURSO_URL || '';
    if (url.startsWith('libsql://')) url = 'https://' + url.slice('libsql://'.length);
    if (!url) throw new Error('TURSO_URL not set');
    db = createClient({ url, authToken: process.env.TURSO_TOKEN });
  }
  return db;
}

async function ensureTable() {
  await getDb().execute(`
    CREATE TABLE IF NOT EXISTS push_subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT NOT NULL,
      endpoint TEXT NOT NULL,
      p256dh TEXT NOT NULL,
      auth TEXT NOT NULL,
      UNIQUE(user, endpoint)
    )
  `);
}

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

async function checkPin(user, pin) {
  const envPin = process.env['PIN_' + user.toUpperCase()];
  if (envPin) return String(pin) === String(envPin);
  const r = await getDb().execute({ sql: 'SELECT pin FROM profiles WHERE user = ?', args: [user] });
  if (r.rows.length === 0) return false;
  return String(pin) === String(r.rows[0].pin);
}

module.exports = async function handler(req, res) {
  Object.entries(cors()).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(204).end();

  try { await ensureTable(); } catch (err) {
    return res.status(500).json({ ok: false, error: 'DB error: ' + err.message });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { user, pin, subscription } = body || {};
  const userKey = (user || '').toLowerCase().trim();

  if (!userKey || !pin) return res.status(400).json({ ok: false, error: 'Paramètres manquants' });
  if (!await checkPin(userKey, pin)) return res.status(401).json({ ok: false, error: 'PIN invalide' });

  // POST — enregistrer ou mettre à jour un abonnement push
  if (req.method === 'POST') {
    if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
      return res.status(400).json({ ok: false, error: 'Abonnement invalide' });
    }
    try {
      await getDb().execute({
        sql: `INSERT INTO push_subscriptions (user, endpoint, p256dh, auth)
              VALUES (?, ?, ?, ?)
              ON CONFLICT(user, endpoint) DO UPDATE SET p256dh = excluded.p256dh, auth = excluded.auth`,
        args: [userKey, subscription.endpoint, subscription.keys.p256dh, subscription.keys.auth],
      });
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  // DELETE — supprimer un abonnement push
  if (req.method === 'DELETE') {
    const endpoint = subscription?.endpoint || body?.endpoint;
    if (!endpoint) return res.status(400).json({ ok: false, error: 'Endpoint manquant' });
    try {
      await getDb().execute({
        sql: 'DELETE FROM push_subscriptions WHERE user = ? AND endpoint = ?',
        args: [userKey, endpoint],
      });
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  return res.status(405).json({ ok: false, error: 'Méthode non autorisée' });
};
