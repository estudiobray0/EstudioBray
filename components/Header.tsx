import { getLocale, getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/BrandMark";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const tw = await getTranslations("hero");
  const home = locale === "en" ? "/en" : "";

  const sections = [
    { href: `${home}/#trabajos`, label: t("work") },
    { href: `${home}/#servicios`, label: t("services") },
    { href: `${home}/#proceso`, label: t("process") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="group/mark flex items-center gap-3 text-[15px] font-medium">
          <BrandMark />
          {site.name}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          {sections.map((item) => (
            <a key={item.href} href={item.href} className="nav-link text-muted hover:text-ink">
              {item.label}
            </a>
          ))}
          <Link href="/about" className="nav-link text-muted hover:text-ink">
            {t("about")}
          </Link>
          <a href={`${home}/#contacto`} className="nav-link text-muted hover:text-ink">
            {t("contact")}
          </a>
          <LanguageSwitch />
          <WhatsAppLink className="btn-primary rounded-full px-3.5 py-1.5" text={tw("whatsapp")}>
            WhatsApp
          </WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}
