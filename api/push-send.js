'use strict';

const webpush = require('web-push');
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

const MOTIVATION_MSGS = [
  "La régularité, c'est ton super-pouvoir. Pas besoin d'être parfait, juste présent. 💪",
  "Chaque séance compte, même la plus courte. Tu n'as pas à tout déchirer aujourd'hui.",
  "Le secret du sport ? Recommencer. Encore. Et encore. 🔥",
  "Pas motivé ? Normal. Les champions s'entraînent aussi les jours sans envie.",
  "5 minutes suffisent pour démarrer. Et souvent, on continue bien plus. 🚀",
  "Ton corps se souvient de chaque effort. Même ceux que tu as oublié.",
  "Ce n'est pas une question de force. C'est une question d'habitude. 🌱",
  "Quand tu ne veux pas, c'est exactement le bon moment. C'est là que ça compte.",
  "Chaque effort d'aujourd'hui est un cadeau pour ton futur toi. 🎁",
  "Tu n'as pas à être motivé pour commencer. Tu dois juste commencer. ⚡",
];

// Les données sync sont stockées comme strings dans un objet plat
// done_1, done_2... notifEnabled="true", notifTime="08:00", startDate="2024-01-01"
function parseUserData(rawData) {
  const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
  return {
    notifEnabled: data.notifEnabled === 'true' || data.notifEnabled === true,
    notifTime: data.notifTime || '08:00',
    startDate: data.startDate || null,
    notifSentDate: data.notifSentDate || '',
    // Done sessions: data.done_1, data.done_2, ...
    isDone: (day) => !!(data['done_' + day]),
  };
}

function dayNumber(startDate) {
  const start = new Date(startDate + 'T00:00:00Z');
  const now = new Date();
  return Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
}

function pickMsg(parsed) {
  const { startDate, isDone } = parsed;
  if (!startDate) return MOTIVATION_MSGS[Math.floor(Math.random() * MOTIVATION_MSGS.length)];

  const today = dayNumber(startDate);
  let streak = 0;
  for (let i = today - 1; i >= 1; i--) {
    if (isDone(i)) streak++;
    else break;
  }
  let daysSinceLast = 0;
  for (let i = today - 1; i >= 1; i--) {
    if (isDone(i)) break;
    daysSinceLast++;
  }

  if (daysSinceLast >= 3) return `${daysSinceLast} jours sans séance… et alors ? Tu reprends aujourd'hui. 💪`;
  if (daysSinceLast === 2) return "Hier et avant-hier tu as soufflé. Aujourd'hui on repart ! 🔥";
  if (streak >= 14) return `${streak} jours de suite — tu es une machine. Continue ! 👑`;
  if (streak >= 7) return `${streak} jours consécutifs ! La régularité paie. 🔥`;
  if (streak >= 3) return `${streak} jours d'affilée. Tu construis quelque chose de solide. ⭐`;
  return MOTIVATION_MSGS[Math.floor(Math.random() * MOTIVATION_MSGS.length)];
}

module.exports = async function handler(req, res) {
  const cronSecret = process.env.CRON_SECRET || '';
  if (cronSecret) {
    const authHeader = req.headers['authorization'] || '';
    if (authHeader !== 'Bearer ' + cronSecret) {
      return res.status(401).json({ ok: false, error: 'Non autorisé' });
    }
  }

  const vapidPublic = process.env.VAPID_PUBLIC_KEY;
  const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
  if (!vapidPublic || !vapidPrivate) {
    return res.status(500).json({ ok: false, error: 'VAPID keys not configured' });
  }

  webpush.setVapidDetails('mailto:leyrat.quentin@gmail.com', vapidPublic, vapidPrivate);

  let subscriptions, profiles;
  try {
    const [subRes, profRes] = await Promise.all([
      getDb().execute('SELECT user, endpoint, p256dh, auth FROM push_subscriptions'),
      getDb().execute('SELECT user, data FROM profiles'),
    ]);
    subscriptions = subRes.rows;
    profiles = {};
    profRes.rows.forEach(r => {
      try { profiles[r.user] = parseUserData(r.data); } catch {}
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'DB error: ' + err.message });
  }

  const nowUTC = new Date();
  // Heure locale France (UTC+2 en été, UTC+1 en hiver — on utilise UTC+2 pour être sûr)
  const frMins = (nowUTC.getUTCHours() * 60 + nowUTC.getUTCMinutes() + 120) % (24 * 60);
  const frDate = new Date(nowUTC.getTime() + 120 * 60000).toISOString().slice(0, 10);

  let sent = 0, skipped = 0, failed = 0;

  for (const sub of subscriptions) {
    const parsed = profiles[sub.user];
    if (!parsed || !parsed.notifEnabled || !parsed.startDate) { skipped++; continue; }

    const [h, m] = parsed.notifTime.split(':').map(Number);
    const targetMins = h * 60 + m;

    // Envoyer seulement si l'heure configurée est dans la fenêtre courante (±60 min)
    if (Math.abs(frMins - targetMins) > 60) { skipped++; continue; }

    // Session déjà faite aujourd'hui ?
    const today = dayNumber(parsed.startDate);
    if (parsed.isDone(today)) { skipped++; continue; }

    // Déjà notifié aujourd'hui ?
    if (parsed.notifSentDate === frDate) { skipped++; continue; }

    const body = pickMsg(parsed);
    const payload = JSON.stringify({ title: 'CallistheniLeyrat 🏋️', body });

    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload,
        { TTL: 3600 }
      );
      sent++;
    } catch (err) {
      if (err.statusCode === 410) {
        await getDb().execute({
          sql: 'DELETE FROM push_subscriptions WHERE endpoint = ?',
          args: [sub.endpoint],
        }).catch(() => {});
      }
      failed++;
    }
  }

  return res.status(200).json({ ok: true, sent, skipped, failed });
};
