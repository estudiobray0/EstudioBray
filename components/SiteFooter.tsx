import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";

export async function SiteFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-dark">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-white/10 px-5 py-6 text-sm text-[#e8e0d6]/50 sm:flex-row sm:items-center sm:px-6">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#e8e0d6]/80">
          <span className="bg-brown size-1.5 rounded-full" />
          <span className="bg-sage size-1.5 rounded-full" />
          <span className="bg-blue size-1.5 rounded-full" />
          {site.name}
          <span className="text-[#e8e0d6]/50">{t("note")}</span>
        </p>
        <a
          href={`mailto:${site.email}`}
          className="text-[#e8e0d6]/70 transition-colors hover:text-[#e8e0d6]"
        >
          {site.email}
        </a>
      </div>
    </footer>
  );
}
