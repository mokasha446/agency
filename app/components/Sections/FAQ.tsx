import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How quickly can you start a new project?",
    answer:
      "Most projects can begin after a short discovery call, technical scope review, and timeline alignment. For urgent launches, we can shape a focused first sprint within days.",
  },
  {
    question: "Do you handle both design and development?",
    answer:
      "Yes. We can take a project from product strategy and interface design through frontend, backend, deployment, analytics, and ongoing optimization.",
  },
  {
    question: "Can you work with our existing team or codebase?",
    answer:
      "Absolutely. We can integrate with your current workflow, review your existing architecture, and contribute cleanly through your preferred project management and version control process.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We offer support for bug fixes, cloud monitoring, conversion improvements, feature iterations, and performance tuning so the product keeps improving after release.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#05070d] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Clear answers before we start building.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            A quick look at how we scope, collaborate, launch, and support
            development projects.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((item, index) => {
            const isExpanded = activeIndex === index;

            return (
              <article
                className={`overflow-hidden rounded-xl border bg-white/[0.035] transition duration-300 hover:border-cyan-300/45 hover:shadow-[0_0_34px_rgba(34,211,238,0.12)] ${
                  isExpanded
                    ? "border-cyan-300/50 shadow-[0_0_38px_rgba(34,211,238,0.14)]"
                    : "border-white/10"
                }`}
                key={item.question}
              >
                <button
                  aria-expanded={isExpanded}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  onClick={() =>
                    setActiveIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                  type="button"
                >
                  <span className="text-base font-bold text-white sm:text-lg">
                    {item.question}
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
                    <p className="border-t border-white/10 px-5 pb-6 pt-5 text-sm leading-7 text-slate-400 sm:px-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
