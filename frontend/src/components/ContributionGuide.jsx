import { Sparkles, CheckCircle2, GraduationCap } from 'lucide-react';

export default function ContributionGuide({ contributionTips, conceptsToLearn, whereToStart }) {
  const hasTips = contributionTips && contributionTips.length > 0;
  const hasConcepts = conceptsToLearn && conceptsToLearn.length > 0;
  const hasStart = !!whereToStart;

  if (!hasTips && !hasConcepts && !hasStart) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="text-indigo-600">
          <Sparkles size={18} className="fill-indigo-600/10" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">
          Contribution Guide
        </h3>
      </div>

      <div className="space-y-6">
        {/* Checklist Tips */}
        {hasTips && (
          <div>
            <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Contribution Tips
            </h4>
            <div className="space-y-3">
              {contributionTips.map((tip, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="text-emerald-500 shrink-0 mt-0.5 animate-pulse">
                    <CheckCircle2 size={16} className="fill-emerald-500/10" />
                  </div>
                  <p className="text-xs text-slate-700 leading-normal">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Concepts to Learn */}
        {hasConcepts && (
          <div className="border-t border-slate-100 pt-5">
            <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Prerequisite Concepts to Know
            </h4>
            <div className="flex flex-wrap gap-2">
              {conceptsToLearn.map((concept) => (
                <span
                  key={concept}
                  className="
                    px-2.5 py-1 text-xs font-semibold
                    bg-slate-50 text-slate-600
                    border border-slate-200 rounded-full
                  "
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Where Beginners should Start */}
        {hasStart && (
          <div className="border-t border-slate-100 pt-5">
            <div className="flex items-center gap-1.5 mb-2.5 text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
              <GraduationCap size={13} />
              Where Beginners Should Start
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100 font-medium">
              {whereToStart}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
