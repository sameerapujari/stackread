import { BookOpen, Layers, Terminal } from 'lucide-react';
import ConceptBadge from '../shared/ConceptBadge';

export default function OverviewTab({ analysis }) {
  const level = analysis.difficultyLevel || 'Intermediate';

  let badgeStyle = { background: 'rgba(234, 179, 8, 0.15)', color: '#FACC15', border: '1px solid rgba(234, 179, 8, 0.4)' };
  if (level === 'Beginner') {
    badgeStyle = { background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', border: '1px solid rgba(34, 197, 94, 0.4)' };
  } else if (level === 'Advanced' || level === 'Hard') {
    badgeStyle = { background: 'rgba(239, 68, 68, 0.15)', color: '#F87171', border: '1px solid rgba(239, 68, 68, 0.4)' };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

      {/* Project Purpose Card */}
      <div className="sr-purpose-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BookOpen size={20} style={{ color: '#8B5CF6' }} />
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
              Project Purpose
            </h2>
          </div>
          <span style={{
            ...badgeStyle,
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: 12,
            fontWeight: 600,
          }}>
            {level}
          </span>
        </div>
        <p style={{
          fontSize: 16,
          color: 'var(--color-text-primary)',
          lineHeight: 1.6,
          margin: 0,
        }}>
          {analysis.projectPurpose || 'No description available for this project.'}
        </p>
      </div>

      {/* 2-column Grid: Tech Stack & Architecture Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 'var(--space-lg)',
      }}>
        {/* Tech Stack Card */}
        <div className="sr-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)' }}>
            <Terminal size={18} style={{ color: '#8B5CF6' }} />
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
              Tech Stack
            </h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(analysis.techStack || []).length > 0
              ? analysis.techStack.map((tech, i) => <ConceptBadge key={i} concept={tech} />)
              : <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Not detected</span>
            }
          </div>
        </div>

        {/* Architecture Summary */}
        <div className="sr-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-md)' }}>
            <Layers size={18} style={{ color: '#EC4899' }} />
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
              Architecture Summary
            </h3>
          </div>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {analysis.architectureOverview || 'Architecture summary unavailable.'}
          </p>
        </div>
      </div>

    </div>
  );
}
