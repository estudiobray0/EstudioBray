import Image from "next/image";

export function Signature({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <Image
      src="/bray-signature.png"
      alt=""
      width={909}
      height={444}
      className={`h-auto ${invert ? "brightness-0 invert" : ""} ${className ?? ""}`}
    />
  );
}
