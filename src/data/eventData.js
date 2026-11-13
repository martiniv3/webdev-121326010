const { db } = require('./db');

function listUpcoming() {
  return db.prepare(`
    SELECT id, title, description, event_date AS eventDate, event_time AS eventTime,
           location, capacity, capacity AS availablePlaces
    FROM events
    WHERE event_date >= date('now')
    ORDER BY event_date, event_time, id
  `).all();
}

module.exports = { listUpcoming };
