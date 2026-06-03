interface Project {
  name: string;
  category: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    name: "Commerce Command Center",
    category: "Retail SaaS",
    description:
      "A real-time merchant dashboard with order intelligence, analytics, and role-based workflows.",
    tags: ["MERN", "Next.js"],
  },
  {
    name: "Field Ops Mobile",
    category: "Operations App",
    description:
      "A mobile-first reporting platform for distributed teams with offline capture and cloud sync.",
    tags: ["Flutter", "MERN"],
  },
  {
    name: "LaunchOS Website",
    category: "B2B Platform",
    description:
      "A high-converting marketing site and product portal with server-rendered content flows.",
    tags: ["Next.js", "MERN"],
  },
];

export default function Portfolio() {
  return (
    <section className="bg-[#07111f] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
              Portfolio
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Selected builds with the polish and backbone to go live.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            Each showcase combines crisp UX, scalable architecture, and a
            production plan that teams can keep building on.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              className="group overflow-hidden rounded-xl border border-white/10 bg-[#05070d] transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/50 hover:shadow-[0_0_46px_rgba(217,70,239,0.16)]"
              key={project.name}
            >
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(34,211,238,0.32),transparent_30%),radial-gradient(circle_at_75%_70%,rgba(217,70,239,0.28),transparent_34%)]" />
                <div className="absolute inset-6 rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Case 0{index + 1}</span>
                    <span>{project.category}</span>
                  </div>
                  <div className="mt-10 h-20 rounded-lg border border-cyan-300/20 bg-cyan-300/10 shadow-[0_0_34px_rgba(34,211,238,0.16)]" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">
                  {project.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100"
                      key={`${project.name}-${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
