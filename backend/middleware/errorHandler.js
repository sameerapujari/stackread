const logger = require('../utils/logger');

/**
 * Centralized error handler.
 * Maps known error types to meaningful HTTP responses instead of
 * exposing raw stack traces or cryptic status codes to the client.
 */
function errorHandler(err, _req, res, _next) {
  logger.error(err.message, err.stack?.split('\n')[1]?.trim());

  // Errors we threw ourselves with a statusCode attached
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // GitHub API errors come through as axios errors
  if (err.response) {
    const status = err.response.status;

    if (status === 404) {
      return res.status(404).json({
        success: false,
        error: 'Repository not found. Make sure the repository exists and is public.',
      });
    }

    if (status === 403) {
      return res.status(429).json({
        success: false,
        error: 'GitHub API rate limit exceeded. Please try again in a few minutes.',
      });
    }

    if (status === 401) {
      return res.status(500).json({
        success: false,
        error: 'GitHub authentication failed. Please check the server configuration.',
      });
    }
  }

  // Gemini API errors
  if (err.message?.includes('Gemini') || err.message?.includes('generative')) {
    return res.status(502).json({
      success: false,
      error: 'AI analysis service is temporarily unavailable. Please try again later.',
    });
  }

  // Fallback for unexpected errors
  res.status(500).json({
    success: false,
    error: 'Something went wrong. Please try again later.',
  });
}

module.exports = errorHandler;
