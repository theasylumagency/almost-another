import type { Metadata } from "next";
import { Inter, Noto_Serif, GFS_Didot } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SystemDirectory from "@/components/navigation/SystemDirectory";

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
  metadataBase: new URL('https://almostanother.com'),
  title: {
    default: 'Almost Another',
    template: '%s | Almost Another',
  },
  description:
    'Essays, dialogues, and the chronicle of a parallel world.',
  applicationName: 'Almost Another',
  keywords: [
    'essays',
    'dialogues',
    'novel',
    'archive',
    'parallel world',
    'breaking the paradigm',
    'almost another',
  ],
  openGraph: {
    title: 'Almost Another',
    description:
      'Essays, dialogues, and the chronicle of a parallel world.',
    type: 'website',
    siteName: 'Almost Another',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Almost Another',
    description:
      'Essays, dialogues, and the chronicle of a parallel world.',
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
