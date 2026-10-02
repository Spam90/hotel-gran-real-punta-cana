'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons';

const links = [
  { href: '#habitaciones', label: 'Habitaciones' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#galeria', label: 'Galería' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#contacto', label: 'Contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-cream/95 shadow-soft backdrop-blur-md'
          : 'bg-gradient-to-b from-ocean-900/65 to-transparent'
      }`}
    >
      <nav
        className="container flex items-center justify-between gap-4 py-3.5"
        aria-label="Navegación principal"
      >
        <a
          href="#inicio"
          className="flex flex-col leading-none"
          aria-label="Ir al inicio"
        >
          <span
            className={`font-display text-xl tracking-wide transition-colors ${
              solid ? 'text-ocean-800' : 'text-cream'
            }`}
          >
            Gran Real
          </span>
          <span
            className={`text-[0.62rem] uppercase tracking-[0.32em] transition-colors ${
              solid ? 'text-gold-600' : 'text-gold-300'
            }`}
          >
            Punta Cana
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-4 ${
                  solid
                    ? 'text-ocean-700 hover:text-gold-600'
                    : 'text-cream/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#disponibilidad" variant={solid ? 'primary' : 'gold'} size="md">
            Consultar disponibilidad
          </Button>
        </div>

        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-md p-2 lg:hidden ${
            solid ? 'text-ocean-700' : 'text-cream'
          }`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} className="text-2xl" />
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-ocean-100 bg-cream lg:hidden"
        >
          <ul className="container flex flex-col py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ocean-50 py-3 text-base text-ocean-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <Button
                href="#disponibilidad"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Consultar disponibilidad
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
