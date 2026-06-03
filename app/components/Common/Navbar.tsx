import { useState } from "react";
import { Link, NavLink } from "react-router";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  brandName?: string;
  links?: NavItem[];
}

const defaultLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
];

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      {isOpen ? (
        <path
          d="M6 6l12 12M18 6 6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}

export default function Navbar({
  brandName = "Nexa Studio",
  links = defaultLinks,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 text-white shadow-lg shadow-slate-950/10 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/55">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
      >
        <Link
          className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em]"
          onClick={closeDrawer}
          to="/"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.18)]">
            NX
          </span>
          <span className="text-white transition group-hover:text-cyan-100">
            {brandName}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? "text-cyan-300 bg-cyan-300/10 border-cyan-300/20 shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                    : "border-transparent text-slate-200 hover:bg-white/10 hover:text-white"
                }`
              }
              key={item.href}
              to={item.href}
              end={item.href === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link
          className="hidden rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20 md:inline-flex"
          to="/#contact"
        >
          Start a project
        </Link>

        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/10 text-white transition hover:bg-white/15 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <MenuIcon isOpen={isOpen} />
        </button>
      </nav>

      <div
        className={`md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } transition-opacity`}
      >
        <button
          aria-label="Close navigation menu"
          className="fixed inset-0 top-20 z-40 bg-slate-950/60"
          onClick={closeDrawer}
          type="button"
        />
        <div
          className={`absolute right-4 top-20 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-slate-950/40 backdrop-blur-xl transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-3"
          }`}
        >
          <div className="flex flex-col gap-1">
            {links.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-base font-medium transition-all duration-300 border ${
                    isActive
                      ? "text-cyan-300 bg-cyan-300/10 border-cyan-300/20 shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                      : "border-transparent text-slate-100 hover:bg-white/10"
                  }`
                }
                key={item.href}
                onClick={closeDrawer}
                to={item.href}
                end={item.href === "/"}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              className="mt-2 rounded-lg bg-cyan-300 px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              onClick={closeDrawer}
              to="/#contact"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
