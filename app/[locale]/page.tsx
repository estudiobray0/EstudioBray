import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WorkShot } from "@/components/WorkShot";
import { AboutCue } from "@/components/AboutCue";
import { ProcessStepIcon } from "@/components/ProcessStepIcon";
import { featuredWork, moreWorks, needIds, capabilityIds, site, stepIds, trustIds } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1">
        <section id="inicio" className="mx-auto max-w-6xl px-6 pt-8 pb-16 sm:pt-12 sm:pb-20">
          <div className="grid items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="order-2 flex flex-col lg:order-1 lg:min-h-full">
              <p className="reveal text-sage mb-3 text-sm">{t("hero.kicker")}</p>
              <h1 className="reveal max-w-xl text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
                {t("hero.title")}
              </h1>
              <p className="reveal reveal-delay-1 mt-5 max-w-md text-lg leading-relaxed text-muted">
                {t("hero.body")}
              </p>
              <p className="reveal reveal-delay-1 mt-3 max-w-md leading-relaxed text-muted">
                {t("hero.together")}
              </p>
              <div className="reveal reveal-delay-2 mt-8 flex flex-wrap items-center gap-4">
                <WhatsAppLink
                  className="btn-primary rounded-full px-5 py-2.5 text-sm"
                  text={t("hero.whatsapp")}
                >
                  {t("hero.cta")}
                </WhatsAppLink>
                <a href="#proceso" className="text-blue text-sm hover:text-ink">
                  {t("hero.seeWork")}
                </a>
              </div>
              <div className="reveal reveal-delay-3 mt-12 lg:mt-auto lg:pt-10">
                <AboutCue credit={t("hero.createdBy")} label={t("nav.about")} />
              </div>
            </div>

            <div id="vivi" className="reveal reveal-delay-1 order-1 scroll-mt-24 lg:order-2">
              <p className="text-sage mb-3 text-sm">{t("work.featured")}</p>
              <WorkShot
                href={featuredWork.href}
                image={featuredWork.image}
                name={featuredWork.name}
                visit={t("work.visit")}
                featured
              />
              <div className="mt-5">
                <h2 className="text-xl font-medium">{featuredWork.name}</h2>
                <p className="text-brown mt-1 text-sm">
                  {t(`work.items.${featuredWork.id}.place`)}
                </p>
                <p className="mt-2 leading-relaxed text-muted">
                  {t(`work.items.${featuredWork.id}.summary`)}
                </p>
                <a
                  href={featuredWork.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full bg-dark px-4 py-2 text-sm text-light transition-colors hover:bg-brown"
                >
                  {t("work.visit")}
                </a>
                <a
                  href={featuredWork.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue mt-2 block break-all text-sm underline decoration-[#7a9db9]/35 underline-offset-4 hover:text-ink"
                >
                  {featuredWork.href}
                </a>
              </div>
            </div>
          </div>

          <ul className="reveal reveal-delay-3 mt-14 grid gap-8 border-t border-line/70 pt-10 sm:grid-cols-3">
            {trustIds.map((id, index) => {
              const accents = ["text-sage", "text-brown", "text-blue"] as const;
              return (
                <li key={id}>
                  <p className={`${accents[index]} text-lg font-medium`}>
                    {t(`trust.items.${id}.name`)}
                  </p>
                  <p className="mt-2 leading-relaxed text-muted">
                    {t(`trust.items.${id}.blurb`)}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="proceso" className="scroll-mt-24 border-t border-line/70">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="flex items-baseline gap-3">
              <span className="text-sage text-sm">01</span>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("process.title")}
              </h2>
            </div>
            <ol className="mt-10 flex items-start overflow-x-auto pb-1">
              {stepIds.map((id, index) => {
                const tones = [
                  "text-brown",
                  "text-sage",
                  "text-blue",
                  "text-brown",
                ] as const;
                return (
                  <li
                    key={id}
                    className="flex min-w-[10.5rem] items-start sm:min-w-0 sm:flex-1"
                  >
                    <div className="min-w-0 flex-1">
                      <div className={`flex items-center gap-2 ${tones[index]}`}>
                        <ProcessStepIcon id={id} />
                        <h3 className="text-base font-medium text-ink sm:text-lg">
                          {t(`process.steps.${id}.title`)}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-muted">
                        {t(`process.steps.${id}.body`)}
                      </p>
                    </div>
                    {index < stepIds.length - 1 ? (
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden
                        className="text-brown mt-1 mx-2.5 size-3.5 shrink-0 sm:mx-3"
                      >
                        <path
                          d="M3 8h9M8 4l5 4-5 4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section id="trabajos" className="border-t border-line/70">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="flex items-baseline gap-3">
              <span className="text-sage text-sm">02</span>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("work.more")}
              </h2>
            </div>
            <p className="mt-3 max-w-md text-muted">{t("work.intro")}</p>
            <ul className="mt-10 grid gap-10 sm:grid-cols-2">
              {moreWorks.map((work, index) => {
                const placeTone = index === 0 ? "text-sage" : "text-blue";
                return (
                <li key={work.id}>
                  <Reveal delay={index * 80}>
                    <WorkShot
                      href={work.href}
                      image={work.image}
                      name={work.name}
                      visit={t("work.visit")}
                    />
                    <div className="mt-4">
                      <h3 className="text-lg font-medium">{work.name}</h3>
                      <p className={`${placeTone} mt-1 text-sm`}>
                        {t(`work.items.${work.id}.place`)}
                      </p>
                      <p className="mt-2 leading-relaxed text-muted">
                        {t(`work.items.${work.id}.summary`)}
                      </p>
                      <a
                        href={work.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex rounded-full bg-dark px-4 py-2 text-sm text-light transition-colors hover:bg-brown"
                      >
                        {t("work.visit")}
                      </a>
                      <a
                        href={work.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue mt-2 block break-all text-sm underline decoration-[#7a9db9]/35 underline-offset-4 hover:text-ink"
                      >
                        {work.href}
                      </a>
                    </div>
                  </Reveal>
                </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="servicios" className="border-t border-line/70">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="flex items-baseline gap-3">
              <span className="text-blue text-sm">03</span>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("services.title")}
              </h2>
            </div>
            <p className="mt-3 max-w-lg text-muted">{t("services.intro")}</p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {capabilityIds.map((id, index) => {
                const accents = [
                  "bg-sage",
                  "bg-blue",
                  "bg-brown",
                  "bg-sage",
                  "bg-blue",
                  "bg-brown",
                ] as const;
                return (
                  <li key={id} className="flex gap-3">
                    <span className={`${accents[index]} mt-2 size-2 shrink-0 rounded-full`} />
                    <div>
                      <p className="font-medium">{t(`services.items.${id}.name`)}</p>
                      <p className="mt-1 leading-relaxed text-muted">
                        {t(`services.items.${id}.blurb`)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-14 border-t border-line/70 pt-10">
              <h3 className="text-lg font-medium">{t("about.needs.heading")}</h3>
              <p className="mt-2 max-w-xl text-muted">{t("about.needs.intro")}</p>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                {needIds.map((id, index) => {
                  const accents = [
                    "bg-brown",
                    "bg-sage",
                    "bg-blue",
                    "bg-brown",
                    "bg-sage",
                  ] as const;
                  return (
                    <li key={id} className="flex gap-3">
                      <span className={`${accents[index]} mt-2 size-2 shrink-0 rounded-full`} />
                      <div>
                        <p className="font-medium">{t(`about.needs.items.${id}.name`)}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {t(`about.needs.items.${id}.blurb`)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-dark text-light">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <p className="text-blue text-sm">04</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("contact.title")}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[#e8e0d6]/75">
              {t("contact.body")}
            </p>
            <WhatsAppLink
              className="btn-primary mt-8 inline-flex rounded-full px-5 py-2.5 text-sm"
              text={t("contact.whatsapp")}
            >
              {t("contact.cta")}
            </WhatsAppLink>
            <p className="mt-5 text-sm text-[#e8e0d6]/60">
              <a href={`mailto:${site.email}`} className="hover:text-[#e8e0d6]">
                {site.email}
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
