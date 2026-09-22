import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enterprise Data & AI Portfolio 2027",
  description:
    "Enterprise analytics, data engineering, BI and AI-assisted delivery portfolio built from a GitHub source of truth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
