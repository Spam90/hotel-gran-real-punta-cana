'use client';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons';
import { useBooking } from '@/components/booking/BookingProvider';
import type { BookingPrefill } from '@/types';

interface BookNowButtonProps {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost' | 'whatsapp';
  size?: 'md' | 'lg';
  className?: string;
  label?: string;
  prefill?: BookingPrefill;
}

/** Botón que abre el flujo de reserva desde cualquier sección. */
export function BookNowButton({
  variant = 'primary',
  size = 'md',
  className = '',
  label = 'Reservar ahora',
  prefill,
}: BookNowButtonProps) {
  const { openBooking } = useBooking();
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => openBooking(prefill)}
    >
      <Icon name="calendar" className="text-lg" />
      {label}
    </Button>
  );
}