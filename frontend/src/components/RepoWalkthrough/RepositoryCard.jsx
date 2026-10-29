import { Star, GitFork, Code, ExternalLink, CheckCircle2, Loader2, Circle } from 'lucide-react';

const STAGES = [
  { id: 1, label: 'Structure', short: '①' },
  { id: 2, label: 'Learning', short: '②' },
  { id: 3, label: 'Contribute', short: '③' },
];

export default function RepositoryCard({ metadata, repoUrl }) {
  if (!metadata) return null;

  const initial = metadata.name ? metadata.name.charAt(0).toUpperCase() : 'R';

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
      border: '1px solid var(--color-primary)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.15)',
      backdropFilter: 'blur(10px)',
    }}>

      {/* Header */}
      <div style={{
        padding: 'var(--space-lg)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        background: 'var(--grad-subtle)',
      }}>
        {/* Avatar Square */}
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-md)',
          background: 'var(--grad-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
        }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF' }}>{initial}</span>
        </div>

        <div style={{ minWidth: 0 }}>
          <h2 style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            margin: 0,
          }} title={metadata.name}>
            {metadata.name}
          </h2>
          {metadata.owner && (
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 2, margin: 0 }}>
              by {metadata.owner}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 'var(--space-lg)' }}>

        {/* Description */}
        <p style={{
          fontSize: 14,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          marginBottom: 'var(--space-lg)',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {metadata.description || 'No description provided.'}
        </p>

        {/* Stats Grid (3-column) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
          marginBottom: 'var(--space-lg)',
        }}>
          <div style={{
            padding: '8px 4px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            transition: 'transform 0.2s ease',
          }}>
            <Star size={14} style={{ color: '#F59E0B', marginBottom: 2 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {(metadata.stars || 0).toLocaleString()}
            </div>
            <div style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Stars</div>
          </div>

          <div style={{
            padding: '8px 4px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            transition: 'transform 0.2s ease',
          }}>
            <GitFork size={14} style={{ color: 'var(--color-text-muted)', marginBottom: 2 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {(metadata.forks || 0).toLocaleString()}
            </div>
            <div style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Forks</div>
          </div>

          <div style={{
            padding: '8px 4px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            transition: 'transform 0.2s ease',
          }}>
            <Code size={14} style={{ color: 'var(--color-tertiary)', marginBottom: 2 }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {metadata.primaryLanguage || '—'}
            </div>
            <div style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Language</div>
          </div>
        </div>

        {/* GitHub Ghost Button */}
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sr-btn-ghost"
            style={{ width: '100%', marginBottom: 'var(--space-lg)', textDecoration: 'none' }}
          >
            <ExternalLink size={14} />
            Open on GitHub
          </a>
        )}

        {/* Stage Progress Indicators */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-md)' }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
            Analysis Progress
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {STAGES.map((s) => (
              <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 4 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(20, 184, 166, 0.15)',
                  border: '1px solid var(--color-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-tertiary)',
                }}>
                  <CheckCircle2 size={16} />
                </div>
                <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
