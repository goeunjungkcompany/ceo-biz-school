import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const TITLE = "CEO Business School | 지식 최신화, 전략 최신화";
const DESCRIPTION =
  "세상에서 가장 빠르게 변하는 지식과 전략을 연구하고, 전파하고, 교육합니다. CEO의 지식과 전략이 최신화될 때, 기업의 미래가 바뀝니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | CEO Business School" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "ko_KR",
    // 대표 이미지는 app/opengraph-image.tsx 가 자동 제공
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <html lang={locale} className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <Header locale={locale} userEmail={user?.email ?? null} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
