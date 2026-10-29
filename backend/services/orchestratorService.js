const logger = require('../utils/logger');
const {
  analyzeStructure,
  analyzeLearningPath,
  analyzeContribution
} = require('./geminiAnalyzerService');
const { getCachedStage, setCachedStage } = require('./cacheService');
const {
  getCachedAnalysis: getRedisCachedAnalysis,
  setCachedAnalysis: setRedisCachedAnalysis,
} = require('./redisService');

// Fallback generators
function getFallbackStructure(repoData) {
  const { metadata, languages, contents } = repoData;
  const dirs = (contents || []).filter(c => c.type === 'dir').map(c => c.name);
  const files = (contents || []).filter(c => c.type === 'file').map(c => c.name);
  return {
    projectPurpose: metadata?.description || 'No description available.',
    techStack: languages ? Object.keys(languages).slice(0, 5) : ['Unknown'],
    architectureOverview: `Repository with ${dirs.length} directories and ${files.length} files at root.`,
    importantDirectories: dirs.slice(0, 3).map(name => ({ name, purpose: 'Core directory' })),
    importantFiles: files.slice(0, 3).map(name => ({ name, purpose: 'Configuration or entry point' }))
  };
}

function getFallbackLearningPath(repoData, structureAnalysis) {
  return {
    suggestedReadingOrder: ['README.md', 'src/ or main logic folder'],
    conceptsToLearn: structureAnalysis?.techStack || ['Basic programming concepts'],
    difficultyLevel: 'Intermediate',
    whereToStart: 'Start by reading the README thoroughly.',
    estimatedTime: 'A few hours'
  };
}

function getFallbackContribution(repoData, structureAnalysis) {
  return {
    contributionTips: ['Look for "good first issue" tags', 'Read CONTRIBUTING.md if available'],
    setupInstructions: 'Clone the repo and follow standard setup for the identified tech stack.',
    commonPitfalls: ['Not running tests before pushing', 'Ignoring linting rules']
  };
}

async function orchestrateAnalysis(repoData, options = {}) {
  const { quotaExceeded = false } = options;
  const owner = options.owner || repoData.metadata?.owner;
  const repo = options.repo || repoData.metadata?.repo;

  if (owner && repo) {
    const cached = await getRedisCachedAnalysis(owner, repo);
    if (cached) {
      logger.info(`Redis cache hit: ${owner}/${repo}`);
      return {
        ...cached,
        _source: 'redis',
        _cachedAt: new Date().toISOString(),
      };
    }
    logger.info(`Redis cache miss: ${owner}/${repo}, running analysis`);
  } else {
    logger.warn('Redis cache skipped because repository owner or name is unavailable');
  }

  logger.info(`Starting orchestrated analysis for ${repoData.metadata?.name || 'repo'} (Quota Exceeded: ${quotaExceeded})`);
  
  const startTimeTotal = performance.now();
  const sources = []; // Track cache vs gemini vs fallback

  // --- STAGE 1: Structure ---
  const startTimeStage1 = performance.now();
  let structureAnalysis = await getCachedStage(owner, repo, 'stage1');
  if (structureAnalysis) {
    sources.push('cache:stage1');
  } else {
    try {
      if (quotaExceeded) throw new Error('Quota exceeded');
      structureAnalysis = await analyzeStructure(repoData);
      setCachedStage(owner, repo, 'stage1', structureAnalysis);
      sources.push('gemini:stage1');
    } catch (err) {
      logger.warn(`Stage 1 failed/skipped, using fallback: ${err.message}`);
      structureAnalysis = getFallbackStructure(repoData);
      sources.push('fallback:stage1');
    }
  }
  const stage1Time = Math.round(performance.now() - startTimeStage1);

  // --- STAGE 2: Learning Path ---
  const startTimeStage2 = performance.now();
  let learningPath = await getCachedStage(owner, repo, 'stage2');
  if (learningPath) {
    sources.push('cache:stage2');
  } else {
    try {
      if (quotaExceeded) throw new Error('Quota exceeded');
      learningPath = await analyzeLearningPath(repoData, structureAnalysis);
      setCachedStage(owner, repo, 'stage2', learningPath);
      sources.push('gemini:stage2');
    } catch (err) {
      logger.warn(`Stage 2 failed/skipped, using fallback: ${err.message}`);
      learningPath = getFallbackLearningPath(repoData, structureAnalysis);
      sources.push('fallback:stage2');
    }
  }
  const stage2Time = Math.round(performance.now() - startTimeStage2);

  // --- STAGE 3: Contribution ---
  const startTimeStage3 = performance.now();
  let contribution = await getCachedStage(owner, repo, 'stage3');
  if (contribution) {
    sources.push('cache:stage3');
  } else {
    try {
      if (quotaExceeded) throw new Error('Quota exceeded');
      contribution = await analyzeContribution(repoData, structureAnalysis);
      setCachedStage(owner, repo, 'stage3', contribution);
      sources.push('gemini:stage3');
    } catch (err) {
      logger.warn(`Stage 3 failed/skipped, using fallback: ${err.message}`);
      contribution = getFallbackContribution(repoData, structureAnalysis);
      sources.push('fallback:stage3');
    }
  }
  const stage3Time = Math.round(performance.now() - startTimeStage3);

  const totalTime = Math.round(performance.now() - startTimeTotal);
  logger.info(`Orchestrated analysis completed in ${totalTime}ms`);

  const result = {
    ...structureAnalysis,
    ...learningPath,
    ...contribution,
    _analysisMetadata: {
      stage1Time,
      stage2Time,
      stage3Time,
      totalTime,
      sources
    }
  };

  if (owner && repo) {
    await setRedisCachedAnalysis(owner, repo, result, 24);
  }

  return { ...result, _source: 'gemini' };
}

module.exports = {
  orchestrateAnalysis
};
