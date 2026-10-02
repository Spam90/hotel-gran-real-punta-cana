# Hotel Gran Real Punta Cana — Demo web

Demo conceptual de sitio web (landing page) para el **Hotel Gran Real Punta
Cana** (Bávaro, Punta Cana, República Dominicana), pensada como propuesta de
mejora de presencia digital.

> ⚠️ **Demo conceptual.** No comprueba inventario ni realiza reservas reales.
> La disponibilidad, las tarifas, el teléfono, la ubicación y el resto de datos
> recopilados deben ser **confirmados por el hotel** antes de cualquier uso
> comercial. Las fotografías son **provisionales** (ver
> `public/images/CREDITS.txt`).

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 3**
- Componentes de servidor por defecto; componentes de cliente solo donde hay
  interacción (buscador, menú móvil, modales, galería y formulario).

## Requisitos

- Node.js 18.18+ (probado con Node 20).

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Scripts

| Comando             | Descripción                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Servidor de desarrollo               |
| `npm run build`     | Compilación de producción            |
| `npm run start`     | Servidor de producción (tras build)  |
| `npm run lint`      | ESLint                               |
| `npm run typecheck` | Comprobación de tipos (tsc --noEmit) |

## Estructura

```
src/
  app/                 layout, página principal y estilos globales
  components/
    layout/            Navbar (menú móvil) y Footer
    booking/           BookingProvider + BookingModal (flujo por pasos) + BookNowButton
    sections/          Hero, buscador (con resultados), RoomsExplorer (filtros),
                       RoomCard, servicios, galería, ubicación…
    ui/                Button, Modal, SectionHeading, RoomPhotoCarousel
    icons.tsx          Iconos SVG (sin emojis)
  data/                Contenido separado de la vista (hotel, rooms, services, gallery)
  lib/                 utilidades (fechas, WhatsApp)
  types/               tipos TypeScript
public/images/         fotografías provisionales + CREDITS.txt
```

## Qué es real y qué es simulación

- **Real:** navegación y menú móvil; **filtro de habitaciones funcional**
  (categoría, camas, baños y precio de referencia) que filtra la cuadrícula en
  vivo con contador y estado vacío; **buscador que genera un panel de
  resultados** con noches, categorías y estimado de precio; **flujo de reserva
  por pasos** (fechas/huéspedes → habitación → datos → confirmación con
  referencia) con validaciones; **carrusel de fotos** por habitación con
  miniaturas; modales accesibles (focus trap, Escape) y visor de galería.
- **Simulación/consulta:** no hay backend. El buscador y el flujo de reserva
  **no** comprueban inventario ni registran reservas: calculan un estimado a
  partir de datos de referencia y preparan un mensaje para enviar por **WhatsApp**
  al hotel. La confirmación final la da el hotel.
