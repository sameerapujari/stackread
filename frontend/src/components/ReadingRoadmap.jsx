import { Compass, ArrowRight } from "lucide-react";

export default function ReadingRoadmap({ suggestedReadingOrder }) {
  if (!suggestedReadingOrder?.length) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Compass size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Reading Roadmap
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recommended order to understand this repository efficiently.
          </p>
        </div>

      </div>

      {/* Timeline */}

      <div className="relative ml-5">

        {/* Vertical Line */}

        <div className="absolute left-4 top-2 bottom-2 w-[2px] bg-slate-200"></div>

        <div className="space-y-7">

          {suggestedReadingOrder.map((step, index) => {
            const parts = step.split(":");
            const title = parts[0].trim();
            const details = parts.slice(1).join(":").trim();

            return (
              <div
                key={index}
                className="group relative flex gap-5"
              >

                {/* Number Circle */}

                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-sm font-bold text-indigo-600 transition group-hover:scale-110">

                  {index + 1}

                </div>

                {/* Card */}

                <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-indigo-300 group-hover:bg-white group-hover:shadow-lg">

                  <div className="flex items-center justify-between">

                    <h3 className="text-base font-semibold text-slate-900">
                      {title}
                    </h3>

                    <ArrowRight
                      size={16}
                      className="text-slate-400 opacity-0 transition group-hover:opacity-100"
                    />

                  </div>

                  {details && (
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {details}
                    </p>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}