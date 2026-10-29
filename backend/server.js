require('dotenv').config();
const express = require('express');
const cors = require('cors');
const analyzeRoutes = require('./routes/analyzeRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', analyzeRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Admin Routes
const { getCacheStats } = require('./services/redisService');
const { getQuotaStats } = require('./middleware/rateLimiter');

app.get('/api/admin/cache-stats', async (_req, res) => {
  res.json({
    cache: await getCacheStats(),
    quota: getQuotaStats(),
    timestamp: new Date().toISOString()
  });
});

// Centralized error handler (must be registered last)
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});