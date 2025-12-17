import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";
import { LocaleProvider } from "@/components/locale-provider";
import { CartProvider } from "@/contexts/cart-context";
import { CartSidebar } from "@/components/cart-sidebar";
import { CartButton } from "@/components/cart-button";
import { Analytics } from "@vercel/analytics/next"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Scandic International School | Международная школа в Уральске",
  description: "Scandic International School - международная школа в Уральске с программой IB PYP для детей 0-4 классов. Лицензия KZ96LAA00035527",
  keywords: "международная школа, Уральск, IB PYP, начальная школа, образование, Scandic",
  authors: [{ name: "Scandic International School" }],
  creator: "Scandic International School",
  publisher: "Scandic International School",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://scandic.school"),
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/ru",
      "kk-KZ": "/kk",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Scandic International School | Международная школа в Уральске",
    description: "Scandic International School - международная школа в Уральске с программой IB PYP для детей 0-4 классов",
    url: "https://scandic.school",
    siteName: "Scandic International School",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scandic International School",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scandic International School | Международная школа в Уральске",
    description: "Scandic International School - международная школа в Уральске с программой IB PYP для детей 0-4 классов",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <LocaleProvider>
          <QueryProvider>
            <CartProvider>
              {children}
              <CartSidebar />
              <CartButton />
            </CartProvider>
          </QueryProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}