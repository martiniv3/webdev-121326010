const crypto = require('node:crypto');
const bcrypt = require('bcryptjs');
const userData = require('../data/userData');

function authenticate(email, password) {
  const user = userData.findByEmail(email.trim().toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) return null;
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
  userData.createSession(user.id, token, expiresAt);
  return token;
}

function getUser(token) {
  return token ? userData.findSession(token) : null;
}

function signOut(token) {
  if (token) userData.deleteSession(token);
}

module.exports = { authenticate, getUser, signOut };
