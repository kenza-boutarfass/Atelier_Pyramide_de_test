const express = require('express');
const path = require('path');
const { query } = require('./db');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', async (_req, res) => {
  try {
    await query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (error) {
    res.json({ status: 'ok', db: 'unavailable' });
  }
});

module.exports = app;
