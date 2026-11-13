const express = require('express');
const { migrate } = require('./data/db');
const { router: authRouter } = require('./routes/auth');
const eventsRouter = require('./routes/events');

migrate();
const app = express();
app.get('/', (req, res) => {
  res.redirect('/login');
});
app.use(express.static('public'));
app.use(authRouter);
app.use(eventsRouter);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Club Events listening on port ${port}`));
}

module.exports = app;
