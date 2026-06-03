import { useMemo, useState } from "react";
import type { Route } from "./+types/portfolio";
import Footer from "../components/Common/Footer";
import Navbar from "../components/Common/Navbar";
import ProjectModal, {
  type ProjectModalData,
} from "../components/Sections/ProjectModal";

type ProjectCategory = "Web Apps" | "Mobile Apps" | "Cloud Solutions";
type CategoryFilter = "All" | ProjectCategory;

interface PortfolioProject extends ProjectModalData {
  id: string;
  category: ProjectCategory;
  summary: string;
}

const categoryFilters: CategoryFilter[] = [
  "All",
  "Web Apps",
  "Mobile Apps",
  "Cloud Solutions",
];

const projects: PortfolioProject[] = [
  {
    caseStudy: { href: "#", label: "Case Study" },
    category: "Web Apps",
    description:
      "A centralized commerce platform with live order tracking, inventory visibility, staff permissions, and revenue reporting for multi-branch retail operations.",
    features: [
      "Real-time order dashboard",
      "Inventory and branch management",
      "Role-based permissions",
      "Revenue analytics and exportable reports",
    ],
    id: "commerce-command-center",
    livePreview: { href: "#", label: "Live Preview" },
    summary:
      "A real-time merchant dashboard for sales, inventory, and operations.",
    techStack: ["MERN", "React", "Node.js", "MongoDB"],
    title: "Commerce Command Center",
  },
  {
    caseStudy: { href: "#", label: "Case Study" },
    category: "Mobile Apps",
    description:
      "A field reporting app for distributed teams with offline data capture, incident notes, media uploads, and secure sync when connectivity returns.",
    features: [
      "Offline-first reporting",
      "Media upload workflow",
      "Location-aware task logs",
      "Secure cloud sync",
    ],
    id: "field-ops-mobile",
    livePreview: { href: "#", label: "Live Preview" },
    summary:
      "A mobile operations app for field teams working across remote sites.",
    techStack: ["Flutter", "Firebase", "Node.js"],
    title: "Field Ops Mobile",
  },
  {
    caseStudy: { href: "#", label: "Case Study" },
    category: "Cloud Solutions",
    description:
      "A deployment modernization project replacing manual release steps with CI/CD, observability dashboards, rollback plans, and cloud infrastructure documentation.",
    features: [
      "CI/CD release pipeline",
      "Cloud monitoring dashboards",
      "Rollback and recovery flow",
      "Infrastructure documentation",
    ],
    id: "cloudflow-release-system",
    livePreview: { href: "#", label: "Live Preview" },
    summary:
      "A cloud release system for safer deployments and faster engineering cycles.",
    techStack: ["AWS", "Docker", "GitHub Actions", "Grafana"],
    title: "CloudFlow Release System",
  },
  {
    caseStudy: { href: "#", label: "Case Study" },
    category: "Web Apps",
    description:
      "A B2B analytics portal with server-rendered views, account-level insights, subscription access, and a polished product marketing layer.",
    features: [
      "Server-rendered product portal",
      "Account analytics dashboard",
      "Subscription gated content",
      "Performance-focused UI architecture",
    ],
    id: "launchos-portal",
    livePreview: { href: "#", label: "Live Preview" },
    summary:
      "A product portal and analytics dashboard for a growing B2B platform.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL"],
    title: "LaunchOS Portal",
  },
  {
    caseStudy: { href: "#", label: "Case Study" },
    category: "Mobile Apps",
    description:
      "A health booking mobile experience with practitioner search, appointment scheduling, reminders, and a clean patient onboarding flow.",
    features: [
      "Practitioner search",
      "Appointment booking flow",
      "Reminder notifications",
      "Patient onboarding screens",
    ],
    id: "carelink-booking-app",
    livePreview: { href: "#", label: "Live Preview" },
    summary:
      "A mobile scheduling app for healthcare appointments and reminders.",
    techStack: ["React Native", "Supabase", "Node.js"],
    title: "CareLink Booking App",
  },
  {
    caseStudy: { href: "#", label: "Case Study" },
    category: "Cloud Solutions",
    description:
      "A scalable API and cloud integration layer connecting customer data, billing events, warehouse updates, and business intelligence systems.",
    features: [
      "Event-driven API layer",
      "Billing and warehouse integrations",
      "Data sync reliability checks",
      "Cloud function orchestration",
    ],
    id: "nimbus-integration-hub",
    livePreview: { href: "#", label: "Live Preview" },
    summary:
      "A cloud integration hub connecting business systems and data flows.",
    techStack: ["Node.js", "AWS Lambda", "PostgreSQL", "Redis"],
    title: "Nimbus Integration Hub",
  },
  {
    caseStudy: { href: "#", label: "Case Study" },
    category: "Web Apps",
    description:
      "A collaborative project management web app built around client approvals, milestone tracking, file handoffs, and delivery visibility.",
    features: [
      "Milestone tracking",
      "Client approval flows",
      "File handoff workspace",
      "Team activity timeline",
    ],
    id: "signal-project-suite",
    livePreview: { href: "#", label: "Live Preview" },
    summary:
      "A collaboration suite for delivery teams and client stakeholders.",
    techStack: ["React Router", "MERN", "Tailwind CSS"],
    title: "Signal Project Suite",
  },
  {
    caseStudy: { href: "#", label: "Case Study" },
    category: "Cloud Solutions",
    description:
      "A performance and reliability engagement focused on caching, database tuning, CDN configuration, and release observability.",
    features: [
      "Database query tuning",
      "CDN and cache strategy",
      "Performance budget tracking",
      "Release observability",
    ],
    id: "pulse-performance-cloud",
    livePreview: { href: "#", label: "Live Preview" },
    summary:
      "A cloud performance engagement for faster pages and steadier releases.",
    techStack: ["Vercel", "PostgreSQL", "Redis", "Grafana"],
    title: "Pulse Performance Cloud",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio | Nexa Studio" },
    {
      name: "description",
      content:
        "Explore Nexa Studio web app, mobile app, and cloud solution project work.",
    },
  ];
}

