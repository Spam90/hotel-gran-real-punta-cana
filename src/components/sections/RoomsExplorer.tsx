'use client';

import { useMemo, useState } from 'react';
import { RoomCard } from '@/components/sections/RoomCard';
import { Icon } from '@/components/icons';
import { rooms } from '@/data/rooms';

type Category = 'all' | 'sencilla' | 'familiar' | 'vip';
type Beds = 'any' | 'double' | 'single';
type Baths = 'any' | '1' | '2';
type Price = 'any' | '60' | '65';

const selectClass =
  'w-full rounded-lg border border-ocean-200 bg-white px-3 py-2.5 text-sm text-ocean-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40';

export function RoomsExplorer() {
  const [category, setCategory] = useState<Category>('all');
  const [beds, setBeds] = useState<Beds>('any');
  const [baths, setBaths] = useState<Baths>('any');
  const [price, setPrice] = useState<Price>('any');

  const filtered = useMemo(
    () =>
      rooms.filter((room) => {
        if (category !== 'all' && room.id !== category) return false;
        if (beds === 'double' && !room.features.includes('2 camas grandes')) {
          return false;
        }
        if (beds === 'single' && !room.features.includes('1 cama sencilla')) {
          return false;
        }
        if (baths === '1' && !room.features.includes('1 baño privado')) {
          return false;
        }
        if (baths === '2' && !room.features.includes('2 baños privados')) {
          return false;
        }
        // El precio solo filtra categorías con tarifa conocida; las que no
        // tienen tarifa publicada se mantienen visibles ("Consultar tarifa").
        if (price !== 'any' && room.price && room.price.from > Number(price)) {
          return false;
        }
        return true;
      }),
    [category, beds, baths, price],
  );

  const hasFilters =
    category !== 'all' || beds !== 'any' || baths !== 'any' || price !== 'any';

  function clearFilters() {
    setCategory('all');
    setBeds('any');
    setBaths('any');
    setPrice('any');
  }

  return (
    <div>
      <div className="rounded-2xl border border-ocean-100 bg-white p-5 shadow-soft sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ocean-700">Categoría</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={selectClass}
            >
              <option value="all">Todas las categorías</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ocean-700">Camas</span>
            <select
              value={beds}
              onChange={(e) => setBeds(e.target.value as Beds)}
              className={selectClass}
            >
              <option value="any">Cualquiera</option>
              <option value="double">2 camas grandes</option>
              <option value="single">1 cama sencilla</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ocean-700">Baños</span>
            <select
              value={baths}
              onChange={(e) => setBaths(e.target.value as Baths)}
              className={selectClass}
            >
              <option value="any">Cualquiera</option>
              <option value="1">1 baño privado</option>
              <option value="2">2 baños privados</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ocean-700">
              Precio de referencia
            </span>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value as Price)}
              className={selectClass}
            >
              <option value="any">Cualquier precio</option>
              <option value="60">Hasta US$60</option>
              <option value="65">Hasta US$65</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ocean-600" aria-live="polite">
            <strong className="text-ocean-800">{filtered.length}</strong> de{' '}
            {rooms.length} categorías
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-sm font-medium text-ocean-700 underline-offset-4 hover:text-gold-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <Icon name="close" className="text-base" />
              Limpiar filtros
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-ocean-200 bg-white p-10 text-center">
          <p className="font-display text-xl text-ocean-800">
            Ninguna categoría coincide con esos filtros
          </p>
          <p className="mt-2 text-sm text-ocean-600">
            Prueba a quitar algún filtro para ver todas las categorías.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ocean-600 px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-ocean-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}