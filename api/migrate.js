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

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// Map email → Turso username + PIN source
const EMAIL_MAP = {
  'leyrat.quentin@gmail.com': { user: 'quentin', pinEnv: 'PIN_QUENTIN' },
  'so.leyrat@gmail.com':      { user: 'sophie',  pinEnv: 'PIN_SOPHIE' },
};

module.exports = async function handler(req, res) {
  Object.entries(cors()).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();

  let body = req.body || {};
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }

  const { email } = body;
  const mapping = EMAIL_MAP[email];
  if (!mapping) return res.status(404).json({ ok: false, error: 'Utilisateur non trouvé' });

  const pin = process.env[mapping.pinEnv];
  if (!pin) return res.status(500).json({ ok: false, error: 'PIN non configuré' });

  try {
    const result = await getDb().execute({
      sql: 'SELECT data FROM profiles WHERE user = ? AND pin = ?',
      args: [mapping.user, pin],
    });
    if (!result.rows.length) return res.status(404).json({ ok: false, error: 'Données introuvables' });

    const raw = result.rows[0].data;
    const data = typeof raw === 'string' ? JSON.parse(raw) : (raw || {});
    return res.status(200).json({ ok: true, data });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
