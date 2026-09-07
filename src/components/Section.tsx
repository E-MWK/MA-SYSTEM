import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-6 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
      <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground">
        {kicker}
      </span>
      <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </Reveal>
  );
}
