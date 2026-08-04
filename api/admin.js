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
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function isAdmin(pin) {
  const adminPin = process.env.PIN_QUENTIN;
  if (!adminPin) return false;
  return String(pin) === String(adminPin);
}

function parseUserData(raw) {
  try {
    const d = typeof raw === 'string' ? JSON.parse(raw) : (raw || {});
    const startDate = d.startDate || null;
    let sessions = 0, streak = 0, lastSessionDay = 0;

    if (startDate) {
      const dayNum = Math.floor((Date.now() - new Date(startDate + 'T00:00:00Z').getTime()) / 86400000) + 1;
      for (let i = 1; i <= dayNum; i++) {
        if (d['done_' + i]) { sessions++; lastSessionDay = i; }
      }
      for (let i = dayNum; i >= 1; i--) {
        if (d['done_' + i] || (d['rythm'] && !d['done_' + i] && false)) streak++;
        else break;
      }
    }

    return {
      startDate,
      sessions,
      streak,
      lastSessionDay,
      notifEnabled: d.notifEnabled === 'true' || d.notifEnabled === true,
      notifTime: d.notifTime || null,
      level: d.level || 'facile',
      xp: parseInt(d.xp) || 0,
    };
  } catch { return { sessions: 0, streak: 0, lastSessionDay: 0 }; }
}

module.exports = async function handler(req, res) {
  Object.entries(cors()).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(204).end();

  // Auth — Quentin uniquement
  const pin = req.method === 'GET' ? req.query.pin : (req.body?.pin || '');
  if (!isAdmin(pin)) return res.status(401).json({ ok: false, error: 'Accès refusé' });

  // ── GET ?action=users — liste tous les utilisateurs avec leurs stats
  if (req.method === 'GET' && req.query.action === 'users') {
    try {
      const result = await getDb().execute('SELECT user, pin, data, updated_at FROM profiles WHERE pin IS NOT NULL');
      const users = result.rows.map(r => ({
        user: r.user,
        hasPin: !!r.pin,
        updatedAt: r.updated_at,
        ...parseUserData(r.data),
      }));
      return res.status(200).json({ ok: true, users });
    } catch (err) {
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  // ── POST — actions admin
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
    const { action, targetUser, newPin } = body || {};

    // Réinitialiser le PIN d'un utilisateur
    if (action === 'reset-pin') {
      if (!targetUser || !newPin) return res.status(400).json({ ok: false, error: 'Paramètres manquants' });
      const pinStr = String(newPin);
      if (pinStr.length < 4) return res.status(400).json({ ok: false, error: 'PIN trop court (4 min)' });

      // Bloquer la réinitialisation des comptes env-var (Quentin/Sophie gérés par env)
      const envPin = process.env['PIN_' + targetUser.toUpperCase()];
      if (envPin) return res.status(400).json({ ok: false, error: 'Ce compte est géré par variable d\'environnement' });

      try {
        await getDb().execute({
          sql: 'UPDATE profiles SET pin = ? WHERE user = ?',
          args: [pinStr, targetUser.toLowerCase()],
        });
        return res.status(200).json({ ok: true, message: `PIN de ${targetUser} mis à jour` });
      } catch (err) {
        return res.status(500).json({ ok: false, error: err.message });
      }
    }

    return res.status(400).json({ ok: false, error: 'Action inconnue' });
  }

  return res.status(405).json({ ok: false, error: 'Méthode non autorisée' });
};
