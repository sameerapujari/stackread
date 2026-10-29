import { useState, useEffect } from 'react';
import ProgressIndicator from './ProgressIndicator';
import RepositoryCard from './RepositoryCard';
import OverviewTab from './tabs/OverviewTab';
import ArchitectureTab from './tabs/ArchitectureTab';
import SetupTab from './tabs/SetupTab';
import LearningTab from './tabs/LearningTab';
import ContributeTab from './tabs/ContributeTab';
import { Layout, GitPullRequest, Settings, Layers, BookOpen, PanelLeft, X } from 'lucide-react';

const TABS = [
  { id: 'overview',     label: 'Overview',     icon: Layout,        component: OverviewTab },
  { id: 'architecture', label: 'Architecture', icon: Layers,        component: ArchitectureTab },
  { id: 'setup',        label: 'Setup',        icon: Settings,      component: SetupTab },
  { id: 'learning',     label: 'Learning',     icon: BookOpen,      component: LearningTab },
  { id: 'contribute',   label: 'Contribute',   icon: GitPullRequest, component: ContributeTab },
];

export default function RepoWalkthrough({ result, loading }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleTabChange = (id) => {
    setActiveTab(id);
    if (drawerOpen) setDrawerOpen(false);
  };

  if (loading) return <ProgressIndicator />;
  if (!result || !result.success) return null;

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component || OverviewTab;
  const analysis = result.analysis || {};
  const repoUrl = result.metadata?.url;

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--space-lg)', width: '100%' }}>

      {/* ── Desktop 280px / 900px Grid Layout ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
        gap: 32,
        alignItems: 'start',
      }}>

        {/* Sticky Left Sidebar (Desktop / Tablet) */}
        {!isMobile && (
          <aside style={{ position: 'sticky', top: 84 }}>
            <RepositoryCard metadata={result.metadata} repoUrl={repoUrl} />
          </aside>
        )}

        {/* Right Main Content */}
        <div style={{ minWidth: 0 }}>

          {/* Mobile info drawer trigger */}
          {isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
              padding: '12px 16px',
              background: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
            }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {result.metadata?.name}
              </span>
              <button
                onClick={() => setDrawerOpen(true)}
                className="sr-btn-ghost"
                style={{ padding: '6px 12px', fontSize: 12 }}
              >
                <PanelLeft size={14} />
                Repo Details
              </button>
            </div>
          )}

          {/* Tabs Bar with Gradient Underline */}
          <div style={{
            borderBottom: '1px solid var(--color-border)',
            marginBottom: 'var(--space-xl)',
            overflowX: 'auto',
          }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`sr-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={16} style={{ color: isActive ? '#8B5CF6' : 'var(--color-text-muted)' }} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Content */}
          <div key={activeTab} style={{ minHeight: 400 }}>
            <ActiveComponent analysis={analysis} repoUrl={repoUrl} />
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobile && drawerOpen && (
        <>
          <div
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
              zIndex: 60, backdropFilter: 'blur(4px)',
            }}
            onClick={() => setDrawerOpen(false)}
          />
          <div style={{
            position: 'fixed', top: 0, left: 0, height: '100vh', width: '85vw', maxWidth: 320,
            background: 'var(--color-bg-dark)', zIndex: 70, padding: 20, overflowY: 'auto',
            borderRight: '1px solid var(--color-border)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontWeight: 700 }}>Repo Information</span>
              <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', color: '#FFF' }}>
                <X size={20} />
              </button>
            </div>
            <RepositoryCard metadata={result.metadata} repoUrl={repoUrl} />
          </div>
        </>
      )}
    </div>
  );
}
