import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ExpandableCard({ title, icon: Icon, children, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div style={{
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-card-bg)',
      overflow: 'hidden',
      transition: 'border-color 0.2s ease',
    }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {Icon && (
            <div style={{
              padding: 6,
              background: 'rgba(139, 92, 246, 0.15)',
              color: '#8B5CF6',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
            }}>
              <Icon size={16} />
            </div>
          )}
          <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {title}
          </span>
        </div>
        <ChevronDown
          size={16}
          style={{
            color: 'var(--color-text-muted)',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {isExpanded && (
        <div style={{
          padding: '12px 16px 16px 16px',
          fontSize: 13,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          borderTop: '1px solid var(--color-border)',
          background: 'rgba(15, 23, 42, 0.4)',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}
