const axios = require('axios');
const logger = require('../utils/logger');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
  },
  timeout: 10000,
});

async function fetchMetadata(owner, repo) {
  const { data } = await githubApi.get(`/repos/${owner}/${repo}`);
  return {
    name: data.full_name,
    owner: data.owner?.login,
    repo: data.name,
    description: data.description,
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    primaryLanguage: data.language,
    language: data.language,
    license: data.license?.spdx_id || null,
    lastUpdated: data.updated_at,
    htmlUrl: data.html_url,
    defaultBranch: data.default_branch,
    topics: data.topics || [],
  };
}

async function fetchLanguages(owner, repo) {
  const { data } = await githubApi.get(`/repos/${owner}/${repo}/languages`);
  return data; // { JavaScript: 45000, Python: 12000, ... }
}

async function fetchReadme(owner, repo) {
  // Try the default branch readme via raw.githubusercontent
  const { data } = await axios.get(
    `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`,
    { timeout: 8000 }
  );
  // Truncate to ~8000 chars to stay within Gemini context limits
  return data.length > 8000 ? data.slice(0, 8000) : data;
}

async function fetchRootContents(owner, repo) {
  const { data } = await githubApi.get(`/repos/${owner}/${repo}/contents/`);
  return data.map((item) => ({
    name: item.name,
    type: item.type, // "file" or "dir"
    size: item.size,
    url: item.html_url,
  }));
}

/**
 * Fetches the repository metadata, README, package.json, and root file tree in parallel.
 * Each request is guarded independently so an unavailable optional resource does not
 * prevent the other repository data from being returned.
 */
async function fetchRepoDataConcurrently(owner, repo) {
  const startTime = performance.now();
  logger.info(`Fetching GitHub data concurrently for ${owner}/${repo}`);

  const requests = [
    fetchMetadata(owner, repo).catch((err) => {
      logger.warn(`GitHub metadata fetch failed: ${err.message}`);
      return null;
    }),
    fetchReadme(owner, repo).catch((err) => {
      logger.warn(`GitHub README fetch failed: ${err.message}`);
      return null;
    }),
    githubApi.get(`/repos/${owner}/${repo}/contents/package.json`)
      .then(({ data }) => {
        if (!data?.content) return null;
        const parsed = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
        return {
          dependencies: parsed.dependencies || {},
          devDependencies: parsed.devDependencies || {},
        };
      })
      .catch((err) => {
        logger.warn(`GitHub package.json fetch failed: ${err.message}`);
        return null;
      }),
    fetchRootContents(owner, repo).catch((err) => {
      logger.warn(`GitHub root contents fetch failed: ${err.message}`);
      return null;
    }),
  ];

  const [metadata, readme, packageJson, fileTree] = await Promise.all(requests);
  const elapsed = Math.round(performance.now() - startTime);
  logger.info(`GitHub concurrent fetch for ${owner}/${repo} completed in ${elapsed}ms`);

  return {
    metadata,
    readme,
    packageJson,
    fileTree,
    // Keep the existing names available to the current analysis pipeline.
    languages: metadata?.primaryLanguage ? { [metadata.primaryLanguage]: 1 } : {},
    contents: fileTree,
  };
}

const fetchRepositoryData = fetchRepoDataConcurrently;

module.exports = { fetchRepoDataConcurrently, fetchRepositoryData };
