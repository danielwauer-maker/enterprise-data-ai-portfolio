import Link from "next/link";
import type { ReactNode } from "react";

export default function ControlCenterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Link
        href="/control-center/prepilot/"
        className="fixed bottom-5 right-5 z-50 rounded-full border border-cyan-300/30 bg-slate-950/90 px-4 py-2.5 text-xs font-semibold text-cyan-100 shadow-xl backdrop-blur transition hover:bg-cyan-300 hover:text-slate-950"
      >
        BCSentinel X0–X8 · Pre-Pilot
      </Link>
    </>
  );
}
