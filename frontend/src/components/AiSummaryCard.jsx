import { Sparkles, BookOpen, Layers, Flame, Clock } from 'lucide-react';

export default function AiSummaryCard({ analysis }) {
  if (!analysis) return null;

  const badgeColors = {
    Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Advanced: 'bg-rose-50 text-rose-700 border-rose-200',
    Hard: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const level = analysis.difficultyLevel || 'Unknown';
  const difficultyClass = badgeColors[level] || 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
          <Sparkles size={18} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          AI Architecture & Analysis
        </h3>
      </div>

      <div className="space-y-6">
        {/* Project Purpose */}
        {analysis.projectPurpose && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-500 font-semibold text-xs uppercase tracking-wider">
              <BookOpen size={13} />
              <span>Project Purpose</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {analysis.projectPurpose}
            </p>
          </div>
        )}

        {/* Architecture Overview */}
        {analysis.architectureOverview && (
          <div className="border-t border-slate-100 pt-5">
            <div className="flex items-center gap-2 mb-2 text-slate-500 font-semibold text-xs uppercase tracking-wider">
              <Layers size={13} />
              <span>Architecture Overview</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {analysis.architectureOverview}
            </p>
          </div>
        )}

        {/* Difficulty & Estimated Time */}
        <div className="border-t border-slate-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-500 font-semibold text-xs uppercase tracking-wider">
              <Flame size={13} />
              <span>Difficulty Level</span>
            </div>
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${difficultyClass}`}>
              {level}
            </span>
          </div>

          {analysis.estimatedTime && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                <Clock size={13} />
                <span>Estimated Time</span>
              </div>
              <p className="text-sm text-slate-800 font-medium">
                {analysis.estimatedTime}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
