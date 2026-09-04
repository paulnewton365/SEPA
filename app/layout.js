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

// Absolute URL for social previews. Teams, Slack, LinkedIn and iMessage
// all require an absolute og:image URL, so metadataBase has to resolve to
// the real deployment.
//
// No NEXT_PUBLIC_ prefix: this file is a Server Component and metadata is
// generated on the server, so the value is never needed in the browser.
// The prefix would inline it into the client bundle for no reason. The
// URL itself is not secret, but unnecessary exposure is still a habit
// worth avoiding.
//
// Set SITE_URL to the production domain. VERCEL_URL covers preview
// deployments automatically.
const siteUrl =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000";

const title = "SEPA Brand Foundation Study";
const description =
  "A short set of questions on the SEPA and PUF brands, ahead of the rebrand and website redesign. Around 12 minutes.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  // This is a private research instrument, not a public page. noindex is
  // the mechanism that actually keeps it out of search results, and it is
  // honored by Google and Bing. Note that it does not affect link
  // unfurling: Teams, Slack and Outlook read og: tags regardless, which is
  // what we want.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": -1,
      "max-image-preview": "none",
      "max-video-preview": -1,
    },
  },
  title: `${title} | Antenna Group`,
  description,
  openGraph: {
    type: "website",
    siteName: "Antenna Group",
    title,
    description,
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SEPA Brand Foundation Study, by Antenna Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
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
