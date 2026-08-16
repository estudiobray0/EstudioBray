import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { site } from "@/lib/site";
import "../globals.css";

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default as {
    meta: { title: string; description: string };
  };

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    openGraph: {
      title: site.name,
      description: messages.meta.description,
      locale: locale === "en" ? "en_US" : "es_PE",
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-full flex-col">
            <ScrollProgress />
            <Header />
            {children}
            <SiteFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
