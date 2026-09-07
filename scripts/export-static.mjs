/**
 * تصدير نسخة ثابتة من الموقع لاستضافة GitHub Pages.
 * يشغّل نسخة السيرفر المبنية محليًا ويحفظ HTML كل صفحة داخل مجلد الملفات العامة.
 *
 * الاستخدام: bun run build && node scripts/export-static.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const ROUTES = ["/", "/features", "/download", "/docs", "/contact"];

const serverEntry = [
  ".output/server/index.mjs",
  "dist/server/index.mjs",
].find((p) => existsSync(p));

const publicDir = [".output/public", "dist/client"].find((p) =>
  existsSync(p),
);

if (!serverEntry || !publicDir) {
  console.error(
    "لم يتم العثور على مخرجات البناء. شغّل `bun run build` أولًا.",
  );
  process.exit(1);
}

const mod = await import(`../${serverEntry}`);
const handler = mod.default ?? mod;

// بيئة وهمية: الملفات الثابتة تُقدَّم من GitHub Pages مباشرة وليس من السيرفر
const env = { ASSETS: { fetch: () => new Response(null, { status: 404 }) } };
const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };

async function render(pathname) {
  const res = await handler.fetch(
    new Request(`https://masystem.abowarda.tech${pathname}`),
    env,
    ctx,
  );
  return { status: res.status, html: await res.text() };
}

for (const route of ROUTES) {
  const { status, html } = await render(route);
  if (status !== 200) {
    console.error(`فشل توليد ${route} (الحالة ${status})`);
    process.exit(1);
  }
  const dir = route === "/" ? publicDir : join(publicDir, route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html);
  console.log(`✔ ${route} → ${join(dir, "index.html")} (${html.length} bytes)`);
}

// صفحة 404 لأي رابط غير موجود (GitHub Pages تعرض 404.html تلقائيًا)
const notFound = await render("/this-page-does-not-exist");
await writeFile(join(publicDir, "404.html"), notFound.html);
console.log(`✔ 404 → ${join(publicDir, "404.html")}`);

console.log("\nتم التصدير بنجاح — ارفع محتويات", publicDir, "على الاستضافة.");
