import type { Metadata } from "next";
import { Inter, Noto_Serif, GFS_Didot } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SystemDirectory from "@/components/navigation/SystemDirectory";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_RSS_PATH,
  SITE_URL,
  buildAbsoluteUrl,
} from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const gfsDidot = GFS_Didot({
  variable: "--font-gfs-didot",
  subsets: ["latin"],
  weight: "400",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [...SITE_KEYWORDS],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: 'website',
    siteName: SITE_NAME,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${gfsDidot.variable} ${notoSerif.variable} h-full antialiased dark`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" rel="stylesheet" />
        <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME} Feed`} href={buildAbsoluteUrl(SITE_RSS_PATH)} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-Y3CGNV7TRN" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y3CGNV7TRN');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased relative">

        {children}
        <SystemDirectory />
      </body>
    </html>
  );
}
