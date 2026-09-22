import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enterprise Data & AI Portfolio 2027",
  description:
    "Enterprise analytics, data engineering, BI and AI-assisted delivery portfolio built from a GitHub source of truth.",
};

const preferenceScript = `
(() => {
  try {
    const storedTheme = localStorage.getItem("portfolio-theme");
    const theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    const storedLanguage = localStorage.getItem("portfolio-language");
    const language =
      storedLanguage === "de" || storedLanguage === "en"
        ? storedLanguage
        : navigator.language.toLowerCase().startsWith("de")
          ? "de"
          : "en";
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language;
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
    document.documentElement.dataset.language = "en";
    document.documentElement.lang = "en";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
