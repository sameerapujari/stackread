const logger = require('../utils/logger');
// We require the service lazily or at module level but use its exported runGeminiPrompt
const { runGeminiPrompt } = require('./geminiService');

async function analyzeStructure(repoData) {
  const { metadata, languages, contents } = repoData;
  const languageList = Object.entries(languages || {})
    .sort(([, a], [, b]) => b - a)
    .map(([lang]) => lang)
    .join(', ');

  const fileTree = (contents || [])
    .map((item) => `${item.type === 'dir' ? '📁' : '📄'} ${item.name}`)
    .join('\n');

  const prompt = `You are an expert software engineer. Analyze the structure of this GitHub repository.
Project: ${metadata?.name}
Description: ${metadata?.description}
Languages: ${languageList}

Root file structure:
${fileTree}

Return ONLY valid JSON. Do not include markdown code fences (e.g. no \`\`\`json).
Error Example: \`\`\`json { ... } \`\`\` -> BAD. { ... } -> GOOD.

Expected JSON schema:
{
  "projectPurpose": "2-3 sentence explanation of what this project does",
  "techStack": ["list of technologies used"],
  "architectureOverview": "2-3 sentence description of how the codebase is organized",
  "importantDirectories": [{ "name": "dir name", "purpose": "why it matters" }],
  "importantFiles": [{ "name": "file name", "purpose": "why a beginner should read it" }]
}`;

  try {
    const text = await runGeminiPrompt(prompt);
    return JSON.parse(text);
  } catch (err) {
    logger.error(`Structure analysis failed: ${err.message}`);
    const dirs = (contents || []).filter(c => c.type === 'dir').map(c => c.name);
    const files = (contents || []).filter(c => c.type === 'file').map(c => c.name);
    return {
      projectPurpose: metadata?.description || 'No description available.',
      techStack: languageList ? languageList.split(', ') : ['Unknown'],
      architectureOverview: `Repository with ${dirs.length} directories and ${files.length} files at root.`,
      importantDirectories: dirs.slice(0, 3).map(name => ({ name, purpose: 'Core directory' })),
      importantFiles: files.slice(0, 3).map(name => ({ name, purpose: 'Configuration or entry point' }))
    };
  }
}

async function analyzeLearningPath(repoData, structureAnalysis) {
  const { readme } = repoData;
  // Limit README to avoid context bloat
  const truncatedReadme = (readme || '').substring(0, 6000);
  const techStack = structureAnalysis?.techStack?.join(', ') || 'Unknown';

  const prompt = `You are an expert mentor. Create a learning path for a beginner exploring this repository.
Tech Stack: ${techStack}

README (truncated):
${truncatedReadme}

Return ONLY valid JSON. Do not include markdown code fences (e.g. no \`\`\`json).
Error Example: \`\`\`json { ... } \`\`\` -> BAD. { ... } -> GOOD.

Expected JSON schema:
{
  "suggestedReadingOrder": ["file/dir name with brief reason"],
  "conceptsToLearn": ["list of concepts a beginner should understand"],
  "difficultyLevel": "Beginner / Intermediate / Advanced",
  "whereToStart": "specific advice on where to start exploring",
  "estimatedTime": "realistic time estimate to understand basics"
}`;

  try {
    const text = await runGeminiPrompt(prompt);
    return JSON.parse(text);
  } catch (err) {
    logger.error(`Learning path analysis failed: ${err.message}`);
    return {
      suggestedReadingOrder: ['README.md', 'src/ or main logic folder'],
      conceptsToLearn: structureAnalysis?.techStack || ['Basic programming concepts'],
      difficultyLevel: 'Intermediate',
      whereToStart: 'Start by reading the README thoroughly.',
      estimatedTime: 'A few hours'
    };
  }
}

async function analyzeContribution(repoData, structureAnalysis) {
  const techStack = structureAnalysis?.techStack?.join(', ') || 'Unknown';
  const purpose = structureAnalysis?.projectPurpose || 'Unknown';

  const prompt = `You are an expert open-source maintainer. Provide contribution guidance for this project.
Project Purpose: ${purpose}
Tech Stack: ${techStack}

Return ONLY valid JSON. Do not include markdown code fences (e.g. no \`\`\`json).
Error Example: \`\`\`json { ... } \`\`\` -> BAD. { ... } -> GOOD.

Expected JSON schema:
{
  "contributionTips": ["practical tips for making a first contribution"],
  "setupInstructions": "brief summary of how to run locally based on standard conventions for this stack",
  "commonPitfalls": ["things beginners might get wrong with this stack"]
}`;

  try {
    const text = await runGeminiPrompt(prompt);
    return JSON.parse(text);
  } catch (err) {
    logger.error(`Contribution analysis failed: ${err.message}`);
    return {
      contributionTips: ['Look for "good first issue" tags', 'Read CONTRIBUTING.md if available'],
      setupInstructions: 'Clone the repo and follow standard setup for the identified tech stack.',
      commonPitfalls: ['Not running tests before pushing', 'Ignoring linting rules']
    };
  }
}

module.exports = {
  analyzeStructure,
  analyzeLearningPath,
  analyzeContribution
};
