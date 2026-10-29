export default function StepCard({ stepNumber, title, description }) {
  return (
    <div className="sr-step">
      <div className="sr-step-number">
        {stepNumber}
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: description ? 4 : 0,
          margin: 0,
        }}>
          {title}
        </h4>
        {description && (
          <p style={{
            fontSize: 13,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            margin: '4px 0 0 0',
          }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
