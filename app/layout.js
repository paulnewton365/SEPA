import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "SEPA Brand Foundation Study | Antenna Group",
  description:
    "A short, considered set of questions on the SEPA and PUF brands, conducted by Antenna Group.",
  icons: {
    icon: [
      { url: "https://www.antennagroup.com/favicon.ico" },
      {
        url: "https://ktuyiikwhspwmzvyczit.supabase.co/storage/v1/object/public/assets/brand/antenna-new-logo.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "https://www.antennagroup.com/favicon.ico",
    apple: "https://www.antennagroup.com/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
