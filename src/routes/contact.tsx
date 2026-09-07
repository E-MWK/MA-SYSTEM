import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Facebook,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  XCircle,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

const titleAr = "تواصل معنا — MA SYSTEM";
const descAr =
  "كلم فريق MA SYSTEM: واتساب للرد السريع، بريد إلكتروني للاستفسارات، أو نموذج التواصل. دعم بالعربي قبل وبعد الشراء.";
const titleEn = "Contact Us — MA SYSTEM";
const descEn =
  "Reach the MA SYSTEM team: WhatsApp for quick replies, email for inquiries, or the contact form. Arabic support before and after purchase.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: titleAr },
      { name: "description", content: descAr },
      { property: "og:title", content: titleAr },
      { property: "og:description", content: descAr },
      { property: "og:url", content: "https://masystem.abowarda.tech/contact" },
      { name: "twitter:title", content: titleAr },
      { name: "twitter:description", content: descAr },
    ],
    links: [
      { rel: "canonical", href: "https://masystem.abowarda.tech/contact" },
    ],
  }),
  component: ContactPage,
});

type Status = "idle" | "sending" | "success" | "error";

function ContactPage() {
  const { t, lang } = useLang();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", site.web3formsKey);
    data.append("from_name", "MA SYSTEM Website");
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-4 py-20 text-navy-foreground sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 75% 25%, oklch(0.62 0.14 162) 0%, transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              {t("contact.hero.title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed opacity-85">
              {t("contact.hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-5">
          {/* الفورم */}
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="h-full rounded-2xl border bg-card p-7 shadow-sm sm:p-9"
            >
              <h2 className="text-2xl font-extrabold text-foreground">
                {t("contact.form.title")}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-foreground">
                    {t("contact.form.name")} *
                  </label>
                  <input id="name" name="name" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-foreground">
                    {t("contact.form.phone")} *
                  </label>
                  <input id="phone" name="phone" type="tel" required dir="ltr" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-foreground">
                    {t("contact.form.email")}
                  </label>
                  <input id="email" name="email" type="email" dir="ltr" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-foreground">
                    {t("contact.form.subject")}
                  </label>
                  <select id="subject" name="subject" className={inputCls}>
                    <option>{t("contact.form.subject.general")}</option>
                    <option>{t("contact.form.subject.pricing")}</option>
                    <option>{t("contact.form.subject.support")}</option>
                    <option>{t("contact.form.subject.demo")}</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-foreground">
                    {t("contact.form.message")} *
                  </label>
                  <textarea id="message" name="message" required rows={5} className={inputCls} />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {status === "sending" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5 rtl:-scale-x-100" />
                )}
                {status === "sending" ? t("contact.form.sending") : t("contact.form.send")}
              </button>

              {status === "success" && (
                <p className="mt-4 flex items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
                  <CheckCircle2 className="h-5 w-5" />
                  {t("contact.form.success")}
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
                  <XCircle className="h-5 w-5" />
                  {t("contact.form.error")}
                </p>
              )}
            </form>
          </Reveal>

          {/* قنوات التواصل */}
          <div className="space-y-5 lg:col-span-2">
            <Reveal delay={100}>
              <a
                href={whatsappUrl(
                  lang === "ar"
                    ? "مرحبًا، عندي استفسار عن برنامج MA SYSTEM"
                    : "Hello, I have a question about MA SYSTEM",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-accent p-3">
                    <MessageCircle className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">
                    {t("contact.whatsapp.title")}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t("contact.whatsapp.text")}
                </p>
                <span className="mt-4 inline-block rounded-lg bg-emerald-brand px-4 py-2 text-sm font-bold text-emerald-brand-foreground">
                  {t("contact.whatsapp.cta")}
                </span>
              </a>
            </Reveal>

            <Reveal delay={180}>
              <a
                href={`mailto:${site.email}`}
                className="block rounded-2xl border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-accent p-3">
                    <Mail className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">
                    {t("contact.email.title")}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t("contact.email.text")}
                </p>
                <span className="mt-4 inline-block text-sm font-bold text-primary" dir="ltr">
                  {site.email}
                </span>
              </a>
            </Reveal>

            <Reveal delay={260}>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-accent p-3">
                    <Facebook className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">
                    {t("contact.facebook.title")}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t("contact.facebook.text")}
                </p>
                <span className="mt-4 inline-block text-sm font-bold text-primary">
                  {t("contact.facebook.cta")}
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
