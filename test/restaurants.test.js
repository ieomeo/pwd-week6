const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');
const model = require('../src/models/restaurantModel');

beforeEach(() => model.reset()); // 테스트마다 초기 데이터로 복원

test('GET /api/restaurants → 200, 배열', async () => {
  const res = await request(app).get('/api/restaurants');
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body.data));
});

test('GET /api/restaurants/popular → 최대 5개, 평점 내림차순', async () => {
  const { body } = await request(app).get('/api/restaurants/popular');
  assert.ok(body.data.length <= 5);
  for (let i = 1; i < body.data.length; i++) {
    assert.ok(body.data[i - 1].rating >= body.data[i].rating);
  }
});

test('GET /api/restaurants/:id 없는 id → 404', async () => {
  const res = await request(app).get('/api/restaurants/nope');
  assert.equal(res.status, 404);
});

test('POST /api/restaurants → 201', async () => {
  const res = await request(app)
    .post('/api/restaurants')
    .send({ name: '테스트식당', category: '한식', location: '수원' });
  assert.equal(res.status, 201);
  assert.equal(res.body.data.name, '테스트식당');
});

test('POST /api/restaurants 필수값 누락 → 400', async () => {
  const res = await request(app).post('/api/restaurants').send({ category: '한식' });
  assert.equal(res.status, 400);
});

test('DELETE /api/restaurants/:id → 204', async () => {
  const res = await request(app).delete('/api/restaurants/1');
  assert.equal(res.status, 204);
});
