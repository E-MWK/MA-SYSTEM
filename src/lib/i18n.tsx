import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type TranslationKey } from "./content";

export type Lang = "ar" | "en";

interface LangContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: TranslationKey) => string;
  ta: (key: TranslationKey) => string[];
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "ma-system-lang";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "ar";
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "ar" || param === "en") return param;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "ar" || saved === "en") return saved;
  return "ar";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((p) => (p === "ar" ? "en" : "ar")),
    [],
  );

  const t = useCallback(
    (key: TranslationKey) => {
      const entry = translations[key] as
        | { ar: string | readonly string[]; en: string | readonly string[] }
        | undefined;
      if (!entry) return key;
      const v = entry[lang];
      return Array.isArray(v) ? (v as readonly string[]).join(" ") : (v as string);
    },
    [lang],
  );

  const ta = useCallback(
    (key: TranslationKey): string[] => {
      const entry = translations[key] as
        | { ar: string | readonly string[]; en: string | readonly string[] }
        | undefined;
      if (!entry) return [];
      const v = entry[lang];
      return Array.isArray(v) ? [...(v as readonly string[])] : [v as string];
    },
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, dir, setLang, toggle, t, ta }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
