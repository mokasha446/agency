interface Service {
  title: string;
  description: string;
  accent: string;
  features: string[];
}

const services: Service[] = [
  {
    title: "Web",
    description:
      "High-performance websites and dashboards with polished frontend systems.",
    accent: "from-cyan-300 to-blue-500",
    features: ["React Router", "Next.js", "Design systems"],
  },
  {
    title: "App",
    description:
      "Cross-platform mobile products built for speed, clarity, and scale.",
    accent: "from-fuchsia-300 to-violet-500",
    features: ["Flutter", "React Native", "App stores"],
  },
  {
    title: "Custom Software",
    description:
      "Internal tools, SaaS products, and workflow automation tailored to teams.",
    accent: "from-emerald-300 to-cyan-500",
    features: ["Node APIs", "Databases", "Integrations"],
  },
  {
    title: "Cloud Integration",
    description:
      "Deployment pipelines, serverless systems, monitoring, and cloud scaling.",
    accent: "from-amber-200 to-fuchsia-400",
    features: ["CI/CD", "AWS", "Observability"],
  },
];

export default function Services() {
  return (
    <section className="bg-[#05070d] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Services
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Engineering capability for digital teams that need momentum.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            Strategy, interface craft, backend architecture, and production
            deployment handled as one connected delivery system.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-cyan-300/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]"
              key={service.title}
            >
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${service.accent} opacity-60 transition-opacity group-hover:opacity-100`}
              />
              <div
                className={`mb-8 h-12 w-12 rounded-lg bg-gradient-to-br ${service.accent} p-px shadow-[0_0_24px_rgba(34,211,238,0.16)]`}
              >
                <div className="grid h-full w-full place-items-center rounded-[0.45rem] bg-slate-950 text-sm font-black text-white">
                  {service.title.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">{service.title}</h3>
              <p className="mt-4 min-h-24 text-sm leading-6 text-slate-400">
                {service.description}
              </p>
              <ul className="mt-6 space-y-3">
                {service.features.map((feature) => (
                  <li
                    className="flex items-center gap-3 text-sm text-slate-300"
                    key={feature}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.75)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
