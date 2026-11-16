/**
 * Black ink line illustrations (generated for Pavani IT). Each ships as WebP at
 * several widths so phones and laptops download only what they display; see
 * public/illustrations/README.md.
 */

export type ArtName = "hero" | "hire" | "employ" | "pay" | "grow";

const ART: Record<ArtName, { alt: string; w: number; h: number; widths: number[] }> = {
  hero: {
    alt: "Illustration: two colleagues at a laptop in an office, a clock on the wall behind them",
    w: 1536,
    h: 1024,
    widths: [768, 960, 1200, 1536],
  },
  hire: {
    alt: "Illustration: a candidate in India waving to a hiring manager on a video call",
    w: 1200,
    h: 900,
    widths: [600, 900, 1200],
  },
  employ: {
    alt: "Illustration: a new employee signing an employment contract beside a rubber stamp and an ID card",
    w: 1200,
    h: 900,
    widths: [600, 900, 1200],
  },
  pay: {
    alt: "Illustration: a payslip printing beside a desk calendar with dates circled",
    w: 1200,
    h: 900,
    widths: [600, 900, 1200],
  },
  grow: {
    alt: "Illustration: an instructor at a whiteboard training three graduates at laptops",
    w: 1200,
    h: 900,
    widths: [600, 900, 1200],
  },
};

export default function Art({
  name,
  sizes = "(max-width: 620px) 100vw, (max-width: 1100px) 50vw, 300px",
  priority = false,
  className,
  decorative = false,
}: {
  name: ArtName;
  sizes?: string;
  priority?: boolean;
  className?: string;
  decorative?: boolean;
}) {
  const a = ART[name];
  const large = a.widths[a.widths.length - 1];
  return (
    <img
      className={className}
      src={`/illustrations/${name}-${large}.webp`}
      srcSet={a.widths.map((w) => `/illustrations/${name}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      width={a.w}
      height={a.h}
      alt={decorative ? "" : a.alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
