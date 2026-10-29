import { Settings, AlertTriangle, Lightbulb } from 'lucide-react';
import ConceptBadge from '../shared/ConceptBadge';
import StepCard from '../shared/StepCard';

export default function SetupTab({ analysis }) {
  const isAdvanced = analysis.difficultyLevel === 'Advanced' || analysis.difficultyLevel === 'Hard';
  const setupText = analysis.setupInstructions || 'No setup instructions provided.';
  const setupSteps = setupText.split(/\n+/).filter(s => s.trim().length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

      {isAdvanced && (
        <div style={{
          padding: '14px 16px',
          background: 'rgba(234, 179, 8, 0.12)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          borderLeft: '4px solid #FACC15',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}>
          <AlertTriangle size={18} style={{ color: '#FACC15', flexShrink: 0, marginTop: 2 }} />
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#FACC15', margin: 0 }}>Advanced Setup Required</h4>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
              This repository requires extra dependencies or environment variables. Review prerequisites carefully.
            </p>
          </div>
        </div>
      )}

      <div className="sr-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-lg)' }}>
          <Settings size={18} style={{ color: '#8B5CF6' }} />
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
            Local Setup Steps
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {setupSteps.map((step, i) => (
            <StepCard
              key={i}
              stepNumber={i + 1}
              title={step.length > 60 ? `Step ${i + 1}` : step}
              description={step.length > 60 ? step : null}
            />
          ))}
        </div>
      </div>

      {analysis.conceptsToLearn && analysis.conceptsToLearn.length > 0 && (
        <div className="sr-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Lightbulb size={16} style={{ color: '#14B8A6' }} />
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
              Prerequisite Concepts
            </h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {analysis.conceptsToLearn.map((concept, i) => (
              <ConceptBadge key={i} concept={concept} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
