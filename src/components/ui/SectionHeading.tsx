import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Tema claro (por defecto) u oscuro para fondos azul profundo. */
  tone?: 'dark' | 'light';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <div
      className={`${isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${
            tone === 'dark' ? 'text-gold-600' : 'text-gold-400'
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-3xl leading-tight sm:text-4xl ${
          tone === 'dark' ? 'text-ocean-800' : 'text-cream'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed ${
            tone === 'dark' ? 'text-ocean-600/90' : 'text-cream/80'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
