import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Globe, Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import logoFull from "@/assets/logo-full.png";

export function Header() {
  const { t, toggle, lang } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/features", label: t("nav.features") },
    { to: "/download", label: t("nav.download") },
    { to: "/docs", label: t("nav.docs") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="MA SYSTEM">
          <img src={logoFull} alt="MA SYSTEM" className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground ${
                pathname === l.to
                  ? "text-emerald-brand"
                  : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <Link
            to="/download"
            className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90 sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            {t("nav.cta")}
          </Link>
          <button
            className="rounded-lg p-2 hover:bg-secondary md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t bg-background px-4 py-3 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                pathname === l.to
                  ? "bg-secondary text-emerald-brand"
                  : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/download"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
          >
            <Download className="h-4 w-4" />
            {t("nav.cta")}
          </Link>
        </nav>
      )}
    </header>
  );
}
