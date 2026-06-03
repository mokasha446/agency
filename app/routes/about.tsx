import { useEffect, useRef, useState } from "react";
import type { Route } from "./+types/about";
import Footer from "../components/Common/Footer";
import Navbar from "../components/Common/Navbar";

interface ValueCard {
  title: string;
  description: string;
}

interface Stat {
  label: string;
  suffix: string;
  value: number;
}

interface TeamMember {
  name: string;
  designation: string;
  linkedin: string;
  github: string;
}

const coreValues: ValueCard[] = [
  {
    title: "Integrity",
    description:
      "Clear communication, honest estimates, and engineering decisions that protect long-term product health.",
  },
  {
    title: "Innovation",
    description:
      "Modern stacks, thoughtful automation, and product ideas shaped around measurable business outcomes.",
  },
  {
    title: "Client-First",
    description:
      "Every sprint is aligned with the client journey, delivery priorities, and the realities of launch.",
  },
  {
    title: "Speed",
    description:
      "Fast execution without careless shortcuts, using reusable systems and sharp technical planning.",
  },
];

const stats: Stat[] = [
  { label: "Projects Delivered", suffix: "+", value: 50 },
  { label: "Tech Experts", suffix: "+", value: 15 },
  { label: "Success Rate", suffix: "%", value: 99 },
];

const teamMembers: TeamMember[] = [
  {
    designation: "Founder and Full-Stack Architect",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    name: "Ayan Siddiqui",
  },
  {
    designation: "Lead Frontend Engineer",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    name: "Maha Qureshi",
  },
  {
    designation: "Cloud and DevOps Specialist",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    name: "Zain Farooq",
  },
  {
    designation: "Product UI Engineer",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    name: "Hira Ahmed",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Nexa Studio | Architecting Digital Excellence" },
    {
      name: "description",
      content:
        "Learn about Nexa Studio, a tech agency building web, mobile, cloud, and custom software products.",
    },
  ];
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.9 8.9H3.7V20h3.2V8.9ZM5.3 4a1.9 1.9 0 1 0 0 3.8A1.9 1.9 0 0 0 5.3 4Zm14.9 9.7c0-3.1-1.7-5.1-4.4-5.1-1.9 0-2.8 1.1-3.3 1.9V8.9H9.4V20h3.2v-5.6c0-1.6.8-2.8 2.3-2.8 1.4 0 2.1 1 2.1 2.8V20h3.2v-6.3Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5.2 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.2 0C17.1 4.9 18 5.2 18 5.2c.6 1.4.2 2.5.1 2.8.7.7 1.1 1.7 1.1 2.8 0 4-2.4 4.9-4.7 5.2.4.3.8 1 .8 2v2.5c0 .3.2.6.8.5A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  );
}

function CountingStat({ label, suffix, value }: Stat) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const statRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = statRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let frameId = 0;
    const duration = 1200;
    const startedAt = performance.now();

    const updateCount = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(value * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCount);
      }
    };

    frameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, value]);

  return (
    <div
      className="rounded-xl border border-cyan-300/20 bg-white/[0.035] p-6 text-center shadow-[0_0_44px_rgba(34,211,238,0.08)] transition hover:border-cyan-300/45 hover:shadow-[0_0_54px_rgba(34,211,238,0.16)]"
      ref={statRef}
    >
      <p className="text-4xl font-black text-white sm:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <Navbar />
      <main className="overflow-hidden bg-[#05070d]">
        <section className="relative isolate overflow-hidden px-5 py-28 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(103,232,249,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_78%_30%,rgba(217,70,239,0.14),transparent_30%),linear-gradient(180deg,rgba(5,7,13,0.4),#05070d_86%)]" />

          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              About Nexa Studio
            </p>
            <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Architecting Digital Excellence
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              Our journey began with a simple belief: great software should
              feel refined, perform reliably, and help ambitious teams move
              faster from idea to launch.
            </p>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Mission and Vision
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Building digital systems that scale with clarity.
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-400">
                Our mission is to design and engineer web, mobile, and cloud
                products that give teams stronger operations and customers
                better experiences.
              </p>
              <p className="mt-5 text-base leading-8 text-slate-400">
                Our vision is to become the trusted technical partner for
                founders and enterprises that want speed, polish, and reliable
                delivery in one place.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {coreValues.map((value) => (
                <article
                  className="group rounded-xl border border-white/10 bg-[#07111f] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:shadow-[0_0_42px_rgba(34,211,238,0.16)]"
                  key={value.title}
                >
                  <div className="mb-6 grid h-11 w-11 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-sm font-black text-cyan-100 transition group-hover:border-cyan-200/60">
                    {value.title.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#07111f] px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                Our Impact
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Numbers shaped by consistent delivery.
              </h2>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {stats.map((stat) => (
                <CountingStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                  Team
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                  Senior builders with product instincts.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-400">
                A compact team of engineers, designers, and cloud specialists
                focused on execution quality.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <article
                  className="rounded-xl border border-white/10 bg-white/[0.035] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/45 hover:shadow-[0_0_42px_rgba(217,70,239,0.14)]"
                  key={member.name}
                >
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xl font-black text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.16)]">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                    {member.designation}
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <a
                      aria-label={`${member.name} on LinkedIn`}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
                      href={member.linkedin}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <LinkedInIcon />
                    </a>
                    <a
                      aria-label={`${member.name} on Github`}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
                      href={member.github}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <GithubIcon />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
