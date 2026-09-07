import { Link } from "@tanstack/react-router";
import { Download, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";
import { Reveal } from "./Reveal";

export function CtaSection() {
  const { t } = useLang();
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center text-navy-foreground sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, oklch(0.62 0.14 162) 0%, transparent 45%), radial-gradient(circle at 85% 80%, oklch(0.62 0.14 162) 0%, transparent 40%)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed opacity-85">
              {t("cta.text")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/download"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-brand px-7 py-3.5 text-base font-bold text-emerald-brand-foreground shadow-lg transition-transform hover:scale-105"
              >
                <Download className="h-5 w-5" />
                {t("cta.button")}
              </Link>
              <a
                href={whatsappUrl("مرحبًا، عندي استفسار عن برنامج MA SYSTEM")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-base font-bold transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5" />
                {t("cta.contact")}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
