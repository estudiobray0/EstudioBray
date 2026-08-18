import { getLocale, getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/BrandMark";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Seal } from "@/components/Seal";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const tw = await getTranslations("hero");
  const home = locale === "en" ? "/en" : "";

  const sections = [
    { href: `${home}/#proceso`, label: t("process") },
    { href: `${home}/#trabajos`, label: t("work") },
    { href: `${home}/#servicios`, label: t("services") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 lg:flex-wrap lg:px-6 lg:py-4">
        <Link
          href="/"
          className="group/mark flex shrink-0 items-center gap-2 text-[15px] font-medium lg:gap-2.5"
        >
          <BrandMark />
          {site.name}
          <Seal variant="header" />
        </Link>
        <nav className="flex shrink-0 items-center gap-x-3 text-sm lg:flex-wrap lg:gap-x-6 lg:gap-y-1">
          {sections.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link hidden text-muted hover:text-ink lg:inline"
            >
              {item.label}
            </a>
          ))}
          <Link href="/about" className="nav-link hidden text-muted hover:text-ink lg:inline">
            {t("about")}
          </Link>
          <a
            href={`${home}/#contacto`}
            className="nav-link hidden text-muted hover:text-ink lg:inline"
          >
            {t("contact")}
          </a>
          <LanguageSwitch />
          <WhatsAppLink
            className="btn-primary rounded-full px-3 py-2 lg:px-3.5 lg:py-1.5"
            text={tw("whatsapp")}
          >
            WhatsApp
          </WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}
