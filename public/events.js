const list = document.querySelector('#events-list');
const events = window.clubEvents || [];
if (events.length === 0) {
  list.innerHTML = '<p>No upcoming events are available.</p>';
} else {
  list.innerHTML = events.map((event) => `
    <article>
      <h2>${escapeHtml(event.title)}</h2>
      <p>${escapeHtml(event.eventDate)} at ${escapeHtml(event.eventTime)}</p>
      <p>${escapeHtml(event.location)}</p>
      <p>${event.availablePlaces} available places</p>
    </article>
  `).join('');
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}
