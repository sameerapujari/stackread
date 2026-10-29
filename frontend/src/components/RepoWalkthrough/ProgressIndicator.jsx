import { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

const STAGES = [
  { id: 1, label: 'Stage 1: Analyzing Repository Structure', description: 'Extracting tech stack and mapping key directories' },
  { id: 2, label: 'Stage 2: Designing Learning Path', description: 'Determining reading order and estimating difficulty' },
  { id: 3, label: 'Stage 3: Extracting Contribution Guidelines', description: 'Finding setup instructions and common pitfalls' },
];

export default function ProgressIndicator() {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(2), 2500);
    const t2 = setTimeout(() => setStage(3), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-2xl) var(--space-lg)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 520,
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-primary)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-2xl)',
        textAlign: 'center',
        boxShadow: 'var(--glow-card)',
      }}>
        {/* Animated glowing loader */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'var(--grad-subtle)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-lg)',
          color: '#8B5CF6',
          boxShadow: 'var(--glow-purple)',
        }}>
          <Loader2 size={28} className="animate-spin" />
        </div>

        <h2 style={{
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
          margin: 0,
        }}>
          AI is Analyzing Codebase
        </h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
          This usually takes about 10–15 seconds.
        </p>

        {/* Stage list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
          {STAGES.map((s) => {
            const isDone = stage > s.id;
            const isActive = stage === s.id;
            const isPending = stage < s.id;

            return (
              <div
                key={s.id}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  padding: 12,
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ marginTop: 2 }}>
                  {isDone && <CheckCircle2 size={22} style={{ color: '#14B8A6' }} />}
                  {isActive && <Loader2 size={22} style={{ color: '#8B5CF6' }} className="animate-spin" />}
                  {isPending && <Circle size={22} style={{ color: 'var(--color-border)' }} />}
                </div>
                <div>
                  <h4 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: isDone ? 'var(--color-text-primary)' : isActive ? '#8B5CF6' : 'var(--color-text-muted)',
                    margin: 0,
                  }}>
                    {s.label}
                  </h4>
                  <p style={{
                    fontSize: 12,
                    color: isDone ? 'var(--color-text-secondary)' : isActive ? 'var(--color-text-muted)' : 'var(--color-text-dim)',
                    margin: '2px 0 0 0',
                  }}>
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
