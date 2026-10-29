import {
  Star,
  GitFork,
  Code,
  Award,
  Calendar,
  ExternalLink,
} from 'lucide-react';

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 008.2 22.94c.58.1.79-.25.79-.56v-2.03c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.72 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.11-.28-.5-1.43.11-2.98 0 0 .95-.3 3.11 1.16a10.8 10.8 0 015.66 0c2.15-1.46 3.1-1.16 3.1-1.16.62 1.55.23 2.7.12 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.29-5.16 5.57.41.35.77 1.03.77 2.08v3.09c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}

const LANGUAGE_COLORS = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Java: 'bg-amber-600',
  Python: 'bg-emerald-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-indigo-500',
  Rust: 'bg-amber-700',
  Go: 'bg-sky-500',
  C: 'bg-slate-500',
  'C++': 'bg-blue-600',
  Ruby: 'bg-rose-600',
  PHP: 'bg-violet-500',
  Shell: 'bg-emerald-600',
};

function StatBadge({ icon, label, value, highlight }) {
  return (
    <div className={`p-3.5 rounded-xl border border-slate-200 ${highlight ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50'}`}>
      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1.5 text-base font-bold text-slate-900 truncate">
        {value}
      </p>
    </div>
  );
}

export default function RepositoryCard({ metadata, languages }) {
  if (!metadata) return null;

  const repoParts = (metadata.name || '').split('/');
  const owner = repoParts[0] || '';
  const repoName = repoParts[1] || metadata.name;

  const languageEntries = Object.entries(languages || {});
  const totalBytes = languageEntries.reduce((sum, [, bytes]) => sum + bytes, 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-slate-900 text-white rounded-xl shrink-0 mt-1">
            <GithubIcon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                {owner}
              </span>
              {metadata.primaryLanguage && (
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                  {metadata.primaryLanguage}
                </span>
              )}
            </div>
            <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {repoName}
            </h1>
            {metadata.description && (
              <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-3xl">
                {metadata.description}
              </p>
            )}
          </div>
        </div>

        {metadata.htmlUrl && (
          <a
            href={metadata.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer self-start"
          >
            <span>View on GitHub</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Key Info Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
        <StatBadge
          icon={<Star size={14} className="text-amber-500 fill-amber-400" />}
          label="Stars"
          value={metadata.stars != null ? metadata.stars.toLocaleString() : '0'}
          highlight
        />
        <StatBadge
          icon={<GitFork size={14} className="text-blue-500" />}
          label="Forks"
          value={metadata.forks != null ? metadata.forks.toLocaleString() : '0'}
        />
        <StatBadge
          icon={<Code size={14} className="text-indigo-500" />}
          label="Main Language"
          value={metadata.primaryLanguage || 'Unknown'}
        />
        <StatBadge
          icon={<Award size={14} className="text-emerald-500" />}
          label="License"
          value={metadata.license || 'None'}
        />
        <StatBadge
          icon={<Calendar size={14} className="text-slate-500" />}
          label="Updated"
          value={formatDate(metadata.lastUpdated)}
        />
      </div>

      {/* Language Breakdown */}
      {languageEntries.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-700">
            <span>Language Composition</span>
            <span className="text-slate-400 font-normal">{languageEntries.length} languages</span>
          </div>

          <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
            {languageEntries.map(([lang, bytes]) => {
              const percent = totalBytes > 0 ? (bytes / totalBytes) * 100 : 0;
              return (
                <div
                  key={lang}
                  title={`${lang}: ${percent.toFixed(1)}%`}
                  className={LANGUAGE_COLORS[lang] || 'bg-blue-500'}
                  style={{ width: `${percent}%` }}
                />
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {languageEntries.map(([lang, bytes]) => {
              const percent = totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : 0;
              return (
                <div
                  key={lang}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700"
                >
                  <span className={`w-2 h-2 rounded-full ${LANGUAGE_COLORS[lang] || 'bg-blue-500'}`} />
                  <span>{lang}</span>
                  <span className="text-slate-400 font-normal">{percent}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}