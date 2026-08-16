import { whatsappHref } from "@/lib/site";

export function WhatsAppLink({
  children,
  className,
  text,
}: {
  children: React.ReactNode;
  className?: string;
  text?: string;
}) {
  return (
    <a href={whatsappHref(text)} className={className}>
      {children}
    </a>
  );
}
