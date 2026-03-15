import type { Metadata } from "next";
import { VT323, Press_Start_2P } from "next/font/google";
import "./globals.css";

const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" });
const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start" });

export const metadata: Metadata = {
  title: "BRODY LAB",
  description: "Dashboards, agents, and tools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${vt323.variable} ${pressStart.variable}`}>
      <body className={vt323.className}>
        {children}
      </body>
    </html>
  );
}
