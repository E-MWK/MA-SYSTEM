import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Download,
  ExternalLink,
  HardDrive,
  MonitorDown,
  Tag,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { githubLatestApi, githubReleasesUrl, site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { CtaSection } from "@/components/CtaSection";

const titleAr = "تحميل MA SYSTEM — النسخة التجريبية المجانية";
const descAr =
  "حمّل النسخة التجريبية الكاملة من برنامج MA SYSTEM للحسابات والمخازن. تثبيت في دقيقتين، يعمل على ويندوز 10 وأحدث.";
const titleEn = "Download MA SYSTEM — Free Trial";
const descEn =
  "Download the full free trial of MA SYSTEM accounting & inventory software. Installs in two minutes on Windows 10+.";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: titleAr },
      { name: "description", content: descAr },
      { property: "og:title", content: titleAr },
      { property: "og:description", content: descAr },
      { property: "og:url", content: "https://masystem.abowarda.tech/download" },
      { name: "twitter:title", content: titleAr },
      { name: "twitter:description", content: descAr },
    ],
    links: [
      { rel: "canonical", href: "https://masystem.abowarda.tech/download" },
    ],
  }),
  component: DownloadPage,
});

interface ReleaseInfo {
  version: string;
  date: string;
  sizeMb: string | null;
  downloadUrl: string | null;
}

function formatSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const DEFAULT_RELEASE: ReleaseInfo = {
  version: "v1.0.3",
  date: "",
  sizeMb: "161.3 MB",
  downloadUrl: site.directDownloadUrl,
};

function DownloadPage() {
  const { t, ta, lang } = useLang();
  const [release, setRelease] = useState<ReleaseInfo>(DEFAULT_RELEASE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(githubLatestApi)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled) return;
        const assets: { name: string; browser_download_url: string; size: number }[] =
          data.assets ?? [];
        // نفضّل الملف المتفق عليه، وإلا أول ملف تنفيذي، وإلا أول ملف
        const asset =
          assets.find((a) => a.name === site.installerFileName) ??
          assets.find((a) => /\.(exe|msi)$/i.test(a.name)) ??
          assets[0];
        setRelease({
          version: data.tag_name ?? data.name ?? DEFAULT_RELEASE.version,
          date: data.published_at
            ? new Date(data.published_at).toLocaleDateString(
                lang === "ar" ? "ar-EG" : "en-US",
                { year: "numeric", month: "long", day: "numeric" },
              )
            : "",
          sizeMb: asset ? formatSize(asset.size) : DEFAULT_RELEASE.sizeMb,
          downloadUrl: asset?.browser_download_url ?? site.directDownloadUrl,
        });
      })
      .catch(() => {
        // Fallback info is already populated in DEFAULT_RELEASE
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // رابط التحميل: مباشر من الإصدار لو متاح، وإلا الرابط المباشر الافتراضي، وإلا صفحة الإصدارات
  const downloadHref = release?.downloadUrl || site.directDownloadUrl || githubReleasesUrl;

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-4 py-20 text-navy-foreground sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, oklch(0.62 0.14 162) 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              {t("dl.hero.title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed opacity-85">
              {t("dl.hero.subtitle")}
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur">
              {loading ? (
                <p className="text-sm opacity-70">{t("dl.loading")}</p>
              ) : release ? (
                <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                  {release.version && (
                    <span className="flex items-center gap-1.5 opacity-85">
                      <Tag className="h-4 w-4" />
                      {t("dl.version")}: <bdi dir="ltr">{release.version}</bdi>
                    </span>
                  )}
                  {release.sizeMb && (
                    <span className="flex items-center gap-1.5 opacity-85">
                      <HardDrive className="h-4 w-4" />
                      {t("dl.size")}: <bdi dir="ltr">{release.sizeMb}</bdi>
                    </span>
                  )}
                  {release.date && (
                    <span className="opacity-85">
                      {t("dl.date")}: {release.date}
                    </span>
                  )}
                </div>
              ) : null}

              {/* التحميل المباشر: الضغطة تحمّل الملف على طول */}
              <a
                href={downloadHref}
                {...(release?.downloadUrl ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-brand px-8 py-4 text-lg font-bold text-emerald-brand-foreground shadow-lg transition-transform hover:scale-[1.03]"
              >
                <Download className="h-6 w-6" />
                {t("dl.button")}
              </a>

              <p className="mt-4 text-xs opacity-60">
                {t("dl.fallback")}{" "}
                <a
                  href={githubReleasesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline"
                >
                  {t("dl.releases")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border bg-card p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-accent p-3">
                  <MonitorDown className="h-6 w-6 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-extrabold text-foreground">
                  {t("dl.req.title")}
                </h2>
              </div>
              <ul className="space-y-3">
                {ta("dl.req.items").map((r) => (
                  <li key={r} className="flex items-start gap-2.5 leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-brand" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-2xl border bg-card p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-accent p-3">
                  <Download className="h-6 w-6 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-extrabold text-foreground">
                  {t("dl.steps.title")}
                </h2>
              </div>
              <ol className="space-y-4">
                {ta("dl.steps.items").map((s, i) => (
                  <li key={s} className="flex items-start gap-3 leading-relaxed text-muted-foreground">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-brand text-sm font-bold text-emerald-brand-foreground">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
