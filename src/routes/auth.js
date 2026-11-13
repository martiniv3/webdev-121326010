const express = require('express');
const authService = require('../services/authService');

const router = express.Router();

function cookieToken(request) {
  const match = request.headers.cookie?.match(/(?:^|;\s*)session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

router.get('/login', (request, response) => {
  if (authService.getUser(cookieToken(request))) return response.redirect('/events');
  response.sendFile('login.html', { root: 'public' });
});

router.post('/login', express.urlencoded({ extended: false }), (request, response) => {
  const token = authService.authenticate(request.body.email || '', request.body.password || '');
  if (!token) return response.status(401).sendFile('login.html', { root: 'public' });
  response.setHeader('Set-Cookie', `session=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/`);
  response.redirect('/events');
});

router.post('/logout', (request, response) => {
  authService.signOut(cookieToken(request));
  response.setHeader('Set-Cookie', 'session=; Max-Age=0; HttpOnly; SameSite=Lax; Path=/');
  response.redirect('/login');
});

module.exports = { router, cookieToken };
