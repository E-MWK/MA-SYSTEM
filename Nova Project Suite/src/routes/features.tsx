import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Boxes,
  Calculator,
  CheckCircle2,
  HeartHandshake,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { CtaSection } from "@/components/CtaSection";

const titleAr = "وظائف برنامج MA SYSTEM — فواتير ومخازن وحسابات وتقارير";
const descAr =
  "جولة كاملة في وظائف MA SYSTEM: فواتير بيع وشراء، مخازن ونواقص وصلاحيات، تسعير وأرباح، حسابات وضريبة قيمة مضافة، تقارير، وأمان ونسخ احتياطي.";
const titleEn = "MA SYSTEM Features — Invoicing, Inventory, Accounting & Reports";
const descEn =
  "Full tour of MA SYSTEM: sales & purchase invoicing, multi-warehouse stock, pricing & profit, accounting & VAT, reports, security & backups.";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: titleAr },
      { name: "description", content: descAr },
      { property: "og:title", content: titleAr },
      { property: "og:description", content: descAr },
      { property: "og:url", content: "/features" },
      { name: "twitter:title", content: titleAr },
      { name: "twitter:description", content: descAr },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: FeaturesPage,
});

interface FeatureBlock {
  icon: typeof Receipt;
  titleKey: TranslationKey;
  itemsKey: TranslationKey;
}

const blocks: FeatureBlock[] = [
  { icon: Receipt, titleKey: "ft.sales.title", itemsKey: "ft.sales.items" },
  { icon: ShoppingCart, titleKey: "ft.purchases.title", itemsKey: "ft.purchases.items" },
  { icon: Boxes, titleKey: "ft.inventory.title", itemsKey: "ft.inventory.items" },
  { icon: TrendingUp, titleKey: "ft.pricing.title", itemsKey: "ft.pricing.items" },
  { icon: Calculator, titleKey: "ft.accounting.title", itemsKey: "ft.accounting.items" },
  { icon: BarChart3, titleKey: "ft.reports.title", itemsKey: "ft.reports.items" },
  { icon: ShieldCheck, titleKey: "ft.security.title", itemsKey: "ft.security.items" },
  { icon: HeartHandshake, titleKey: "ft.comfort.title", itemsKey: "ft.comfort.items" },
];

function FeaturesPage() {
  const { t, ta } = useLang();

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-4 py-20 text-navy-foreground sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, oklch(0.62 0.14 162) 0%, transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              {t("features.hero.title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed opacity-85">
              {t("features.hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {blocks.map((b, i) => (
            <Reveal key={b.titleKey} delay={(i % 2) * 100}>
              <article className="h-full rounded-2xl border bg-card p-7 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-accent p-3">
                    <b.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h2 className="text-xl font-extrabold text-foreground">{t(b.titleKey)}</h2>
                </div>
                <ul className="mt-5 space-y-3">
                  {ta(b.itemsKey).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
