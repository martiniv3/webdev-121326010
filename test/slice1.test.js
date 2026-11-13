const test = require('node:test');
const assert = require('node:assert/strict');
process.env.DATABASE_PATH = ':memory:';
const app = require('../src/app');

let server;
let baseUrl;
test.before(() => new Promise((resolve) => {
  server = app.listen(0, () => {
    baseUrl = `http://127.0.0.1:${server.address().port}`;
    resolve();
  });
}));
test.after(() => server.close());

async function get(path, options = {}) {
  return fetch(`${baseUrl}${path}`, { redirect: 'manual', ...options });
}

test('AC-9 unauthenticated visitors are redirected to login', async () => {
  const response = await get('/events');
  assert.equal(response.status, 302);
  assert.equal(response.headers.get('location'), '/login');
});

test('AC-10 seeded user sees three upcoming events', async () => {
  const login = await get('/login', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'email=student%40example.com&password=password'
  });
  assert.equal(login.status, 302);
  const page = await get('/events', { headers: { cookie: login.headers.get('set-cookie') } });
  const html = await page.text();
  assert.equal(page.status, 200);
  assert.match(html, /Welcome Mixer/);
  assert.match(html, /Board Games Night/);
  assert.match(html, /Campus Clean-up/);
});

test('AC-11 deleted events disappear after reload', async () => {
  const { db } = require('../src/data/db');
  db.prepare('DELETE FROM events WHERE id = 3').run();
  const login = await get('/login', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'email=student%40example.com&password=password'
  });
  const page = await get('/events', { headers: { cookie: login.headers.get('set-cookie') } });
  assert.doesNotMatch(await page.text(), /Campus Clean-up/);
});
