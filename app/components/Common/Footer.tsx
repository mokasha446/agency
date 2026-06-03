import { Link } from "react-router";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  agencyName?: string;
  quickLinks?: FooterLink[];
  serviceLinks?: FooterLink[];
}

const defaultQuickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const defaultServiceLinks: FooterLink[] = [
  { label: "Web Design", href: "/services#web-design" },
  { label: "Frontend Systems", href: "/services#frontend" },
  { label: "Brand Interfaces", href: "/services#brand" },
  { label: "Conversion Audits", href: "/services#audits" },
];

export default function Footer({
  agencyName = "Nexa Studio",
  quickLinks = defaultQuickLinks,
  serviceLinks = defaultServiceLinks,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-950 dark:border-white/10 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em]"
            to="/"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-xs text-cyan-200 dark:bg-white dark:text-slate-950">
              NX
            </span>
            {agencyName}
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400">
            A digital agency crafting fast, elegant interfaces for ambitious
            brands and product teams.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Quick Links
          </h2>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-sm text-slate-700 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-200"
                  to={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Services
          </h2>
          <ul className="mt-5 space-y-3">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-sm text-slate-700 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-200"
                  to={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Newsletter
          </h2>
          <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Monthly notes on launch strategy, interface craft, and practical
            frontend performance.
          </p>
          <form className="mt-5 flex overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-white"
              id="newsletter-email"
              placeholder="you@example.com"
              type="email"
            />
            <button
              className="bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-700 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
              type="submit"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-200 px-5 py-6 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
          <p>
            Copyright {year} {agencyName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link className="transition hover:text-cyan-600" to="/privacy">
              Privacy
            </Link>
            <Link className="transition hover:text-cyan-600" to="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
