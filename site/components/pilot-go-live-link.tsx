"use client";

import { usePathname } from "next/navigation";

export function PilotGoLiveLink() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname.endsWith("/enterprise-data-ai-portfolio/");

  if (!isHome) return null;

  return (
    <a
      href="./control-center/"
      className="fixed bottom-5 right-5 z-50 rounded-full border border-cyan-300/30 bg-slate-950/90 px-4 py-3 text-xs font-semibold text-cyan-100 shadow-xl shadow-black/20 backdrop-blur transition hover:border-cyan-200/50 hover:bg-slate-900 sm:bottom-6 sm:right-6 sm:px-5"
      aria-label="Open BCSentinel Pilot Go-Live plan"
    >
      <span className="lang-en">Pilot Go-Live Plan →</span>
      <span className="lang-de">Pilot-Go-Live-Plan öffnen →</span>
    </a>
  );
}
