const test = require('node:test');
const assert = require('node:assert');
const { orchestrateAnalysis } = require('../services/orchestratorService');

test('Orchestrator Service Partial Caching and Fallbacks', async (t) => {
  
  const mockRepoData = {
    metadata: { owner: 'testOwner', repo: 'testRepo', name: 'testRepo', description: 'desc' },
    languages: { JavaScript: 100 },
    contents: [{ name: 'src', type: 'dir' }]
  };

  await t.test('should return fallbacks when quotaExceeded is true without throwing', async () => {
    // If quotaExceeded is true, Gemini calls should throw internally and fallbacks should be caught and returned.
    const result = await orchestrateAnalysis(mockRepoData, { quotaExceeded: true });

    // Verify fallbacks were returned
    assert.strictEqual(result.projectPurpose, 'desc');
    assert.strictEqual(result.techStack[0], 'JavaScript');
    assert.strictEqual(result.difficultyLevel, 'Intermediate');
    
    // Verify sources in metadata are all fallback
    assert.ok(result._analysisMetadata.sources.includes('fallback:stage1') || result._analysisMetadata.sources.includes('cache:stage1'));
  });

});
