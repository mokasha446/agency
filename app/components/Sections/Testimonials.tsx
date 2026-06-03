import { useEffect, useMemo, useState } from "react";

interface Testimonial {
  clientName: string;
  companyName: string;
  review: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    clientName: "Adeel Khan",
    companyName: "Vertex Commerce",
    rating: 5,
    review:
      "The team translated our messy operations into a clean, fast dashboard that our staff actually enjoys using every day.",
  },
  {
    clientName: "Sara Malik",
    companyName: "Northstar Labs",
    rating: 5,
    review:
      "They brought senior product thinking, strong frontend craft, and a launch process that made the whole build feel calm.",
  },
  {
    clientName: "Hamza Rafiq",
    companyName: "CloudBridge Systems",
    rating: 5,
    review:
      "Our platform became faster, more reliable, and easier to maintain. Their deployment work paid off immediately.",
  },
  {
    clientName: "Mina Shah",
    companyName: "LaunchHaus",
    rating: 5,
    review:
      "From the first prototype to production, every handoff was crisp. The final website looks premium and performs beautifully.",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function StarIcon({ isFilled }: { isFilled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 ${
        isFilled
          ? "fill-cyan-300 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.55)]"
          : "fill-transparent text-slate-600"
      }`}
      viewBox="0 0 24 24"
    >
      <path
        d="m12 3.6 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9L12 3.6Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const activeTestimonials = useMemo(() => {
    return [0, 1, 2].map((offset) => {
      const index = (activeIndex + offset) % testimonials.length;
      return testimonials[index];
    });
  }, [activeIndex]);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="bg-[#07111f] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
              Testimonials
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Clients trust us with the work that has to launch well.
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              aria-label="Show previous testimonial"
              className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
              onClick={goToPrevious}
              type="button"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              aria-label="Show next testimonial"
              className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
              onClick={goToNext}
              type="button"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {activeTestimonials.map((testimonial, cardIndex) => (
            <article
              className={`rounded-xl border bg-[#05070d] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:shadow-[0_0_38px_rgba(34,211,238,0.12)] ${
                cardIndex === 0
                  ? "border-cyan-300/35 shadow-[0_0_42px_rgba(34,211,238,0.1)]"
                  : "border-white/10"
              }`}
              key={`${testimonial.clientName}-${testimonial.companyName}`}
            >
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.14)]">
                  {testimonial.clientName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {testimonial.clientName}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {testimonial.companyName}
                  </p>
                </div>
              </div>

              <div
                aria-label={`${testimonial.rating} out of 5 stars`}
                className="mt-6 flex gap-1"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon
                    isFilled={index < testimonial.rating}
                    key={`${testimonial.clientName}-star-${index}`}
                  />
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-300">
                {testimonial.review}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              aria-label={`Show testimonial from ${testimonial.clientName}`}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.65)]"
                  : "w-2.5 bg-slate-600 hover:bg-slate-400"
              }`}
              key={`${testimonial.clientName}-indicator`}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
