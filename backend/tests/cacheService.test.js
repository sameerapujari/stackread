const test = require('node:test');
const assert = require('node:assert');
const { memoryCache, setCachedAnalysis, getCachedAnalysis } = require('../services/cacheService');

test('LRU Cache functionality', async (t) => {
  
  await t.test('set and get basic values', async () => {
    await setCachedAnalysis('testOwner', 'testRepo1', { success: true });
    const val = await getCachedAnalysis('testOwner', 'testRepo1');
    assert.deepStrictEqual(val, { success: true });
  });

  await t.test('TTL expiration', async () => {
    // Set with 0.1s TTL
    memoryCache.set('ttlKey', 'value', 0.1);
    
    let val = memoryCache.get('ttlKey');
    assert.strictEqual(val, 'value');

    // Wait for expiration
    await new Promise(r => setTimeout(r, 150));
    
    val = memoryCache.get('ttlKey');
    assert.strictEqual(val, null);
  });

  await t.test('LRU Eviction when max size reached', async () => {
    // We configured CACHE_MAX_SIZE=100 in process.env, but we can test by filling the cache.
    // However, since it's a singleton, let's create a new instance just for this test.
    const LRUCache = memoryCache.constructor;
    const miniCache = new LRUCache(2);

    miniCache.set('k1', 'v1');
    miniCache.set('k2', 'v2');
    assert.strictEqual(miniCache.cache.size, 2);

    // Access k1 so k2 becomes the oldest
    miniCache.get('k1');
    
    // Add k3, should evict k2
    miniCache.set('k3', 'v3');
    
    assert.strictEqual(miniCache.get('k2'), null, 'k2 should be evicted');
    assert.strictEqual(miniCache.get('k1'), 'v1', 'k1 should still exist');
    assert.strictEqual(miniCache.get('k3'), 'v3', 'k3 should exist');
  });

  await t.test('Cache Stats generation', () => {
    const stats = memoryCache.stats();
    assert.ok(stats.size >= 0);
    assert.ok(stats.hits >= 0);
    assert.ok(stats.misses >= 0);
    assert.ok(typeof stats.hitRate === 'string'); // e.g. "50.00"
  });

});
