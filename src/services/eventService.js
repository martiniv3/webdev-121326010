const eventData = require('../data/eventData');

function listUpcomingEvents() {
  return eventData.listUpcoming();
}

module.exports = { listUpcomingEvents };
