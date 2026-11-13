const { db } = require('./db');

function findByEmail(email) {
  return db.prepare('SELECT id, email, password_hash AS passwordHash FROM users WHERE email = ?').get(email);
}

function createSession(userId, token, expiresAt) {
  db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').run(token, userId, expiresAt);
}

function findSession(token) {
  return db.prepare(`
    SELECT sessions.token, sessions.user_id AS userId, users.email
    FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE sessions.token = ? AND sessions.expires_at > datetime('now')
  `).get(token);
}

function deleteSession(token) {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

module.exports = { findByEmail, createSession, findSession, deleteSession };
