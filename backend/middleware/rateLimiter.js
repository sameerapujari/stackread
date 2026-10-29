const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

// IP-based rate limiter (prevents abuse)
const ipRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please wait a minute before trying again.',
  },
});

// Gemini daily quota tracker (Global)
const GEMINI_QUOTA_PER_DAY = parseInt(process.env.GEMINI_QUOTA_PER_DAY, 10) || 60000;
let dailyCalls = 0;
let lastReset = new Date().toDateString();

const quotaTracker = (req, res, next) => {
  // Reset at midnight
  const today = new Date().toDateString();
  if (today !== lastReset) {
    dailyCalls = 0;
    lastReset = today;
  }

  dailyCalls++;
  
  const percentage = (dailyCalls / GEMINI_QUOTA_PER_DAY) * 100;
  
  if (percentage >= 100) {
    logger.error(`Gemini Quota Exceeded: ${dailyCalls} / ${GEMINI_QUOTA_PER_DAY}`);
    req.quotaExceeded = true;
  } else if (percentage >= 90 && dailyCalls % 100 === 0) {
    logger.warn(`Gemini Quota Warning: 90% reached (${dailyCalls} / ${GEMINI_QUOTA_PER_DAY})`);
  } else if (percentage >= 80 && dailyCalls % 100 === 0) {
    logger.warn(`Gemini Quota Warning: 80% reached (${dailyCalls} / ${GEMINI_QUOTA_PER_DAY})`);
  } else {
    req.quotaExceeded = false;
  }

  // Inject current calls into req for monitoring
  req.quotaCalls = dailyCalls;

  next();
};

const getQuotaStats = () => {
  return {
    dailyCalls,
    quotaLimit: GEMINI_QUOTA_PER_DAY,
    percentage: ((dailyCalls / GEMINI_QUOTA_PER_DAY) * 100).toFixed(2),
    isExceeded: dailyCalls >= GEMINI_QUOTA_PER_DAY
  };
};

// Export combined middleware
module.exports = {
  analyzeRateLimiter: [ipRateLimiter, quotaTracker],
  getQuotaStats,
  _resetQuotaForTesting: () => { dailyCalls = 0; } // strictly for testing
};
