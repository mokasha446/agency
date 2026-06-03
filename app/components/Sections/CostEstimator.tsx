import { useMemo, useState } from "react";

type ProjectType = "Web App" | "Mobile App" | "Landing Page" | "E-commerce";
type PageRange = "1-5" | "5-10" | "10+";
type ExtraFeature =
  | "Database Integration"
  | "User Auth"
  | "Payment Gateway"
  | "Custom Animations";
type Timeline = "Urgent (< 2 weeks)" | "Standard (1 month)" | "Flexible";

interface PricedOption<T extends string> {
  label: T;
  price: number;
  description?: string;
}

interface EstimatePayload {
  projectType: ProjectType;
  pages: PageRange;
  features: ExtraFeature[];
  timeline: Timeline;
  priceRange: string;
}

const projectTypes: PricedOption<ProjectType>[] = [
  {
    label: "Web App",
    price: 650000,
    description: "Dashboards, portals, SaaS platforms, and internal tools.",
  },
  {
    label: "Mobile App",
    price: 850000,
    description: "Cross-platform apps with polished mobile experiences.",
  },
  {
    label: "Landing Page",
    price: 220000,
    description: "Conversion-focused pages for launches and campaigns.",
  },
  {
    label: "E-commerce",
    price: 780000,
    description: "Stores, carts, checkout flows, and commerce operations.",
  },
];

const pageRanges: PricedOption<PageRange>[] = [
  { label: "1-5", price: 0 },
  { label: "5-10", price: 180000 },
  { label: "10+", price: 360000 },
];

const extraFeatures: PricedOption<ExtraFeature>[] = [
  { label: "Database Integration", price: 160000 },
  { label: "User Auth", price: 140000 },
  { label: "Payment Gateway", price: 180000 },
  { label: "Custom Animations", price: 120000 },
];

