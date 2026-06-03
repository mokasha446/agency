import { useMemo } from "react";
import type { Route } from "./+types/services.$id";
import Footer from "../components/Common/Footer";
import Navbar from "../components/Common/Navbar";

type ServiceId = "web-development" | "app-development" | "devops";

interface TechItem {
  name: string;
  accent: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

interface ServiceDetail {
  id: ServiceId;
  title: string;
  eyebrow: string;
  description: string;
  outcome: string;
  techStack: TechItem[];
}

const processSteps: ProcessStep[] = [
  {
    title: "Discovery",
    description:
      "We define goals, users, technical constraints, risks, and the fastest path to a useful launch.",
  },
  {
    title: "Wireframing",
    description:
      "We map screens, flows, content structure, and conversion moments before engineering begins.",
  },
  {
    title: "Coding",
    description:
      "We build with typed components, scalable architecture, clean APIs, and production-ready patterns.",
  },
  {
    title: "QA",
    description:
      "We test core flows, responsive behavior, performance, accessibility, and integration reliability.",
  },
  {
    title: "Deployment",
    description:
      "We ship through a stable release process with hosting, monitoring, and handoff documentation.",
  },
];

const services: Record<ServiceId, ServiceDetail> = {
  "app-development": {
    description:
      "Cross-platform mobile experiences engineered for speed, smooth interaction, and dependable release cycles.",
    eyebrow: "Mobile Engineering",
    id: "app-development",
    outcome:
      "Launch-ready iOS and Android apps with clean UX, secure APIs, and maintainable codebases.",
    techStack: [
      { accent: "from-cyan-300 to-blue-500", name: "Flutter" },
      { accent: "from-fuchsia-300 to-violet-500", name: "React Native" },
      { accent: "from-emerald-300 to-cyan-500", name: "Firebase" },
      { accent: "from-amber-200 to-fuchsia-400", name: "Supabase" },
      { accent: "from-blue-300 to-cyan-500", name: "Node.js" },
      { accent: "from-rose-300 to-fuchsia-500", name: "App Store" },
    ],
    title: "App Development",
  },
  devops: {
    description:
      "Cloud deployment, CI/CD, monitoring, and infrastructure systems that make releases calmer and more reliable.",
    eyebrow: "Cloud and DevOps",
    id: "devops",
    outcome:
      "Resilient pipelines, observable systems, and infrastructure that can grow with your product.",
    techStack: [
      { accent: "from-orange-300 to-amber-500", name: "AWS" },
      { accent: "from-cyan-300 to-blue-500", name: "Docker" },
      { accent: "from-violet-300 to-fuchsia-500", name: "Kubernetes" },
      { accent: "from-emerald-300 to-cyan-500", name: "Vercel" },
      { accent: "from-slate-200 to-cyan-300", name: "GitHub Actions" },
      { accent: "from-rose-300 to-orange-400", name: "Grafana" },
    ],
    title: "DevOps and Cloud Integration",
  },
  "web-development": {
    description:
      "Modern websites, SaaS platforms, dashboards, and web apps built with strong UX and scalable foundations.",
    eyebrow: "Web Engineering",
    id: "web-development",
    outcome:
      "Fast, accessible, search-ready web products with robust backend services and deployment workflows.",
    techStack: [
      { accent: "from-cyan-300 to-blue-500", name: "React" },
      { accent: "from-slate-200 to-cyan-300", name: "Next.js" },
      { accent: "from-emerald-300 to-cyan-500", name: "Node.js" },
      { accent: "from-fuchsia-300 to-violet-500", name: "TypeScript" },
      { accent: "from-green-300 to-emerald-500", name: "MongoDB" },
      { accent: "from-blue-300 to-indigo-500", name: "PostgreSQL" },
    ],
    title: "Web Development",
  },
};

function getService(id: string | undefined) {
  if (id && id in services) {
    return services[id as ServiceId];
  }

  return services["web-development"];
}

export function meta({ params }: Route.MetaArgs) {
  const service = getService(params.id);

  return [
    { title: `${service.title} | Nexa Studio` },
    {
      name: "description",
      content: service.description,
    },
  ];
}

export default function ServiceDetailPage({ params }: Route.ComponentProps) {
  const service = useMemo(() => getService(params.id), [params.id]);

  const scrollToQuote = () => {
    document
      .getElementById("service-quote-form")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <Navbar />
      <main className="overflow-hidden bg-[#05070d]">
        <section className="relative isolate overflow-hidden px-5 py-28 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(34,211,238,0.2),transparent_32%),radial-gradient(circle_at_82%_22%,rgba(217,70,239,0.14),transparent_30%),linear-gradient(180deg,#05070d_0%,#07111f_54%,#05070d_100%)]" />
          <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                {service.eyebrow}
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                {service.title}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {service.description}
              </p>
              <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.035] p-5 text-sm leading-7 text-slate-300 shadow-[0_0_44px_rgba(34,211,238,0.08)]">
                {service.outcome}
              </div>
              <button
                className="mt-9 inline-flex rounded-full bg-cyan-300 px-7 py-4 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.42)] transition hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_44px_rgba(103,232,249,0.62)]"
                onClick={scrollToQuote}
                type="button"
              >
                Request a Quote
              </button>
            </div>

            <div className="relative min-h-[28rem] rounded-2xl border border-cyan-300/15 bg-white/[0.035] p-6 shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-xl">
              <div className="absolute inset-6 rounded-xl border border-white/10 bg-slate-950/70" />
              <div className="relative grid h-full min-h-[24rem] place-items-center">
                <div className="grid h-44 w-44 place-items-center rounded-3xl border border-cyan-300/30 bg-cyan-300/10 text-4xl font-black text-cyan-100 shadow-[0_0_54px_rgba(34,211,238,0.22)]">
                  {service.title
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Tech Stack
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Tools selected for dependable product delivery.
              </h2>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.techStack.map((tech) => (
                <article
                  className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-[0_0_38px_rgba(34,211,238,0.14)]"
                  key={tech.name}
                >
                  <div
                    className={`mb-5 h-12 w-12 rounded-lg bg-gradient-to-br ${tech.accent} p-px`}
                  >
                    <div className="grid h-full w-full place-items-center rounded-[0.45rem] bg-slate-950 text-sm font-black text-white">
                      {tech.name.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{tech.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Used where it best supports performance, maintainability,
                    integration, and launch reliability.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#07111f] px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                Development Process
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                From first conversation to stable deployment.
              </h2>
            </div>

            <div className="relative mt-16">
              <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan-300 via-fuchsia-300 to-transparent md:left-1/2" />
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <article
                    className={`relative grid gap-5 md:grid-cols-2 ${
                      index % 2 === 0 ? "" : "md:[&>div:first-child]:col-start-2"
                    }`}
                    key={step.title}
                  >
                    <div className="ml-14 rounded-xl border border-white/10 bg-[#05070d] p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45 md:ml-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-400">
                        {step.description}
                      </p>
                    </div>
                    <div className="absolute left-5 top-7 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300 text-sm font-black text-slate-950 shadow-[0_0_24px_rgba(103,232,249,0.55)] md:left-1/2">
                      {index + 1}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-2xl border border-cyan-300/20 bg-white/[0.035] p-6 shadow-[0_0_70px_rgba(34,211,238,0.1)] sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Booking Form
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">
                Request a quote for {service.title}.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-400">
                Share a few details and the team will respond with a practical
                scope, timeline, and next-step recommendation.
              </p>
            </div>

            <form className="grid gap-4" id="service-quote-form">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
                  placeholder="Your name"
                  type="text"
                />
                <input
                  className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
                  placeholder="Email address"
                  type="email"
                />
              </div>
              <input
                className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
                readOnly
                type="text"
                value={service.title}
              />
              <textarea
                className="min-h-36 rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
                placeholder="Tell us what you want to build."
              />
              <button
                className="rounded-full bg-cyan-300 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.35)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                type="submit"
              >
                Send Quote Request
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
