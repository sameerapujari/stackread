/**
 * Parses a GitHub repository URL and extracts the owner and repo name.
 * Handles various URL formats:
 *   - https://github.com/facebook/react
 *   - https://github.com/facebook/react.git
 *   - https://github.com/facebook/react/
 *   - https://github.com/facebook/react/tree/main
 */
function parseGitHubUrl(url) {
  if (!url || typeof url !== 'string') {
    throw Object.assign(
      new Error('Please provide a GitHub repository URL'),
      { statusCode: 400 }
    );
  }

  const trimmed = url.trim();

  const pattern = /^https?:\/\/(www\.)?github\.com\/([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)/;
  const match = trimmed.match(pattern);

  if (!match) {
    throw Object.assign(
      new Error('Invalid GitHub URL. Expected format: https://github.com/owner/repo'),
      { statusCode: 400 }
    );
  }

  const owner = match[2];
  let repo = match[3];

  // Strip .git suffix if present
  if (repo.endsWith('.git')) {
    repo = repo.slice(0, -4);
  }

  return { owner, repo };
}

module.exports = { parseGitHubUrl };
