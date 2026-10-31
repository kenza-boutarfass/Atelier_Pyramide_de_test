const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/db');

describe('Integration - users', () => {
  beforeAll(async () => {
    await db.query(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, nom TEXT NOT NULL)',
    );
    await db.query(
      "INSERT INTO users (id, nom) VALUES (1, 'Test') ON CONFLICT (id) DO NOTHING",
    );
  });

  test('GET / redirects to the login page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/login.html');
  });

  test('retourne 404 pour un utilisateur inconnu', async () => {
    const res = await request(app).get('/users/999');
    expect(res.status).toBe(404);
  });

  test('retourne 400 pour un identifiant invalide', async () => {
    const res = await request(app).get('/users/abc');
    expect(res.status).toBe(400);
  });

  test("résiste à une tentative d'injection SQL", async () => {
    const attaque = encodeURIComponent('1; DROP TABLE users;--');
    const res = await request(app).get('/users/' + attaque);
    expect(res.status).toBe(400);

    const { rows } = await db.query('SELECT count(*) FROM users');
    expect(Number(rows[0].count)).toBe(1);
  });

  test('GET /health returns ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
