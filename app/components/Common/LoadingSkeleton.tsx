import type { ReactElement } from "react";

export default function LoadingSkeleton(): ReactElement {
  return (
    <div className="min-h-screen w-full bg-[#0b0f19] text-white flex flex-col p-6 md:p-12 animate-pulse overflow-hidden select-none">
      {/* Header Navigation Placeholder */}
      <header className="flex items-center justify-between border-b border-slate-800/60 pb-6 mb-12">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-slate-800" />
          <div className="h-5 w-32 rounded bg-slate-800" />
        </div>
        <div className="hidden md:flex gap-6">
          <div className="h-4 w-16 rounded bg-slate-800" />
          <div className="h-4 w-16 rounded bg-slate-800" />
          <div className="h-4 w-16 rounded bg-slate-800" />
          <div className="h-4 w-16 rounded bg-slate-800" />
        </div>
        <div className="h-10 w-28 rounded-full bg-slate-800" />
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full grid gap-10">
        {/* Tech Icon Block Placeholder */}
        <section className="flex flex-col items-center text-center max-w-2xl mx-auto pb-6">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 p-px flex items-center justify-center shadow-lg mb-6">
            <svg
              className="h-8 w-8 text-slate-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
            </svg>
          </div>
          <div className="h-10 w-64 md:w-96 rounded-lg bg-slate-800 mb-4" />
          <div className="h-4 w-48 md:w-72 rounded bg-slate-800" />
        </section>

        {/* 3 Content Card Skeletons */}
        <section className="grid gap-6 md:grid-cols-3 w-full">
          {[1, 2, 3].map((index) => (
            <article
              className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden"
              key={index}
            >
              {/* Card Header Accent */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
              
              {/* Card Icon Placeholder */}
              <div className="h-12 w-12 rounded-lg bg-slate-800 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-slate-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>

              {/* Title & Description Placeholders */}
              <div className="flex flex-col gap-3">
                <div className="h-6 w-3/4 rounded bg-slate-800" />
                <div className="h-4 w-full rounded bg-slate-800" />
                <div className="h-4 w-5/6 rounded bg-slate-800" />
              </div>

              {/* Detail Items */}
              <div className="mt-4 flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-800/80" />
                  <div className="h-3 w-1/2 rounded bg-slate-800" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-800/80" />
                  <div className="h-3 w-2/3 rounded bg-slate-800" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-800/80" />
                  <div className="h-3 w-2/5 rounded bg-slate-800" />
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
