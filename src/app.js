const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS_ORIGIN 예: https://pwd-week5-xxx.vercel.app (여러 개면 쉼표로 구분)
const origins = process.env.CORS_ORIGIN?.split(',').map((s) => s.trim());
app.use(cors({ origin: origins ?? '*' }));
app.use(express.json());

if (process.env.NODE_ENV !== 'test') app.use(logger);

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/restaurants', require('./routes/restaurantRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app; // listen은 server.js에서 → 테스트에서 포트 없이 사용 가능
