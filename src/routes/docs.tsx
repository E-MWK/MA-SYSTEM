import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpenCheck,
  CircleHelp,
  DatabaseBackup,
  FileText,
  KeyRound,
  ListChecks,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { CtaSection } from "@/components/CtaSection";

const titleAr = "مركز المساعدة — شروحات برنامج MA SYSTEM";
const descAr =
  "شروحات MA SYSTEM خطوة بخطوة: البدء السريع، أول فاتورة، جرد المخزن، النسخ الاحتياطي والاستعادة، وتفعيل الترخيص.";
const titleEn = "MA SYSTEM Help Center — Guides & Tutorials";
const descEn =
  "Step-by-step MA SYSTEM guides: quick start, first invoice, stocktaking, backup & restore, and license activation.";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: titleAr },
      { name: "description", content: descAr },
      { property: "og:title", content: titleAr },
      { property: "og:description", content: descAr },
      { property: "og:url", content: "https://masystem.abowarda.tech/docs" },
      { name: "twitter:title", content: titleAr },
      { name: "twitter:description", content: descAr },
    ],
    links: [
      { rel: "canonical", href: "https://masystem.abowarda.tech/docs" },
    ],
  }),
  component: DocsPage,
});

interface DocArticle {
  icon: typeof FileText;
  titleKey: TranslationKey;
  itemsKey: TranslationKey;
  id: string;
}

const articles: DocArticle[] = [
  { icon: BookOpenCheck, titleKey: "docs.start.title", itemsKey: "docs.start.items", id: "quick-start" },
  { icon: FileText, titleKey: "docs.invoice.title", itemsKey: "docs.invoice.items", id: "first-invoice" },
  { icon: ListChecks, titleKey: "docs.stock.title", itemsKey: "docs.stock.items", id: "stocktake" },
  { icon: DatabaseBackup, titleKey: "docs.backup.title", itemsKey: "docs.backup.items", id: "backup" },
  { icon: KeyRound, titleKey: "docs.license.title", itemsKey: "docs.license.items", id: "license" },
];

function DocsPage() {
  const { t, ta } = useLang();

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-4 py-20 text-navy-foreground sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, oklch(0.62 0.14 162) 0%, transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              {t("docs.hero.title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed opacity-85">
              {t("docs.hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl space-y-6">
          {articles.map((a, i) => (
            <Reveal key={a.id} delay={i * 60}>
              <article
                id={a.id}
                className="scroll-mt-24 rounded-2xl border bg-card p-7 shadow-sm sm:p-9"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-accent p-3">
                    <a.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-foreground">{t(a.titleKey)}</h2>
                </div>
                <ol className="mt-6 space-y-3.5">
                  {ta(a.itemsKey).map((step, j) => (
                    <li key={step} className="flex items-start gap-3 leading-relaxed text-muted-foreground">
                      <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                        {j + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center">
              <CircleHelp className="h-8 w-8 text-emerald-brand" />
              <p className="font-semibold text-foreground">{t("docs.ask")}</p>
              <Link
                to="/contact"
                className="rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
