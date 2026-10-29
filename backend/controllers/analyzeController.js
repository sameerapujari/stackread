const { fetchRepoDataConcurrently } = require('../services/githubService');
const { generateAnalysis } = require('../services/geminiService');
const logger = require('../utils/logger');

async function analyzeRepository(req, res, next) {
  const startTime = performance.now();
  try {
    const { repoOwner: owner, repoName: repo, quotaExceeded, quotaCalls } = req;

    // Fetch all GitHub data concurrently; the orchestrator checks Redis before Gemini.
    const repoData = await fetchRepoDataConcurrently(owner, repo);
    
    // Ensure metadata contains owner/repo so orchestrator can use it for cache keys
    if (!repoData.metadata.owner) repoData.metadata.owner = owner;
    if (!repoData.metadata.repo) repoData.metadata.repo = repo;

    // Generate AI analysis from collected data (via orchestrator)
    const analysis = await generateAnalysis(repoData, { quotaExceeded, owner, repo });

    // Build response
    const response = {
      metadata: repoData.metadata,
      languages: repoData.languages,
      contents: repoData.contents,
      packageJson: repoData.packageJson,
      fileTree: repoData.fileTree,
      analysis,
    };

    const responseTime = Math.round(performance.now() - startTime);
    logger.info(JSON.stringify({
      repo: `${owner}/${repo}`,
      timestamp: new Date().toISOString(),
      stages: analysis._analysisMetadata?.sources || [],
      responseTime,
      source: analysis._source || 'gemini',
      geminiQuotaUsage: quotaCalls
    }));

    return res.json({
      success: true,
      fromCache: false,
      _cached: false,
      ...response,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { analyzeRepository };
