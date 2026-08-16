import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-dark">
      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-white/10 px-6 py-6 text-sm text-[#e8e0d6]/50">
        <p className="flex items-center gap-2 text-[#e8e0d6]/80">
          <span className="bg-brown size-1.5 rounded-full" />
          <span className="bg-sage size-1.5 rounded-full" />
          <span className="bg-blue size-1.5 rounded-full" />
          {site.name}
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
