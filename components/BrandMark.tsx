export function BrandMark({ size = "sm" }: { size?: "sm" | "lg" }) {
  const box = size === "lg" ? "size-10 rounded-lg sm:size-14" : "size-2.5 rounded-sm";
  const gap = size === "lg" ? "gap-2.5" : "gap-1.5";

  return (
    <span className={`group/mark flex items-center ${gap}`} aria-hidden>
      <span className={`bg-brown ${box} transition-transform duration-300 group-hover/mark:-translate-y-0.5`} />
      <span className={`bg-sage ${box} transition-transform duration-300 delay-75 group-hover/mark:-translate-y-0.5`} />
      <span className={`bg-blue ${box} transition-transform duration-300 delay-150 group-hover/mark:-translate-y-0.5`} />
    </span>
  );
}
