import { useState } from 'react';
import { Database, Clock, Zap, ChevronDown, ChevronUp, Code2 } from 'lucide-react';

export default function PerformanceMetricsCard({ metrics, result }) {
  const [showRawJson, setShowRawJson] = useState(false);

  if (!metrics && !result) return null;

  const isCacheHit = metrics?.fromCache ?? result?.fromCache;
  const latencyMs = metrics?.apiCallTimeMs;

  const formattedLatency = latencyMs != null
    ? latencyMs >= 1000
      ? `${(latencyMs / 1000).toFixed(2)} s`
      : `${latencyMs} ms`
    : 'N/A';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
            <Zap size={18} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Redis Caching & Performance Metrics
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {metrics?.fetchedAt ? `Fetched at ${metrics.fetchedAt}` : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
        {/* Metric 1: Cache Hit Status */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <Database size={14} className={isCacheHit ? 'text-emerald-600' : 'text-blue-600'} />
            Cache Status
          </div>
          <div className="flex items-center gap-2">
            {isCacheHit ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Cache Hit (Redis)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Cache Miss (Fresh API)
              </span>
            )}
          </div>
        </div>

        {/* Metric 2: API Call Time */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <Clock size={14} className="text-slate-600" />
            API Call Time
          </div>
          <p className="text-xl font-bold text-slate-900 font-mono">
            {formattedLatency}
          </p>
        </div>

        {/* Metric 3: Data Freshness */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <Zap size={14} className="text-amber-600" />
            Data Freshness
          </div>
          <p className="text-sm font-semibold text-slate-800">
            {isCacheHit ? 'Upstash Redis Cache (24h TTL)' : 'Real-time (GitHub & Gemini AI)'}
          </p>
        </div>
      </div>

      {/* Raw Response Data Collapsible Toggle */}
      {result && (
        <div className="mt-5 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowRawJson(!showRawJson)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <Code2 size={15} />
            <span>{showRawJson ? 'Hide API Response Data' : 'View Raw API Response Data (JSON)'}</span>
            {showRawJson ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showRawJson && (
            <div className="mt-3 p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto max-h-96 border border-slate-800">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
