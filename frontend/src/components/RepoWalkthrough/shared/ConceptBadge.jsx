export default function ConceptBadge({ concept }) {
  // Determine tech-specific color accents
  const c = concept.toLowerCase();
  let badgeStyle = {
    background: 'rgba(30, 41, 59, 0.8)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-secondary)',
  };

  if (c.includes('react') || c.includes('jsx')) {
    badgeStyle = { background: 'rgba(56, 189, 248, 0.12)', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38BDF8' };
  } else if (c.includes('type') || c.includes('ts')) {
    badgeStyle = { background: 'rgba(59, 130, 246, 0.12)', borderColor: 'rgba(59, 130, 246, 0.4)', color: '#60A5FA' };
  } else if (c.includes('javascript') || c.includes('js')) {
    badgeStyle = { background: 'rgba(234, 179, 8, 0.12)', borderColor: 'rgba(234, 179, 8, 0.4)', color: '#FACC15' };
  } else if (c.includes('node') || c.includes('express')) {
    badgeStyle = { background: 'rgba(34, 197, 94, 0.12)', borderColor: 'rgba(34, 197, 94, 0.4)', color: '#4ADE80' };
  } else if (c.includes('python')) {
    badgeStyle = { background: 'rgba(168, 85, 247, 0.12)', borderColor: 'rgba(168, 85, 247, 0.4)', color: '#C084FC' };
  }

  return (
    <span
      className="sr-pill"
      style={{
        ...badgeStyle,
        padding: '4px 12px',
        fontSize: 12,
        fontWeight: 600,
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${badgeStyle.borderColor}`,
        cursor: 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {concept}
    </span>
  );
}
