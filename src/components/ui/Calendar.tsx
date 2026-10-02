'use client';

import { useState } from 'react';
import { Icon } from '@/components/icons';
import {
  MONTHS,
  WEEKDAYS,
  monthGrid,
  yearMonthOf,
} from '@/lib/calendar';
import { todayISO } from '@/lib/dates';

interface CalendarProps {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
  /** Marca días no seleccionables (p. ej. no disponibles). */
  isDayDisabled?: (iso: string) => boolean;
  /** Meses visibles por delante desde hoy. */
  monthsAhead?: number;
}

const btn =
  'flex h-9 w-9 items-center justify-center rounded-full text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400';

export function Calendar({
  checkIn,
  checkOut,
  onChange,
  isDayDisabled,
  monthsAhead = 14,
}: CalendarProps) {
  const today = todayISO();
  const initial = yearMonthOf(checkIn || today);
  const [view, setView] = useState(initial);

  const cells = monthGrid(view.year, view.month);
  const viewIso = `${view.year}-${String(view.month + 1).padStart(2, '0')}`;

  const limit = (() => {
    const d = new Date(today);
    d.setMonth(d.getMonth() + monthsAhead);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  })();
  const canPrev = viewIso > today.slice(0, 7);
  const canNext = viewIso < limit;

  function move(delta: number) {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  function select(iso: string) {
    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, '');
      return;
    }
    if (iso > checkIn) {
      onChange(checkIn, iso);
      return;
    }
    onChange(iso, '');
  }

  return (
    <div className="rounded-xl border border-ocean-100 bg-white p-3">
      <div className="mb-2 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={!canPrev}
          aria-label="Mes anterior"
          className={`${btn} text-ocean-700 hover:bg-ocean-50 disabled:opacity-30`}
        >
          <Icon name="chevronDown" className="rotate-90 text-lg" />
        </button>
        <p className="font-medium capitalize text-ocean-800">
          {MONTHS[view.month]} <span className="text-ocean-500">{view.year}</span>
        </p>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={!canNext}
          aria-label="Mes siguiente"
          className={`${btn} text-ocean-700 hover:bg-ocean-50 disabled:opacity-30`}
        >
          <Icon name="chevronDown" className="-rotate-90 text-lg" />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((wd) => (
          <span key={wd} className="py-1 text-[0.65rem] text-ocean-400">
            {wd}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1" role="grid">
        {cells.map((iso, i) => {
          if (!iso) return <span key={`e${i}`} className="h-9" />;

          const disabled =
            iso < today || (isDayDisabled ? isDayDisabled(iso) : false);
          const isStart = iso === checkIn;
          const isEnd = checkOut && iso === checkOut;
          const inRange = checkIn && checkOut && iso > checkIn && iso < checkOut;

          let cls = btn;
          if (isStart || isEnd) {
            cls += ' bg-ocean-600 text-cream font-semibold';
          } else if (inRange) {
            cls += ' bg-ocean-50 text-ocean-700';
          } else {
            cls += ' text-ocean-700 hover:bg-gold-400/30';
          }
          if (disabled) {
            cls = `${btn} cursor-not-allowed text-ocean-300 line-through`;
          }

          return (
            <button
              key={iso}
              type="button"
              onClick={() => select(iso)}
              disabled={disabled}
              aria-label={iso}
              aria-pressed={isStart || Boolean(isEnd)}
              className={cls}
            >
              {Number(iso.slice(8, 10))}
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-between px-1 text-[0.7rem] text-ocean-500">
        <span>Haz clic para elegir la entrada y la salida</span>
        {checkIn || checkOut ? (
          <button
            type="button"
            onClick={() => onChange('', '')}
            className="underline underline-offset-2 hover:text-gold-600"
          >
            Limpiar
          </button>
        ) : null}
      </div>
    </div>
  );
}