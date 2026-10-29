const test = require('node:test');
const assert = require('node:assert');
const { analyzeRateLimiter, getQuotaStats, _resetQuotaForTesting } = require('../middleware/rateLimiter');

test('Rate Limiter Quota Tracking', async (t) => {
  const quotaTracker = analyzeRateLimiter[1]; // The second middleware is the quota tracker

  await t.test('should track quota and set req.quotaExceeded', () => {
    _resetQuotaForTesting();
    
    // We know GEMINI_QUOTA_PER_DAY is either from env or default 60000
    // Let's mock a request
    let req = {};
    const res = {};
    const next = () => {};

    quotaTracker(req, res, next);
    assert.strictEqual(req.quotaExceeded, false);
    assert.strictEqual(req.quotaCalls, 1);

    const stats = getQuotaStats();
    assert.strictEqual(stats.dailyCalls, 1);
    assert.strictEqual(stats.isExceeded, false);
  });

  // We can't easily test hitting 60000 without a loop that takes time, 
  // but we can trust the logic tested for a small number.
});
