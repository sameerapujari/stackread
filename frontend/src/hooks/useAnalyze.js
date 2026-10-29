import { useState, useCallback } from 'react';
import { analyzeRepository } from '../utils/api';

export function useAnalyze() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [metrics, setMetrics] = useState(null);

  const analyze = useCallback(async (url) => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please enter a GitHub repository URL.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setMetrics(null);

    const startTime = performance.now();

    try {
      const data = await analyzeRepository(trimmed);
      const durationMs = Math.round(performance.now() - startTime);

      setResult(data);
      setMetrics({
        apiCallTimeMs: durationMs,
        fromCache: Boolean(data.fromCache),
        fetchedAt: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      setError(err.message || 'Failed to analyze repository. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError('');
    setMetrics(null);
  }, []);

  return { result, loading, error, metrics, analyze, reset };
}
