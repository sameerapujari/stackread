const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('../utils/logger');
// Delay require to avoid circular dependency since orchestrator imports analyzer which imports geminiService
let orchestrateAnalysis;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let model = null;
if (GEMINI_API_KEY) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
}

async function runGeminiPrompt(prompt) {
  if (!model) {
    throw new Error('Gemini API key not configured');
  }
  
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  // Strip markdown code fences if Gemini wraps the response
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return cleaned;
}

async function generateAnalysis(repoData, options = {}) {
  if (!model) {
    logger.warn('Gemini API key not configured — returning placeholder analysis via fallback in orchestrator');
    // The orchestrator will hit the catch block in the stages if runGeminiPrompt throws
  }

  if (!orchestrateAnalysis) {
    orchestrateAnalysis = require('./orchestratorService').orchestrateAnalysis;
  }

  logger.info('Delegating analysis to orchestrator');
  return await orchestrateAnalysis(repoData, options);
}

module.exports = { generateAnalysis, runGeminiPrompt };
