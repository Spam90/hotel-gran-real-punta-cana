'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { BookingModal } from '@/components/booking/BookingModal';
import type { BookingPrefill } from '@/types';

interface BookingContextValue {
  /** Abre el flujo de reserva, opcionalmente con datos prellenados. */
  openBooking: (prefill?: BookingPrefill) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking debe usarse dentro de <BookingProvider>');
  }
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill | undefined>(undefined);

  const openBooking = useCallback((data?: BookingPrefill) => {
    setPrefill(data);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal
        open={open}
        prefill={prefill}
        onClose={() => setOpen(false)}
      />
    </BookingContext.Provider>
  );
}