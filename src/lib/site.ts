/**
 * إعدادات الموقع — عدّل القيم هنا فقط وسيتم تحديث الموقع كله.
 * Site configuration — edit values here and the whole site updates.
 */
export const site = {
  name: "MA SYSTEM",

  // رابط الموقع الرسمي (يُستخدم في SEO و canonical)
  url: "https://masystem.abowarda.tech",

  // مستودع الإصدارات على GitHub (صيغة: اسم-المستخدم/اسم-المستودع)
  // GitHub releases repo, e.g. "myuser/ma-system-releases"
  githubRepo: "E-MWK/MA-System-Releases",

  // اسم ملف التثبيت داخل الإصدار (يُفضَّل أن يكون ثابتًا مثل MA-SYSTEM-Setup.exe)
  // Installer asset file name inside the release
  installerFileName: "MA_SYS_1.0.2_x64.exe",

  // رابط التحميل المباشر للنسخة الحالية
  // Direct download link for the current release
  directDownloadUrl:
    "https://github.com/E-MWK/MA-System-Releases/releases/download/v1.0.3/MA_SYS_1.0.2_x64.exe",

  // رقم الواتساب بالصيغة الدولية بدون + أو مسافات
  whatsapp: "201555232801",

  email: "mw.abowarda@gmail.com",

  facebook: "https://www.facebook.com/MASYSTEM.EG",

  // مفتاح Web3Forms (مجاني من web3forms.com) — يرسل رسائل الفورم لإيميلك
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",

  // السعر — اتركه فارغًا لإخفاء السعر وإظهار «تواصل معنا»
  price: "",
  currencyAr: "جنيه",
  currencyEn: "EGP",
  trialDays: 14,
};

export const githubReleasesUrl = `https://github.com/${site.githubRepo}/releases`;
export const githubLatestApi = `https://api.github.com/repos/${site.githubRepo}/releases/latest`;
export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
