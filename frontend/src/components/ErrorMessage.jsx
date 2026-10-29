import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="max-w-2xl mx-auto w-full my-6 px-4">
      <div className="rounded-xl border border-red-200 bg-red-50/80 p-5 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0 mt-0.5 border border-red-200">
            <AlertTriangle size={20} />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-900">
              Repository Analysis Failed
            </h3>

            <p className="mt-1 text-xs text-red-700 leading-relaxed font-medium">
              {message}
            </p>

            <div className="mt-3 pt-3 border-t border-red-200/60 text-xs text-red-600 space-y-1">
              <p className="font-semibold text-red-800">Troubleshooting tips:</p>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-red-700">
                <li>Check that the URL or repository name format is valid (e.g., <code className="font-mono bg-red-100/80 px-1 py-0.5 rounded">owner/repo</code>).</li>
                <li>Ensure the repository is public and accessible on GitHub.</li>
                <li>Verify your network connection and try again.</li>
              </ul>
            </div>

            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw size={13} />
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
