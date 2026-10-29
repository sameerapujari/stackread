export default function Footer({ fromCache }) {
  return (
    <footer style={{
      padding: 'var(--space-lg)',
      borderTop: '1px solid var(--color-border)',
      marginTop: 'var(--space-2xl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      flexWrap: 'wrap',
      background: 'rgba(15, 23, 42, 0.95)',
    }}>
      <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
        Built with React · Express · Gemini · Redis · GitHub API
      </span>

      {fromCache && (
        <>
          <span style={{ color: 'var(--color-border)', fontSize: 12 }}>·</span>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: 'monospace',
            color: '#14B8A6',
            background: 'rgba(20, 184, 166, 0.12)',
            border: '1px solid rgba(20, 184, 166, 0.3)',
            borderRadius: 'var(--radius-full)',
            padding: '2px 10px',
          }}>
            ⚡ Served from Cache
          </span>
        </>
      )}
    </footer>
  );
}
