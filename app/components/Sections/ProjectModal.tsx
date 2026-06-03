import { useEffect } from "react";

interface ProjectLink {
  label?: string;
  href: string;
}

export interface ProjectModalData {
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  imageAlt?: string;
  imageUrl?: string;
  livePreview?: ProjectLink;
  caseStudy?: ProjectLink;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectData: ProjectModalData | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  projectData,
}: ProjectModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!projectData) {
    return null;
  }

  const livePreview = projectData.livePreview ?? {
    label: "Live Preview",
    href: "#",
  };
  const caseStudy = projectData.caseStudy ?? {
    label: "Github/Case Study",
    href: "#",
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[90] grid place-items-center px-4 py-8 transition duration-300 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      role="presentation"
    >
      <button
        aria-label="Close project modal"
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
        onClick={onClose}
        type="button"
      />

      <section
        aria-labelledby="project-modal-title"
        aria-modal="true"
        className={`relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-cyan-300/20 bg-[#07111f] text-white shadow-[0_0_90px_rgba(34,211,238,0.22)] transition duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        role="dialog"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />

        <button
          aria-label="Close modal"
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/10 text-slate-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
          onClick={onClose}
          type="button"
        >
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>

        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div className="relative min-h-[22rem] overflow-hidden rounded-xl border border-white/10 bg-slate-950">
            {projectData.imageUrl ? (
              <img
                alt={projectData.imageAlt ?? projectData.title}
                className="h-full min-h-[22rem] w-full object-cover"
                src={projectData.imageUrl}
              />
            ) : (
              <div className="grid h-full min-h-[22rem] place-items-center bg-[radial-gradient(circle_at_28%_24%,rgba(34,211,238,0.28),transparent_32%),radial-gradient(circle_at_78%_74%,rgba(217,70,239,0.24),transparent_34%),linear-gradient(135deg,#0f172a,#020617)]">
                <svg
                  aria-hidden="true"
                  className="h-64 w-64 text-cyan-100/80 drop-shadow-[0_0_35px_rgba(34,211,238,0.45)]"
                  fill="none"
                  viewBox="0 0 320 320"
                >
                  <rect
                    height="184"
                    rx="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    width="248"
                    x="36"
                    y="58"
                  />
                  <path
                    d="M36 104h248M86 210h148M116 258h88M138 242l-10 16M182 242l10 16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                  <circle cx="68" cy="82" fill="currentColor" r="6" />
                  <circle cx="92" cy="82" fill="currentColor" r="6" />
                  <circle cx="116" cy="82" fill="currentColor" r="6" />
                  <path
                    d="M98 156h50l18-28 24 62 18-34h28"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="5"
                  />
                </svg>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 to-transparent" />
          </div>

          <div className="flex flex-col justify-center py-4 lg:pr-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Project Detail
            </p>
            <h2
              className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl"
              id="project-modal-title"
            >
              {projectData.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
              {projectData.description}
            </p>

            <div className="mt-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Features Built
              </h3>
              <ul className="mt-4 space-y-3">
                {projectData.features.map((feature) => (
                  <li
                    className="flex gap-3 text-sm leading-6 text-slate-300"
                    key={feature}
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tech Stack
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {projectData.techStack.map((tech) => (
                  <span
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_28px_rgba(103,232,249,0.34)] transition hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_42px_rgba(103,232,249,0.55)]"
                href={livePreview.href}
                rel="noreferrer"
                target="_blank"
              >
                {livePreview.label ?? "Live Preview"}
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-fuchsia-300/40 bg-white/5 px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(217,70,239,0.18)] transition hover:-translate-y-0.5 hover:border-fuchsia-200/70 hover:bg-fuchsia-300/10"
                href={caseStudy.href}
                rel="noreferrer"
                target="_blank"
              >
                {caseStudy.label ?? "Github/Case Study"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
