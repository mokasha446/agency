import { useEffect, useState } from "react";
import { useToast } from "../Common/Toast";

interface ContactInfo {
  label: string;
  value: string;
}

interface LeadFormState {
  name: string;
  email: string;
  budget: string;
  projectType: string;
  message: string;
}

interface EstimateEventDetail {
  projectType: string;
  pages: string;
  features: string[];
  timeline: string;
  priceRange: string;
}

const contactInfo: ContactInfo[] = [
  { label: "Office", value: "Karachi, Pakistan" },
  { label: "Availability", value: "New projects from July" },
  { label: "Response", value: "Within one business day" },
];

const initialFormState: LeadFormState = {
  name: "",
  email: "",
  budget: "",
  projectType: "Web App",
  message: "",
};

export default function Contact() {
  const [formState, setFormState] = useState<LeadFormState>(initialFormState);
  const { showToast } = useToast();

  useEffect(() => {
    const handleEstimateSubmit = (event: Event) => {
      const estimate = (event as CustomEvent<EstimateEventDetail>).detail;

      setFormState((current) => ({
        ...current,
        budget: estimate.priceRange,
        message: [
          "Estimate submitted from the Cost Estimator:",
          `Project Type: ${estimate.projectType}`,
          `Pages/Screens: ${estimate.pages}`,
          `Extra Features: ${
            estimate.features.length > 0
              ? estimate.features.join(", ")
              : "None selected"
          }`,
          `Timeline: ${estimate.timeline}`,
          `Estimated Range: ${estimate.priceRange}`,
          "",
          current.message,
        ]
          .filter(Boolean)
          .join("\n"),
        projectType: estimate.projectType,
      }));
    };

    window.addEventListener("cost-estimate:submit", handleEstimateSubmit);

    return () => {
      window.removeEventListener("cost-estimate:submit", handleEstimateSubmit);
    };
  }, []);

  const updateField =
    (field: keyof LeadFormState) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      setFormState((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    showToast("Message sent successfully!", "success");
    setFormState(initialFormState);
  };

  return (
    <section
      className="bg-[#05070d] px-5 py-24 text-white sm:px-6 lg:px-8"
      id="contact"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-xl border border-white/10 bg-white/[0.035] p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Contact
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Bring us the idea. We will map the launch path.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            Based in Karachi, partnering with founders and teams that need
            refined interfaces, dependable engineering, and cloud-ready delivery.
          </p>

          <div className="mt-10 space-y-4">
            {contactInfo.map((item) => (
              <div
                className="rounded-lg border border-white/10 bg-slate-950/70 p-5"
                key={item.label}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-5">
            <p className="text-sm leading-6 text-cyan-50">
              Office hub: Karachi, with remote delivery for clients across
              Pakistan, the Gulf, Europe, and North America.
            </p>
          </div>
        </div>

        <form
          className="rounded-xl border border-cyan-300/20 bg-[#07111f] p-6 shadow-[0_0_70px_rgba(34,211,238,0.12)] sm:p-8"
          id="contact-form"
          onSubmit={submitForm}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                className="text-sm font-semibold text-slate-200"
                htmlFor="lead-name"
              >
                Name
              </label>
              <input
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
                id="lead-name"
                onChange={updateField("name")}
                placeholder="Your name"
                type="text"
                value={formState.name}
              />
            </div>

            <div>
              <label
                className="text-sm font-semibold text-slate-200"
                htmlFor="lead-email"
              >
                Email
              </label>
              <input
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
                id="lead-email"
                onChange={updateField("email")}
                placeholder="you@company.com"
                type="email"
                value={formState.email}
              />
            </div>

            <div>
              <label
                className="text-sm font-semibold text-slate-200"
                htmlFor="lead-project-type"
              >
                Project type
              </label>
              <select
                className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
                id="lead-project-type"
                onChange={updateField("projectType")}
                value={formState.projectType}
              >
                <option>Web platform</option>
                <option>Web App</option>
                <option>Mobile App</option>
                <option>Landing Page</option>
                <option>E-commerce</option>
                <option>Mobile app</option>
                <option>Custom software</option>
                <option>Cloud integration</option>
              </select>
            </div>

            <div>
              <label
                className="text-sm font-semibold text-slate-200"
                htmlFor="lead-budget"
              >
                Budget range
              </label>
              <input
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
                id="lead-budget"
                onChange={updateField("budget")}
                placeholder="PKR 500k - 2M"
                type="text"
                value={formState.budget}
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              className="text-sm font-semibold text-slate-200"
              htmlFor="lead-message"
            >
              Project brief
            </label>
            <textarea
              className="mt-2 min-h-40 w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
              id="lead-message"
              onChange={updateField("message")}
              placeholder="Tell us what you want to build, improve, or launch."
              value={formState.message}
            />
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              We review every brief before suggesting a build plan.
            </p>
            <button
              className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.35)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
              type="submit"
            >
              Send inquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
