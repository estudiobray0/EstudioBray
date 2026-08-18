export const site = {
  name: "Estudio Bray",
  email: "estudiobray0@gmail.com",
  github: "estudiobray0",
  whatsapp: (
    process.env.NEXT_PUBLIC_WHATSAPP ?? "18013902506"
  ).replace(/\D/g, ""),
};

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3010";
}

export const featuredWork = {
  id: "vivi",
  name: "VIVI Taller de Arte",
  href: "https://vivitallerdearte.com",
  image: "/works/vivi.jpg",
} as const;

export const moreWorks = [
  {
    id: "ghevans",
    name: "Ghevans Travel Peru",
    href: "https://ghevanstravelperu.com",
    image: "/works/ghevans.jpg",
  },
  {
    id: "bolivia",
    name: "Conexión Bolivia Visas",
    href: "https://visasboliviaconexion.com",
    image: "/works/bolivia.jpg",
  },
] as const;

export const works = [featuredWork, ...moreWorks];

export const capabilityIds = [
  "whatsapp",
  "idiomas",
  "editor",
  "catalogo",
  "pagina",
  "dominio",
] as const;
export const trustIds = ["speed", "fit", "personal"] as const;
export const needIds = ["photos", "story", "palette", "references", "gmail"] as const;
export const stepIds = ["1", "2", "3", "4"] as const;

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
