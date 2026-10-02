import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cream">
      <div className="container text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
          Error 404
        </p>
        <h1 className="mt-3 font-display text-4xl text-ocean-800">
          Página no encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ocean-600/90">
          La página que buscas no existe o ha cambiado de dirección.
        </p>
        <Button href="/" variant="primary" size="lg" className="mt-8">
          Volver al inicio
        </Button>
      </div>
    </section>
  );
}
