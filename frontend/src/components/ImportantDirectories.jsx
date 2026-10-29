import { Folder, FileText, ArrowRight } from "lucide-react";

function ItemCard({ icon, name, purpose, isFile }) {
  return (
    <div
      className="
        group rounded-2xl border border-slate-200 bg-white p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:border-indigo-300
        hover:shadow-lg
      "
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isFile
              ? "bg-slate-100 text-slate-600"
              : "bg-indigo-50 text-indigo-600"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate font-semibold text-slate-900">
              {name}
            </h4>

            <ArrowRight
              size={14}
              className="opacity-0 transition-opacity group-hover:opacity-100 text-slate-400"
            />
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {purpose}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ImportantDirectories({ directories, files }) {
  const hasDirs = directories?.length > 0;
  const hasFiles = files?.length > 0;

  if (!hasDirs && !hasFiles) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Folder size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Important Directories & Files
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Start with these locations to understand the repository faster.
          </p>
        </div>

      </div>

      {hasDirs && (
        <div>

          <div className="mb-5 flex items-center justify-between">

            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Directories
            </h3>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              {directories.length} folders
            </span>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {directories.map((dir, index) => (
              <ItemCard
                key={index}
                icon={<Folder size={20} />}
                name={dir.name}
                purpose={dir.purpose}
              />
            ))}

          </div>

        </div>
      )}

      {hasFiles && (
        <div className="mt-10 border-t border-slate-100 pt-8">

          <div className="mb-5 flex items-center justify-between">

            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Key Files
            </h3>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {files.length} files
            </span>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {files.map((file, index) => (
              <ItemCard
                key={index}
                icon={<FileText size={20} />}
                name={file.name}
                purpose={file.purpose}
                isFile
              />
            ))}

          </div>

        </div>
      )}

    </section>
  );
}