import type { stepIds } from "@/lib/site";

type StepId = (typeof stepIds)[number];

export function ProcessStepIcon({ id }: { id: StepId }) {
  const common = {
    viewBox: "0 0 16 16",
    "aria-hidden": true as const,
    className: "size-4 shrink-0",
  };

  if (id === "1") {
    return (
      <svg {...common}>
        <path
          d="M3 3.5h10v7.5H6.5L3 13.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "2") {
    return (
      <svg {...common}>
        <path
          d="M5 2.5h5l3 3V13.5H5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M10 2.5v3h3M7 8.5h5M7 11h3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === "3") {
    return (
      <svg {...common}>
        <path
          d="M1.5 8s2.2-4 6.5-4 6.5 4 6.5 4-2.2 4-6.5 4-6.5-4-6.5-4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle
          cx="8"
          cy="8"
          r="1.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle
        cx="8"
        cy="8"
        r="5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 2.5c-1.6 1.6-2.4 3.4-2.4 5.5S6.4 11.9 8 13.5M8 2.5c1.6 1.6 2.4 3.4 2.4 5.5S9.6 11.9 8 13.5M2.5 8h11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
