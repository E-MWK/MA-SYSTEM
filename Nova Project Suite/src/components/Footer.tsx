import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";
import logoFull from "@/assets/logo-full.png";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="inline-block rounded-xl bg-white/95 px-3 py-2">
            <img src={logoFull} alt="MA SYSTEM" className="h-9 w-auto" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-80">
            {t("footer.about")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-70">
            {t("footer.links")}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {(
              [
                ["/", "nav.home"],
                ["/features", "nav.features"],
                ["/download", "nav.download"],
                ["/docs", "nav.docs"],
                ["/contact", "nav.contact"],
              ] as const
            ).map(([to, key]) => (
              <li key={to}>
                <Link to={to} className="opacity-80 transition-opacity hover:opacity-100">
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-70">
            {t("footer.contact")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappUrl("مرحبًا، عندي استفسار عن برنامج MA SYSTEM")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
              >
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 text-xs opacity-60 sm:px-6">
          <span>MA SYSTEM © {new Date().getFullYear()} — {t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
