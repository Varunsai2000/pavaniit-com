import type { Metadata, Viewport } from "next";
import { Manrope, Young_Serif } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveals from "@/components/Reveals";
import { JsonLd } from "@/components/bits";
import { organizationSchema, websiteSchema } from "@/content/schema";
import { site } from "@/content/site";
import "./tokens.css";
import "./globals.css";

// Self-hosted at build time by next/font: no request to Google from visitors.
const manrope = Manrope({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-manrope",
});

// Wordmark only. Swap with the name when the trade name changes.
const wordmark = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-wordmark",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Employer of Record in India | Pavani IT",
    template: "%s",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pavani IT: hire your team in India without an Indian entity" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${wordmark.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so scroll reveals don't flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveals />
      </body>
    </html>
  );
}
