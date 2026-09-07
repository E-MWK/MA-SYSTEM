import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  Calculator,
  Download,
  Lock,
  PackageSearch,
  Receipt,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { CtaSection } from "@/components/CtaSection";
import logoIcon from "@/assets/logo-icon.png";

const titleAr = "MA SYSTEM — برنامج حسابات ومخازن للمحلات | فواتير ومبيعات";
const descAr =
  "برنامج حسابات ومخازن معرّب بالكامل: فواتير بيع وشراء، إدارة مخزون ونواقص، أرباح كل صنف، تقارير جاهزة، وبيانات مشفّرة محفوظة عندك. جربه مجانًا.";
const titleEn = "MA SYSTEM — Arabic Accounting & Inventory Software for Shops";
const descEn =
  "Fully-Arabic accounting & inventory app for shops: invoicing, stock control, profit per item, ready reports, encrypted local data. Free trial.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: titleAr },
      { name: "description", content: descAr },
      { property: "og:title", content: titleAr },
      { property: "og:description", content: descAr },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "ar_AR" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:title", content: titleAr },
      { name: "twitter:description", content: descAr },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "alternate", hrefLang: "ar", href: "/" },
      { rel: "alternate", hrefLang: "en", href: "/?lang=en" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "MA SYSTEM",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Windows",
          inLanguage: ["ar", "en"],
          description: descAr,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EGP",
            description: "نسخة تجريبية مجانية كاملة الوظائف",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "هل أقدر أجرب البرنامج قبل الشراء؟",
              acceptedAnswer: {
                "@type": "Answer",
                text: "أيوه. حمّل النسخة التجريبية وجرب كل الوظائف على شغلك الحقيقي. لو عجبك البرنامج، فعّل الترخيص وكمّل على نفس بياناتك من غير ما تخسر أي حاجة.",
              },
            },
            {
              "@type": "Question",
              name: "هل لازم أكون محاسب عشان أستخدمه؟",
              acceptedAnswer: {
                "@type": "Answer",
                text: "لأ خالص. البرنامج معمول لصاحب المحل مش للمحاسب: الواجهة بالعربي، والخطوات واضحة، وأي حاجة محتاجة شرح هتلاقيها في مركز المساعدة أو تسألنا على واتساب.",
              },
            },
            {
              "@type": "Question",
              name: "إيه اللي يحصل لبياناتي لو الجهاز بايز؟",
              acceptedAnswer: {
                "@type": "Answer",
                text: "بياناتك مشفّرة ومحفوظة عندك، ومع نسخة احتياطية على قرص تاني أو وحدة خارجية تقدر ترجّع شغلك كامل على أي جهاز جديد في دقائق.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, ta, lang } = useLang();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const pains = [
    { icon: PackageSearch, title: t("pain.1.title"), text: t("pain.1.text") },
    { icon: TrendingUp, title: t("pain.2.title"), text: t("pain.2.text") },
    { icon: Boxes, title: t("pain.3.title"), text: t("pain.3.text") },
    { icon: Users, title: t("pain.4.title"), text: t("pain.4.text") },
  ];

  const highlights = [
    { icon: Receipt, title: t("hl.sales.title"), text: t("hl.sales.text") },
    { icon: ShoppingCart, title: t("hl.purchases.title"), text: t("hl.purchases.text") },
    { icon: Boxes, title: t("hl.inventory.title"), text: t("hl.inventory.text") },
    { icon: TrendingUp, title: t("hl.profit.title"), text: t("hl.profit.text") },
    { icon: Calculator, title: t("hl.accounting.title"), text: t("hl.accounting.text") },
    { icon: BarChart3, title: t("hl.reports.title"), text: t("hl.reports.text") },
    { icon: ShieldCheck, title: t("hl.security.title"), text: t("hl.security.text") },
    { icon: RefreshCcw, title: t("hl.backup.title"), text: t("hl.backup.text") },
  ];

  const who = [t("who.1"), t("who.2"), t("who.3"), t("who.4"), t("who.5"), t("who.6")];

  const steps = [
    { n: "1", title: t("how.1.title"), text: t("how.1.text") },
    { n: "2", title: t("how.2.title"), text: t("how.2.text") },
    { n: "3", title: t("how.3.title"), text: t("how.3.text") },
  ];

  const safety = [
    { title: t("safety.1.title"), text: t("safety.1.text") },
    { title: t("safety.2.title"), text: t("safety.2.text") },
    { title: t("safety.3.title"), text: t("safety.3.text") },
    { title: t("safety.4.title"), text: t("safety.4.text") },
  ];

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 0%, oklch(0.62 0.14 162 / 0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-semibold text-muted-foreground shadow-sm">
              <img src={logoIcon} alt="" className="h-5 w-5" />
              {t("hero.badge")}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-black leading-[1.2] text-foreground sm:text-5xl md:text-6xl">
              {t("hero.title")}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t("hero.subtitle")}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/download"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
              >
                <Download className="h-5 w-5" />
                {t("hero.cta.primary")}
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 rounded-xl border bg-card px-8 py-4 text-lg font-bold text-foreground transition-colors hover:bg-secondary"
              >
                {t("hero.cta.secondary")}
                <Arrow className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-muted-foreground">
              {[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")].map((s) => (
                <span key={s} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-brand" />
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── الوجع ── */}
      <Section className="bg-secondary/50">
        <SectionHeader
          kicker={t("pain.kicker")}
          title={t("pain.title")}
          subtitle={t("pain.subtitle")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="h-full rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex rounded-xl bg-accent p-3">
                  <p.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── أبرز الوظائف ── */}
      <Section>
        <SectionHeader
          kicker={t("highlights.kicker")}
          title={t("highlights.title")}
          subtitle={t("highlights.subtitle")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={(i % 4) * 80}>
              <div className="group h-full rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <h.icon className="h-7 w-7 text-emerald-brand" />
                <h3 className="mt-4 text-lg font-bold text-foreground">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {h.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 font-bold text-primary hover:underline"
          >
            {t("highlights.more")}
            <Arrow className="h-4 w-4" />
          </Link>
        </Reveal>
      </Section>

      {/* ── لمن هو ── */}
      <Section className="bg-navy text-navy-foreground">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="mb-3 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold">
              {t("who.kicker")}
            </span>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              {t("who.title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed opacity-80">{t("who.subtitle")}</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {who.map((w, i) => (
              <Reveal key={w} delay={i * 60}>
                <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3.5">
                  <Store className="h-5 w-5 shrink-0 text-emerald-brand" />
                  <span className="text-sm font-semibold">{w}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ── كيف تبدأ ── */}
      <Section>
        <SectionHeader kicker={t("how.kicker")} title={t("how.title")} />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="relative h-full rounded-2xl border bg-card p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-brand text-xl font-black text-emerald-brand-foreground">
                  {s.n}
                </span>
                <h3 className="mt-4 text-xl font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── أمان البيانات ── */}
      <Section className="bg-secondary/50">
        <SectionHeader
          kicker={t("safety.kicker")}
          title={t("safety.title")}
          subtitle={t("safety.subtitle")}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {safety.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="flex h-full gap-4 rounded-2xl border bg-card p-6 shadow-sm">
                <Lock className="h-6 w-6 shrink-0 text-emerald-brand" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── التجربة والشراء ── */}
      <Section>
        <SectionHeader
          kicker={t("pricing.kicker")}
          title={t("pricing.title")}
          subtitle={t("pricing.subtitle")}
        />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border bg-card p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold text-foreground">
                {t("pricing.trial.title")}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                {t("pricing.trial.text")}
              </p>
              <Link
                to="/download"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <Download className="h-5 w-5" />
                {t("pricing.trial.cta")}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-navy p-8 text-navy-foreground shadow-lg">
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  background:
                    "radial-gradient(circle at 85% 15%, oklch(0.62 0.14 162) 0%, transparent 50%)",
                }}
              />
              <div className="relative flex h-full flex-col">
                <h3 className="text-2xl font-extrabold">{t("pricing.license.title")}</h3>
                <p className="mt-3 flex-1 leading-relaxed opacity-85">
                  {t("pricing.license.text")}
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-brand px-6 py-3.5 font-bold text-emerald-brand-foreground transition-transform hover:scale-[1.02]"
                >
                  {t("pricing.license.cta")}
                  <Arrow className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section className="bg-secondary/50">
        <SectionHeader kicker={t("faq.kicker")} title={t("faq.title")} />
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="group rounded-2xl border bg-card shadow-sm">
                <summary className="cursor-pointer list-none px-6 py-5 text-base font-bold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-emerald-brand transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="border-t px-6 py-5 leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
