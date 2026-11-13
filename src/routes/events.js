const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const authService = require('../services/authService');
const eventService = require('../services/eventService');
const { cookieToken } = require('./auth');

const router = express.Router();

router.get('/events', (request, response) => {
  if (!authService.getUser(cookieToken(request))) return response.redirect('/login');
  const template = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'events.html'), 'utf8');
  const events = JSON.stringify(eventService.listUpcomingEvents()).replace(/</g, '\\u003c');
  response.type('html').send(template.replace('__EVENTS_JSON__', events));
});

module.exports = router;
