import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-client";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Scandic International School | Международная школа в Алматы",
  description: "Scandic International School - международная школа в Алматы с программой IB PYP для детей 0-4 классов. Лицензия KZ96LAA00035527",
  keywords: "международная школа, Алматы, IB PYP, начальная школа, образование, Scandic",
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
    title: "Scandic International School | Международная школа в Алматы",
    description: "Scandic International School - международная школа в Алматы с программой IB PYP для детей 0-4 классов",
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
    title: "Scandic International School | Международная школа в Алматы",
    description: "Scandic International School - международная школа в Алматы с программой IB PYP для детей 0-4 классов",
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
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
