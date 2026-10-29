import { useAnalyze } from './hooks/useAnalyze';
import Navbar from './components/Navbar';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';
import RepoWalkthrough from './components/RepoWalkthrough/RepoWalkthrough';
import Footer from './components/Footer';

export default function App() {
  const { result, loading, error, metrics, analyze, reset } = useAnalyze();
  const hasData = result?.success;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0F172A' }}>

      {/* ── Hand-crafted Navbar ── */}
      <Navbar onAnalyze={analyze} loading={loading} onReset={reset} />

      {/* ── Main Content Area ── */}
      <main style={{ flex: 1, position: 'relative' }}>
        {error && <ErrorMessage message={error} onRetry={() => reset()} />}

        {!loading && !hasData && !error && (
          <EmptyState onAnalyze={analyze} loading={loading} />
        )}

        {(loading || hasData) && (
          <div style={{ padding: '32px 0' }}>
            <RepoWalkthrough result={result} loading={loading} />
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <Footer fromCache={result?.fromCache} />
    </div>
  );
}