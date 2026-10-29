const { Redis } = require('@upstash/redis');
const logger = require('../utils/logger');

const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const redisConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

function buildCacheKey(owner, repo) {
  return `analysis:${owner}/${repo}`;
}

async function getCachedAnalysis(owner, repo) {
  if (!redisConfigured) return null;

  try {
    const cached = await redisClient.get(buildCacheKey(owner, repo));
    if (!cached) return null;

    return typeof cached === 'string' ? JSON.parse(cached) : cached;
  } catch (err) {
    logger.warn(`Redis cache read failed for ${owner}/${repo}: ${err.message}`);
    return null;
  }
}

async function setCachedAnalysis(owner, repo, data, ttlHours = 24) {
  if (!redisConfigured) return;

  try {
    const ttlSeconds = ttlHours * 3600;
    await redisClient.setex(buildCacheKey(owner, repo), ttlSeconds, JSON.stringify(data));
  } catch (err) {
    logger.warn(`Redis cache write failed for ${owner}/${repo}: ${err.message}`);
  }
}

async function deleteCachedAnalysis(owner, repo) {
  if (!redisConfigured) return;

  try {
    await redisClient.del(buildCacheKey(owner, repo));
  } catch (err) {
    logger.warn(`Redis cache delete failed for ${owner}/${repo}: ${err.message}`);
  }
}

async function getCacheStats() {
  if (!redisConfigured) {
    return {
      totalCached: 0,
      cachedRepos: [],
      timestamp: new Date().toISOString(),
      available: false,
    };
  }

  try {
    const keys = await redisClient.keys('analysis:*');
    return {
      totalCached: keys.length,
      cachedRepos: keys.map((key) => key.replace('analysis:', '')),
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    logger.warn(`Redis cache stats failed: ${err.message}`);
    return {
      totalCached: 0,
      cachedRepos: [],
      timestamp: new Date().toISOString(),
      available: false,
    };
  }
}

module.exports = {
  redisClient,
  getCachedAnalysis,
  setCachedAnalysis,
  deleteCachedAnalysis,
  getCacheStats,
};