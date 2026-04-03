import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Almost Another Articles",
  description: "A premium article library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} h-full antialiased dark`}
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
      </body>
    </html>
  );
}
