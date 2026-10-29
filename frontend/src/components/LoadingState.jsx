import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const STEPS = [
  'Connecting to GitHub API...',
  'Reading repository structure & README...',
  'Checking Upstash Redis cache...',
  'Generating AI architecture summary with Gemini...',
];

export default function LoadingState() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto w-full py-12 px-4">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm text-center">
        <div className="flex justify-center mb-5">
          <Loader2 size={36} className="text-blue-600 animate-spin" />
        </div>

        <h3 className="text-base font-semibold text-slate-900">
          Analyzing Repository
        </h3>

        <p className="mt-2 text-xs text-slate-600 font-medium h-5">
          {STEPS[stepIndex]}
        </p>

        <div className="mt-6 flex justify-center gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === stepIndex ? 'w-5 bg-blue-600' : 'w-1.5 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
