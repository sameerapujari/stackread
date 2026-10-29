import { useState } from 'react';
import Logo from './Logo';
import { Zap, Brain, Database, ArrowRight } from 'lucide-react';

export default function LandingPage({ onAnalyze, loading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading && url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-16 px-4 text-center animate-fade-in">
      {/* Logo & Header */}
      <div className="flex flex-col items-center mb-8">
        <Logo className="w-16 h-16 text-indigo-600 mb-4 animate-pulse" />
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Stackread
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          Understand unfamiliar GitHub repositories in minutes.
          Get a beginner-friendly overview of any codebase instantly.
        </p>
      </div>

      {/* Large Single Search Box */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full mb-16">
        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-xl border border-slate-200 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all">
          <input
            type="text"
            placeholder="Paste public GitHub URL (e.g., https://github.com/facebook/react)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="
              flex-1 px-4 py-3
              bg-transparent rounded-lg text-sm text-slate-900
              placeholder:text-slate-400 focus:outline-none
              disabled:opacity-50
            "
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="
              flex items-center justify-center gap-2 px-6 py-3
              bg-indigo-600 hover:bg-indigo-700 text-white
              rounded-lg text-sm font-semibold
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-200 cursor-pointer shadow-sm
            "
          >
            Analyze
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-start text-xs">
          <button
            type="button"
            onClick={() => setUrl('https://github.com/facebook/react')}
            disabled={loading}
            className="
              text-slate-500 hover:text-indigo-600 font-medium
              bg-transparent border-0 cursor-pointer
              disabled:cursor-not-allowed transition-colors
            "
          >
            Try example: facebook/react
          </button>
        </div>
      </form>

      {/* Three Feature Cards Underneath */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Card 1 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Zap size={20} className="fill-indigo-600/10" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">
            Fast Analysis
          </h3>
          <p className="mt-2 text-xs text-slate-500 leading-5">
            Queries repository metadata, languages, README, and directories in parallel using Promise.all concurrency. No sequential bottleneck.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Brain size={20} />
          </div>
          <h3 className="text-base font-semibold text-slate-900">
            AI Insights
          </h3>
          <p className="mt-2 text-xs text-slate-500 leading-5">
            Summarizes project purpose, architectural designs, difficulty level, and contribution starting paths using Gemini Generative AI models.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Database size={20} />
          </div>
          <h3 className="text-base font-semibold text-slate-900">
            Smart Cache
          </h3>
          <p className="mt-2 text-xs text-slate-500 leading-5">
            Stores completed audits in Upstash Redis caches with a 24-hour TTL, saving network requests and cutting down API overhead.
          </p>
        </div>
      </div>
    </div>
  );
}
