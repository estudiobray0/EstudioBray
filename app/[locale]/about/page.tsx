import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { needIds } from "@/lib/site";

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

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(20rem,1fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-line lg:aspect-auto lg:min-h-full">
            <Image
              src="/bray.jpg"
              alt={t("photoAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-top"
            />
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

            <h2 className="text-blue mt-12 text-sm">{t("needs.heading")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/90">{t("needs.intro")}</p>
            <ul className="mt-8 space-y-5">
              {needIds.map((id, index) => {
                const accents = [
                  "bg-brown",
                  "bg-sage",
                  "bg-blue",
                  "bg-brown",
                  "bg-sage",
                ] as const;
                return (
                  <li key={id} className="flex gap-4">
                    <span className={`${accents[index]} mt-2 size-2 shrink-0 rounded-full`} />
                    <div>
                      <p className="font-medium">{t(`needs.items.${id}.name`)}</p>
                      <p className="mt-1 leading-relaxed text-muted">
                        {t(`needs.items.${id}.blurb`)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
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
