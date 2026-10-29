const logger = require('../utils/logger');

const CACHE_TTL_HOURS = parseInt(process.env.CACHE_TTL_HOURS, 10) || 24;
const CACHE_MAX_SIZE = parseInt(process.env.CACHE_MAX_SIZE, 10) || 100;

class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  get(key) {
    if (!this.cache.has(key)) {
      this.misses++;
      return null;
    }
    
    const item = this.cache.get(key);
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, item);
    this.hits++;
    return item.value;
  }

  set(key, value, ttlSeconds = CACHE_TTL_HOURS * 3600) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      this.autoEvict();
    }

    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { value, expiresAt });
  }

  delete(key) {
    this.cache.delete(key);
  }

  autoEvict() {
    // Evict oldest (first item in Map)
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.cache.delete(firstKey);
      logger.info(`Evicted ${firstKey} from cache due to max size`);
    }
  }

  stats() {
    const total = this.hits + this.misses;
    const hitRate = total === 0 ? 0 : (this.hits / total) * 100;
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: hitRate.toFixed(2),
      hits: this.hits,
      misses: this.misses
    };
  }
}

const memoryCache = new LRUCache(CACHE_MAX_SIZE);

// Helper specific to repos
function buildCacheKey(owner, repo) {
  return `analysis:${owner}:${repo}`;
}

// Stage specific cache key
function buildStageCacheKey(owner, repo, stage) {
  return `analysis:${owner}:${repo}:${stage}`;
}

async function getCachedAnalysis(owner, repo) {
  const data = memoryCache.get(buildCacheKey(owner, repo));
  if (data) {
    logger.info(`Cache HIT for full analysis: ${owner}/${repo}`);
  } else {
    logger.info(`Cache MISS for full analysis: ${owner}/${repo}`);
  }
  return data;
}

async function setCachedAnalysis(owner, repo, data) {
  memoryCache.set(buildCacheKey(owner, repo), data);
  logger.info(`Cached full analysis for ${owner}/${repo}`);
}

async function getCachedStage(owner, repo, stage) {
  const data = memoryCache.get(buildStageCacheKey(owner, repo, stage));
  if (data) {
    logger.info(`Cache HIT for stage ${stage}: ${owner}/${repo}`);
  }
  return data;
}

async function setCachedStage(owner, repo, stage, data) {
  memoryCache.set(buildStageCacheKey(owner, repo, stage), data);
}

module.exports = { 
  memoryCache, 
  getCachedAnalysis, 
  setCachedAnalysis, 
  getCachedStage, 
  setCachedStage 
};
