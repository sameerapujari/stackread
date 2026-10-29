const { parseGitHubUrl } = require('../utils/repoParser');

/**
 * Validates the incoming request body has a valid GitHub URL.
 * Attaches parsed { owner, repo } to req so the controller doesn't re-parse.
 */
function validateUrl(req, _res, next) {
  const { url } = req.body;

  try {
    const { owner, repo } = parseGitHubUrl(url);
    req.repoOwner = owner;
    req.repoName = repo;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = validateUrl;
