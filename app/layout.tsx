import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Como Market | Premium Marketplace",
    template: "%s | Como Market",
  },
  description: "Discover the best products at Como Market. Shop for premium electronics, fashion, and lifestyle essentials with ease.",
  keywords: ["marketplace", "e-commerce", "como market", "premium products", "online shopping", "comores market", "comoros market", "comoros marketplace", "comoros e-commerce", "comoros premium products", "comoros online shopping", "comoros marketplace", "comoros e-commerce", "comoros premium products", "comoros online shopping"],
  authors: [{ name: "Como Market Team" }],
  creator: "Como Market",
  publisher: "Como Market",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://como-market.vercel.app",
    siteName: "Como Market",
    title: "Como Market | Premium Marketplace",
    description: "Discover the best products at Como Market. Shop for premium electronics, fashion, and lifestyle essentials.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Como Market",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Como Market | Premium Marketplace",
    description: "Discover the best products at Como Market. Shop for premium electronics, fashion, and lifestyle essentials.",
    images: ["/og-image.jpg"],
    creator: "@comomarket",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Como Market",
              "url": "https://como-market.vercel.app",
              "logo": "https://como-market.vercel.app/logo.png",
              "sameAs": [
                "https://facebook.com/comomarket",
                "https://twitter.com/comomarket",
                "https://instagram.com/comomarket"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-000-0000",
                "contactType": "customer service"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Como Market",
              "url": "https://como-market.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://como-market.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