const timelines: PricedOption<Timeline>[] = [
  { label: "Urgent (< 2 weeks)", price: 260000 },
  { label: "Standard (1 month)", price: 90000 },
  { label: "Flexible", price: 0 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    currency: "PKR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function getOptionPrice<T extends string>(options: PricedOption<T>[], label: T) {
  return options.find((option) => option.label === label)?.price ?? 0;
}

export default function CostEstimator() {
  const [projectType, setProjectType] = useState<ProjectType>("Web App");
  const [pages, setPages] = useState<PageRange>("1-5");
  const [selectedFeatures, setSelectedFeatures] = useState<ExtraFeature[]>([
    "User Auth",
  ]);
  const [timeline, setTimeline] = useState<Timeline>("Standard (1 month)");

  const estimate = useMemo(() => {
    const featureTotal = selectedFeatures.reduce(
      (total, feature) => total + getOptionPrice(extraFeatures, feature),
      0,
    );

    const baseTotal =
      getOptionPrice(projectTypes, projectType) +
      getOptionPrice(pageRanges, pages) +
      getOptionPrice(timelines, timeline) +
      featureTotal;

    const low = Math.round(baseTotal * 0.9);
    const high = Math.round(baseTotal * 1.2);

    return {
      high,
      low,
      range: `${formatCurrency(low)} - ${formatCurrency(high)}`,
    };
  }, [pages, projectType, selectedFeatures, timeline]);

  const toggleFeature = (feature: ExtraFeature) => {
    setSelectedFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature],
    );
  };

  const submitEstimate = () => {
    const payload: EstimatePayload = {
      features: selectedFeatures,
      pages,
      priceRange: estimate.range,
      projectType,
      timeline,
    };

    window.dispatchEvent(
      new CustomEvent<EstimatePayload>("cost-estimate:submit", {
        detail: payload,
      }),
    );

    window.setTimeout(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section className="bg-[#05070d] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Cost Estimator
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Shape your scope and get a live project range.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Select the most likely build requirements and send the estimate
              directly to the team for a sharper proposal.
            </p>

            <div className="mt-8 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-6 shadow-[0_0_55px_rgba(34,211,238,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">
                Estimated Range
              </p>
              <p className="mt-3 text-3xl font-black text-white sm:text-4xl">
                {estimate.range}
              </p>
              <p className="mt-3 text-sm leading-6 text-cyan-50/80">
                Final pricing depends on integrations, assets, content state,
                compliance needs, and launch support.
              </p>
              <button
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.35)] transition hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_44px_rgba(103,232,249,0.55)] sm:w-auto"
                onClick={submitEstimate}
                type="button"
              >
                Submit this Estimate to Team
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_0_60px_rgba(34,211,238,0.06)] sm:p-6">
              <h3 className="text-lg font-bold text-white">Project Type</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {projectTypes.map((option) => {
                  const isSelected = projectType === option.label;

                  return (
                    <button
                      className={`rounded-xl border p-5 text-left transition duration-300 hover:-translate-y-0.5 ${
                        isSelected
                          ? "border-cyan-300/70 bg-cyan-300/10 shadow-[0_0_30px_rgba(34,211,238,0.18)]"
                          : "border-white/10 bg-slate-950/60 hover:border-cyan-300/35"
                      }`}
                      key={option.label}
                      onClick={() => setProjectType(option.label)}
                      type="button"
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-base font-bold text-white">
                          {option.label}
                        </span>
                        <span
                          className={`h-4 w-4 rounded-full border ${
                            isSelected
                              ? "border-cyan-200 bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.85)]"
                              : "border-slate-500"
                          }`}
                        />
                      </span>
                      <span className="mt-3 block text-sm leading-6 text-slate-400">
                        {option.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white">
                  Pages/Screens Needed
                </h3>
                <div className="mt-5 grid gap-3">
                  {pageRanges.map((option) => {
                    const isSelected = pages === option.label;

                    return (
                      <button
                        className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                          isSelected
                            ? "border-fuchsia-300/70 bg-fuchsia-300/10 shadow-[0_0_24px_rgba(217,70,239,0.16)]"
                            : "border-white/10 bg-slate-950/60 hover:border-fuchsia-300/35"
                        }`}
                        key={option.label}
                        onClick={() => setPages(option.label)}
                        type="button"
                      >
                        <span className="text-sm font-semibold text-white">
                          {option.label}
                        </span>
                        <span className="text-xs text-slate-400">
                          {option.price === 0
                            ? "Base"
                            : `+ ${formatCurrency(option.price)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white">Timeline</h3>
                <div className="mt-5 grid gap-3">
                  {timelines.map((option) => {
                    const isSelected = timeline === option.label;

                    return (
                      <button
                        className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                          isSelected
                            ? "border-emerald-300/70 bg-emerald-300/10 shadow-[0_0_24px_rgba(110,231,183,0.14)]"
                            : "border-white/10 bg-slate-950/60 hover:border-emerald-300/35"
                        }`}
                        key={option.label}
                        onClick={() => setTimeline(option.label)}
                        type="button"
                      >
                        <span className="text-sm font-semibold text-white">
                          {option.label}
                        </span>
                        <span className="text-xs text-slate-400">
                          {option.price === 0
                            ? "No rush fee"
                            : `+ ${formatCurrency(option.price)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <h3 className="text-lg font-bold text-white">Extra Features</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {extraFeatures.map((option) => {
                  const isSelected = selectedFeatures.includes(option.label);

                  return (
                    <label
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border px-4 py-4 transition duration-300 hover:-translate-y-0.5 ${
                        isSelected
                          ? "border-cyan-300/70 bg-cyan-300/10 shadow-[0_0_28px_rgba(34,211,238,0.16)]"
                          : "border-white/10 bg-slate-950/60 hover:border-cyan-300/35"
                      }`}
                      key={option.label}
                    >
                      <input
                        checked={isSelected}
                        className="sr-only"
                        onChange={() => toggleFeature(option.label)}
                        type="checkbox"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-white">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-xs text-slate-400">
                          + {formatCurrency(option.price)}
                        </span>
                      </span>
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${
                          isSelected
                            ? "border-cyan-200 bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.8)]"
                            : "border-slate-500"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-sm bg-slate-950 transition ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
