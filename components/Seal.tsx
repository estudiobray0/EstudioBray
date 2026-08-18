const holes = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 - Math.PI / 2;
  return {
    cx: 50 + Math.cos(angle) * 46.5,
    cy: 50 + Math.sin(angle) * 46.5,
  };
});

export function Seal({
  className,
  variant = "shot",
}: {
  className?: string;
  variant?: "shot" | "header";
}) {
  return (
    <span className={`seal-stamp seal-${variant} ${className ?? ""}`} aria-hidden>
      <svg className="seal-frame" viewBox="0 0 100 100">
        {holes.map((hole) => (
          <circle
            key={`${hole.cx}-${hole.cy}`}
            cx={hole.cx}
            cy={hole.cy}
            r="1.35"
            fill="currentColor"
          />
        ))}
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.15" />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.65"
          opacity="0.45"
        />
      </svg>
      <span className="seal-mark" />
    </span>
  );
}
