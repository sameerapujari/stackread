import { BookOpen, Clock } from 'lucide-react';
import StepCard from '../shared/StepCard';

export default function LearningTab({ analysis }) {
  const readingOrder = analysis.suggestedReadingOrder || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

      {analysis.estimatedTime && (
        <div style={{
          padding: '14px 16px',
          background: 'var(--grad-subtle)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#8B5CF6',
          }}>
            <Clock size={18} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)' }}>Estimated Reading Time</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{analysis.estimatedTime}</div>
          </div>
        </div>
      )}

      <div className="sr-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <BookOpen size={18} style={{ color: '#EC4899' }} />
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
            Reading Roadmap
          </h2>
        </div>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
          Follow this sequence to gradually understand the codebase without getting lost in implementation details.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {readingOrder.length > 0
            ? readingOrder.map((step, i) => (
                <StepCard key={i} stepNumber={i + 1} title={step} />
              ))
            : <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>No reading order suggested.</p>
          }
        </div>
      </div>

    </div>
  );
}
