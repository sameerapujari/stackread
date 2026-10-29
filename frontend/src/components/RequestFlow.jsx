import {
  ArrowRight,
  Link,
  Server,
  Database,
  Brain,
  CheckCircle2,
} from "lucide-react";

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 008.2 22.94c.58.1.79-.25.79-.56v-2.03c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.72 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.11-.28-.5-1.43.11-2.98 0 0 .95-.3 3.11 1.16a10.8 10.8 0 015.66 0c2.15-1.46 3.1-1.16 3.1-1.16.62 1.55.23 2.7.12 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.29-5.16 5.57.41.35.77 1.03.77 2.08v3.09c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}

const steps = [
  {
    title: "GitHub URL",
    subtitle: "Repository Input",
    icon: Link,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Express",
    subtitle: "Backend API",
    icon: Server,
    color: "bg-slate-100 text-slate-700",
  },
  {
    title: "Redis",
    subtitle: "Cache Lookup",
    icon: Database,
    color: "bg-rose-50 text-rose-600",
  },
  {
    title: "GitHub API",
    subtitle: "Metadata Fetch",
    icon: GithubIcon,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Gemini",
    subtitle: "AI Analysis",
    icon: Brain,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Response",
    subtitle: "Structured JSON",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function RequestFlow() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8">

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          System Architecture
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          How Stackread processes a repository from input to AI-generated analysis.
        </p>

      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="flex items-center"
            >
              <div className="group w-40 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-white hover:shadow-lg">

                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${step.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-sm font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {step.subtitle}
                </p>

              </div>

              {index !== steps.length - 1 && (
                <ArrowRight
                  size={22}
                  className="mx-3 hidden text-slate-300 lg:block"
                />
              )}
            </div>
          );
        })}

      </div>

    </section>
  );
}