import { Folder, FileCode, Map } from 'lucide-react';
import ExpandableCard from '../shared/ExpandableCard';

export default function ArchitectureTab({ analysis }) {
  const dirs = analysis.importantDirectories || [];
  const files = analysis.importantFiles || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

      <div className="sr-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Map size={20} style={{ color: '#8B5CF6' }} />
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
            Codebase Map
          </h2>
        </div>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>
          Navigating core directories and files is the fastest way to master this repository.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-lg)',
      }}>
        {/* Important Directories */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Folder size={14} style={{ color: '#14B8A6' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Key Directories
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {dirs.length > 0
              ? dirs.map((dir, i) => (
                  <ExpandableCard key={i} title={dir.name} icon={Folder} defaultExpanded={i === 0}>
                    {dir.purpose}
                  </ExpandableCard>
                ))
              : <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>No key directories listed.</p>
            }
          </div>
        </div>

        {/* Important Files */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <FileCode size={14} style={{ color: '#EC4899' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Crucial Files
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {files.length > 0
              ? files.map((file, i) => (
                  <ExpandableCard key={i} title={file.name} icon={FileCode}>
                    {file.purpose}
                  </ExpandableCard>
                ))
              : <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>No crucial files listed.</p>
            }
          </div>
        </div>
      </div>

    </div>
  );
}
