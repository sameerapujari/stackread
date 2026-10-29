import { useState } from 'react';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';

const PRESET_REPOS = [
  { name: 'facebook/react', label: 'facebook/react' },
  { name: 'vercel/next.js', label: 'vercel/next.js' },
  { name: 'tailwindlabs/tailwindcss', label: 'tailwindlabs/tailwindcss' },
  { name: 'axios/axios', label: 'axios/axios' },
];

export default function SearchBar({ onAnalyze, loading, currentUrl = '', inHero = false }) {
  const [url, setUrl] = useState(currentUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading && url.trim()) onAnalyze(url);
  };

  const handleSelectPreset = (preset) => {
    setUrl(preset);
    if (!loading) onAnalyze(preset);
  };

  return (
    <div style={{ width: '100%', maxWidth: inHero ? 720 : 620, margin: '0 auto' }}>
      <form onSubmit={handleSubmit} className="relative">
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Search
            size={inHero ? 20 : 18}
            style={{
              position: 'absolute',
              left: 14,
              color: 'var(--color-text-muted)',
              pointerEvents: 'none',
            }}
          />

          <input
            type="text"
            placeholder="Enter GitHub repo (e.g. facebook/react or full URL)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="sr-search-input"
            style={{
              paddingLeft: 42,
              paddingRight: url ? 110 : 90,
              paddingTop: inHero ? 16 : 12,
              paddingBottom: inHero ? 16 : 12,
              fontSize: inHero ? 16 : 14,
              borderRadius: inHero ? 'var(--radius-lg)' : 'var(--radius-md)',
            }}
          />

          {url && !loading && (
            <button
              type="button"
              onClick={() => setUrl('')}
              style={{
                position: 'absolute',
                right: 92,
                background: 'none',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
              }}
              title="Clear input"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="sr-btn-primary"
            style={{
              position: 'absolute',
              right: 6,
              padding: inHero ? '10px 18px' : '8px 14px',
              fontSize: 13,
              borderRadius: inHero ? 'var(--radius-md)' : 'var(--radius-sm)',
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <span>Analyze</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Preset Suggestions / Quick Access Pills */}
      <div style={{
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        color: 'var(--color-text-muted)',
      }}>
        <span style={{ fontWeight: 500, color: 'var(--color-text-dim)' }}>Try:</span>
        {PRESET_REPOS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => handleSelectPreset(preset.name)}
            disabled={loading}
            className="sr-pill"
            style={{ cursor: 'pointer' }}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
