import type { MouseEvent, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'whatsapp';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold-400 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-ocean-600 text-cream hover:bg-ocean-700 shadow-soft hover:shadow-card',
  secondary:
    'bg-cream/95 text-ocean-700 hover:bg-white border border-ocean-100 hover:border-ocean-200',
  ghost:
    'bg-transparent text-ocean-700 hover:bg-ocean-50 border border-ocean-200/70',
  gold: 'bg-gold-500 text-ocean-900 hover:bg-gold-400 shadow-soft hover:shadow-card',
  whatsapp:
    'bg-[#1f9d55] text-white hover:bg-[#178a49] shadow-soft hover:shadow-card',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Si se define, el componente se renderiza como enlace. */
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  'aria-label'?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  href,
  target,
  rel,
  type = 'button',
  disabled,
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href !== undefined) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
