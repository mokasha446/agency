import { useState } from "react";
import type { Route } from "./+types/careers";
import Footer from "../components/Common/Footer";
import Navbar from "../components/Common/Navbar";
import { useToast } from "../components/Common/Toast";

interface Position {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

interface ApplicationFormState {
  coverLetter: string;
  email: string;
  fullName: string;
  resumeLink: string;
}

const positions: Position[] = [
  {
    description:
      "Lead frontend delivery for premium client platforms, design systems, dashboards, and production React applications.",
    location: "Remote",
    requirements: [
      "5+ years building React and TypeScript applications",
      "Strong understanding of accessibility, performance, and component architecture",
      "Experience collaborating with designers, backend engineers, and clients",
    ],
    title: "Senior React Developer",
    type: "Full-time",
  },
  {
    description:
      "Design and build reliable APIs, integrations, data models, and backend services for web, mobile, and cloud products.",
    location: "Remote",
    requirements: [
      "4+ years with Node.js, REST APIs, and database design",
      "Experience with authentication, queues, testing, and cloud deployment",
      "Comfortable owning backend decisions from architecture to release",
    ],
    title: "Node.js Engineer",
    type: "Full-time",
  },
  {
    description:
      "Shape product interfaces from discovery and wireframes to polished visual systems for modern software products.",
    location: "Hybrid Karachi or Remote",
    requirements: [
      "Strong portfolio of SaaS, mobile, or dashboard design work",
      "Fluency in Figma, design systems, user flows, and responsive layouts",
      "Ability to translate business goals into clear product experiences",
    ],
    title: "UI/UX Designer",
    type: "Contract",
  },
];

const initialFormState: ApplicationFormState = {
  coverLetter: "",
  email: "",
  fullName: "",
  resumeLink: "",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Careers | Nexa Studio" },
    {
      name: "description",
      content:
        "Join Nexa Studio and help build premium web, mobile, cloud, and software products.",
    },
  ];
}

export default function Careers() {
  const [activePosition, setActivePosition] = useState<number | null>(0);
  const [applyingFor, setApplyingFor] = useState<string | null>(null);
  const [formState, setFormState] =
    useState<ApplicationFormState>(initialFormState);
  const { showToast } = useToast();

  const updateField =
    (field: keyof ApplicationFormState) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      setFormState((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const openApplication = (positionTitle: string) => {
    setApplyingFor(positionTitle);
    window.setTimeout(() => {
      document
        .getElementById("application-form")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  };

  const submitApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.fullName || !formState.email || !formState.resumeLink) {
      showToast("Please complete your name, email, and resume link.", "error");
      return;
    }

    showToast("Application submitted successfully.", "success");
    setFormState(initialFormState);
    setApplyingFor(null);
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <Navbar />
      <main className="overflow-hidden bg-[#05070d]">
        <section className="relative isolate overflow-hidden px-5 py-28 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_82%_28%,rgba(217,70,239,0.14),transparent_30%),linear-gradient(180deg,#05070d_0%,#07111f_56%,#05070d_100%)]" />
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Careers
            </p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Shape the Future of Tech with Us
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              Join a remote-first development agency where ambitious builders
              work on meaningful products with health insurance, a learning
              budget, clear ownership, and room to grow.
            </p>
            <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {["Remote-first", "Health insurance", "Learning budget"].map(
                (benefit) => (
                  <div
                    className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-4 text-sm font-semibold text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.08)]"
                    key={benefit}
                  >
                    {benefit}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                Open Positions
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Find your next high-impact role.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-400">
                We keep teams compact, senior, and focused. Every role has
                ownership across product quality and client outcomes.
              </p>
            </div>

            <div className="space-y-4">
              {positions.map((position, index) => {
                const isExpanded = activePosition === index;

                return (
                  <article
                    className={`overflow-hidden rounded-xl border bg-white/[0.035] transition duration-300 hover:border-cyan-300/45 hover:shadow-[0_0_34px_rgba(34,211,238,0.12)] ${
                      isExpanded
                        ? "border-cyan-300/50 shadow-[0_0_38px_rgba(34,211,238,0.14)]"
                        : "border-white/10"
                    }`}
                    key={position.title}
                  >
                    <button
                      aria-expanded={isExpanded}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                      onClick={() =>
                        setActivePosition((current) =>
                          current === index ? null : index,
                        )
                      }
                      type="button"
                    >
                      <span>
                        <span className="block text-lg font-bold text-white">
                          {position.title}
                        </span>
                        <span className="mt-2 block text-sm text-slate-400">
                          {position.location} | {position.type}
                        </span>
                      </span>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100 transition ${
                          isExpanded ? "rotate-45" : "rotate-0"
                        }`}
                      >
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-white/10 px-5 pb-6 pt-5 sm:px-6">
                          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Job Description
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-slate-300">
                            {position.description}
                          </p>

                          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Requirements
                          </h3>
                          <ul className="mt-3 space-y-3">
                            {position.requirements.map((requirement) => (
                              <li
                                className="flex gap-3 text-sm leading-6 text-slate-300"
                                key={requirement}
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]" />
                                {requirement}
                              </li>
                            ))}
                          </ul>

                          <button
                            className="mt-7 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.35)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                            onClick={() => openApplication(position.title)}
                            type="button"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className={`grid bg-[#07111f] px-5 transition-[grid-template-rows,padding] duration-500 ease-out sm:px-6 lg:px-8 ${
            applyingFor
              ? "grid-rows-[1fr] py-24"
              : "grid-rows-[0fr] py-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mx-auto grid max-w-7xl gap-8 rounded-2xl border border-cyan-300/20 bg-white/[0.035] p-6 shadow-[0_0_70px_rgba(34,211,238,0.1)] sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                  Application Form
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-tight">
                  Apply for {applyingFor}
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  Send your details and resume link. We review each application
                  carefully and respond when there is a strong match.
                </p>
              </div>

              <form className="grid gap-4" id="application-form" onSubmit={submitApplication}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
                    onChange={updateField("fullName")}
                    placeholder="Full name"
                    type="text"
                    value={formState.fullName}
                  />
                  <input
                    className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
                    onChange={updateField("email")}
                    placeholder="Email address"
                    type="email"
                    value={formState.email}
                  />
                </div>

                <input
                  className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
                  onChange={updateField("resumeLink")}
                  placeholder="Resume link"
                  type="url"
                  value={formState.resumeLink}
                />

                <div className="rounded-xl border border-dashed border-cyan-300/30 bg-cyan-300/5 p-5 text-center text-sm text-slate-400">
                  Drag-and-drop resume upload placeholder
                </div>

                <textarea
                  className="min-h-36 rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
                  onChange={updateField("coverLetter")}
                  placeholder="Cover letter"
                  value={formState.coverLetter}
                />

                <button
                  className="rounded-full bg-cyan-300 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.35)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                  type="submit"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
