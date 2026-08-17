import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Signature } from "@/components/Signature";

export function AboutCue({
  credit,
  label,
}: {
  credit: string;
  label: string;
}) {
  return (
    <Link href="/about" className="group block w-full max-w-[22.5rem]">
      <span className="text-sage mb-3 block text-sm">{credit}</span>
      <span className="block overflow-hidden rounded-xl border border-line bg-white">
        <span className="flex items-center gap-1.5 border-b border-line bg-white px-3 py-2">
          <span className="bg-brown size-2 rounded-full" />
          <span className="bg-sage size-2 rounded-full" />
          <span className="bg-blue size-2 rounded-full" />
        </span>
        <span className="relative block aspect-[4/5] overflow-hidden">
          <Image
            src="/bray-portrait.png"
            alt={credit}
            fill
            sizes="360px"
            className="object-cover object-[55%_8%] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </span>
      </span>
      <span className="text-brown mt-3 inline-flex items-center gap-1.5 text-sm group-hover:text-ink">
        {label}
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
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
      </span>
      <Signature className="mt-3 w-56" />
    </Link>
  );
}