export default function PortfolioArchive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.summary.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <Navbar />
      <main className="overflow-hidden bg-[#05070d]">
        <section className="relative isolate overflow-hidden px-5 py-24 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_82%_22%,rgba(217,70,239,0.14),transparent_30%),linear-gradient(180deg,#05070d_0%,#07111f_58%,#05070d_100%)]" />
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Portfolio Archive
              </p>
              <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Project work built for launch, scale, and clarity.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Browse selected web apps, mobile apps, and cloud solutions
                shaped around sharp product thinking and dependable engineering.
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-xl sm:p-5">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <label className="relative block">
                  <span className="sr-only">Search projects</span>
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-12 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:shadow-[0_0_28px_rgba(34,211,238,0.16)]"
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setVisibleCount(6);
                    }}
                    placeholder="Search by title or description"
                    type="search"
                    value={searchQuery}
                  />
                </label>

                <div className="flex flex-wrap gap-2">
                  {categoryFilters.map((category) => {
                    const isActive = activeCategory === category;

                    return (
                      <button
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          isActive
                            ? "border-cyan-300/70 bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(103,232,249,0.28)]"
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-cyan-100"
                        }`}
                        key={category}
                        onClick={() => {
                          setActiveCategory(category);
                          setVisibleCount(6);
                        }}
                        type="button"
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project, index) => (
                <button
                  className="group overflow-hidden rounded-xl border border-white/10 bg-[#07111f] text-left transition duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-cyan-300/50 hover:shadow-[0_0_44px_rgba(34,211,238,0.16)]"
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  type="button"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(34,211,238,0.28),transparent_32%),radial-gradient(circle_at_78%_74%,rgba(217,70,239,0.24),transparent_34%),linear-gradient(135deg,#0f172a,#020617)] transition duration-300 group-hover:scale-105" />
                    <div className="absolute inset-6 rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Project 0{index + 1}</span>
                        <span>{project.category}</span>
                      </div>
                      <div className="mt-10 grid h-24 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-2xl font-black text-cyan-100 shadow-[0_0_34px_rgba(34,211,238,0.14)]">
                        {project.title
                          .split(" ")
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                      {project.category}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white">
                      {project.title}
                    </h2>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      {project.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100"
                          key={`${project.id}-${tech}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {visibleProjects.length === 0 && (
              <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.035] p-8 text-center">
                <h2 className="text-2xl font-bold text-white">
                  No projects found
                </h2>
                <p className="mt-3 text-sm text-slate-400">
                  Try a different search term or category filter.
                </p>
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <button
                className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-7 py-3 text-sm font-bold text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)] transition hover:-translate-y-0.5 hover:border-cyan-200/70 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                disabled={!hasMoreProjects}
                onClick={() =>
                  setVisibleCount((current) =>
                    Math.min(current + 3, filteredProjects.length),
                  )
                }
                type="button"
              >
                {hasMoreProjects ? "Load More Projects" : "All Projects Loaded"}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        projectData={selectedProject}
      />
    </div>
  );
}
