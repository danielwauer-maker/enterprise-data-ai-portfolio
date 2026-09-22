"use client";

import { useEffect, useState } from "react";

type Locale = "de" | "en";

function currentLocale(): Locale {
  if (typeof document === "undefined") {
    return "en";
  }
  return document.documentElement.dataset.language === "de" ? "de" : "en";
}

export function LanguageToggle() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(currentLocale());
  }, []);

  function setLanguage(next: Locale) {
    document.documentElement.dataset.language = next;
    document.documentElement.lang = next;
    window.localStorage.setItem("portfolio-language", next);
    setLocale(next);
  }

  return (
    <div
      className="language-toggle"
      role="group"
      aria-label="Language / Sprache"
    >
      <button
        type="button"
        onClick={() => setLanguage("de")}
        className="language-toggle-button"
        aria-pressed={locale === "de"}
        title="Deutsch"
      >
        <span aria-hidden="true">🇩🇪</span>
        <span className="sr-only">Deutsch</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className="language-toggle-button"
        aria-pressed={locale === "en"}
        title="English"
      >
        <span aria-hidden="true">🇬🇧</span>
        <span className="sr-only">English</span>
      </button>
    </div>
  );
}
