"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitch() {
  const locale = useLocale();
  const t = useTranslations("language");
  const pathname = usePathname();
  const otherLocale = locale === "es" ? "en" : "es";

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-blue"
      aria-label={t("switch")}
      title={t("switch")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18" />
        <path d="M12 3a14 14 0 0 0 0 18" />
      </svg>
      <span>{t("label")}</span>
    </Link>
  );
}
