import { Link } from "react-router";

interface HeroStat {
  value: string;
  label: string;
}

const heroStats: HeroStat[] = [
  { value: "40+", label: "Launches shipped" },
  { value: "99.9%", label: "Cloud uptime targets" },
  { value: "24/7", label: "Deployment support" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#05070d] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_82%_24%,rgba(99,102,241,0.18),transparent_28%),linear-gradient(180deg,#05070d_0%,#07111f_52%,#05070d_100%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-px w-[min(72rem,92vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#05070d] to-transparent" />

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Full-stack digital engineering
          </p>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            We Build Next-Gen Web & Mobile Solutions
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            From React, Next.js, Node, and mobile apps to CI/CD pipelines,
            cloud deployment, observability, and production-grade scaling.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-7 py-4 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.45)] transition hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_42px_rgba(103,232,249,0.65)]"
              to="/contact"
            >
              Get Started
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-fuchsia-300/40 bg-white/5 px-7 py-4 text-sm font-bold text-white shadow-[0_0_28px_rgba(217,70,239,0.22)] transition hover:-translate-y-0.5 hover:border-fuchsia-200/70 hover:bg-fuchsia-300/10"
              to="/portfolio"
            >
              Our Work
            </Link>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-4">
            {heroStats.map((stat) => (
              <div
                className="border-l border-white/10 pl-4"
                key={`${stat.value}-${stat.label}`}
              >
                <dt className="text-2xl font-black text-white">{stat.value}</dt>
                <dd className="mt-1 text-xs leading-5 text-slate-400">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-h-[26rem]">
          <div className="absolute inset-0 rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] shadow-[0_0_70px_rgba(34,211,238,0.16)] backdrop-blur-xl" />
          <div className="absolute inset-6 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.8)]" />
              <span className="h-3 w-3 rounded-full bg-fuchsia-300 shadow-[0_0_16px_rgba(240,171,252,0.7)]" />
              <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.7)]" />
            </div>
            <div className="mt-8 space-y-4 font-mono text-sm text-slate-300">
              <p>
                <span className="text-cyan-200">deploy</span>
                <span className="text-slate-500"> --target</span> production
              </p>
              <p>
                <span className="text-fuchsia-200">stack</span>
                <span className="text-slate-500">:</span> React, Node, Cloud
              </p>
              <p>
                <span className="text-emerald-200">status</span>
                <span className="text-slate-500">:</span> optimized and live
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {["API", "UI", "CI"].map((item) => (
                <div
                  className="rounded-xl border border-cyan-300/10 bg-cyan-300/5 p-4 text-center text-xs font-bold text-cyan-100"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
