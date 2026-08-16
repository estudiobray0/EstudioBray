import Image from "next/image";

export function WorkShot({
  href,
  image,
  name,
  visit,
  featured = false,
}: {
  href: string;
  image: string;
  name: string;
  visit: string;
  featured?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-line bg-white"
    >
      {featured ? (
        <div className="flex items-center gap-1.5 border-b border-line bg-white px-3 py-2">
          <span className="bg-brown size-2 rounded-full" />
          <span className="bg-sage size-2 rounded-full" />
          <span className="bg-blue size-2 rounded-full" />
        </div>
      ) : null}
      <div className={`relative ${featured ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
        <Image
          src={image}
          alt={name}
          fill
          priority={featured}
          sizes={featured ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 560px, 100vw"}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <span className="absolute inset-0 bg-dark/0 transition-colors duration-300 group-hover:bg-dark/20" />
        <span className="bg-light text-dark absolute right-4 bottom-4 rounded-full px-3 py-1.5 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {visit}
        </span>
      </div>
    </a>
  );
}
