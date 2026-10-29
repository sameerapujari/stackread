import { GitPullRequest, AlertCircle, ExternalLink } from 'lucide-react';
import StepCard from '../shared/StepCard';

export default function ContributeTab({ analysis, repoUrl }) {
  const tips = analysis.contributionTips || [];
  const pitfalls = analysis.commonPitfalls || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

      {/* CTA Header Banner */}
      <div style={{
        background: 'var(--grad-primary)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        boxShadow: 'var(--glow-purple)',
      }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Ready to dive in?
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.85)', margin: '4px 0 0 0' }}>
            Review these tips and common pitfalls before opening your first PR.
          </p>
        </div>
        {repoUrl && (
          <a
            href={`${repoUrl}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 18px',
              background: '#FFFFFF',
              color: '#0F172A',
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
          >
            <ExternalLink size={14} />
            Find Issues
          </a>
        )}
      </div>

      {/* 2-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-lg)',
      }}>
        {/* Tips */}
        <div className="sr-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-lg)' }}>
            <GitPullRequest size={18} style={{ color: '#8B5CF6' }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
              First Contribution Tips
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tips.length > 0
              ? tips.map((tip, i) => <StepCard key={i} stepNumber={i + 1} title={tip} />)
              : <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>No contribution tips found.</p>
            }
          </div>
        </div>

        {/* Pitfalls */}
        <div className="sr-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-lg)' }}>
            <AlertCircle size={18} style={{ color: '#EC4899' }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
              Common Pitfalls
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pitfalls.length > 0
              ? pitfalls.map((pitfall, i) => (
                  <div key={i} style={{
                    padding: '10px 14px',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 13,
                    color: 'var(--color-text-secondary)',
                    display: 'flex',
                    gap: 8,
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ color: '#F87171', fontWeight: 700 }}>•</span>
                    <span>{pitfall}</span>
                  </div>
                ))
              : <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>No specific pitfalls mentioned.</p>
            }
          </div>
        </div>
      </div>

    </div>
  );
}
