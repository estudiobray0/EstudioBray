import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsAppLink } from "@/components/WhatsAppLink";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default as {
    about: { meta: { title: string; description: string } };
  };

  return {
    title: messages.about.meta.title,
    description: messages.about.meta.description,
    openGraph: {
      title: messages.about.meta.title,
      description: messages.about.meta.description,
      locale: locale === "en" ? "en_US" : "es_PE",
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const who = t.raw("who.paragraphs") as string[];
  const how = t.raw("how.paragraphs") as string[];

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-24">
        <p className="text-sage text-sm">{t("kicker")}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(18rem,22rem)_1fr] lg:gap-14">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-line">
              <Image
                src="/bray-portrait.png"
                alt={t("photoAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 352px, 100vw"
                className="object-cover object-[58%_12%]"
              />
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-line">
              <Image
                src="/bray-cusco.png"
                alt={t("photoCuscoAlt")}
                fill
                sizes="(min-width: 1024px) 352px, 100vw"
                className="object-cover object-[48%_42%]"
              />
            </div>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-brown text-sm">{t("who.heading")}</h2>
            <div className="mt-4 space-y-5 text-lg leading-relaxed">
              {who.map((paragraph) => (
                <p key={paragraph} className="text-ink/90">
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="text-sage mt-12 text-sm">{t("how.heading")}</h2>
            <div className="mt-4 space-y-5 text-lg leading-relaxed">
              {how.map((paragraph) => (
                <p key={paragraph} className="text-ink/90">
                  {paragraph}
                </p>
              ))}
            </div>

            <WhatsAppLink
              className="btn-primary mt-12 inline-flex rounded-full px-5 py-2.5 text-sm"
              text={t("whatsapp")}
            >
              {t("cta")}
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </main>
  );
}
