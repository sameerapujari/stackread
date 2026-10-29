const express = require('express');
const { analyzeRepository } = require('../controllers/analyzeController');
const validateUrl = require('../middleware/validateUrl');
const { analyzeRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/analyze', analyzeRateLimiter, validateUrl, analyzeRepository);

module.exports = router;
