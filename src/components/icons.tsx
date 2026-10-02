import type { ReactNode, SVGProps } from 'react';

export type IconName =
  | 'pool'
  | 'spa'
  | 'restaurant'
  | 'bar'
  | 'events'
  | 'roomService'
  | 'reception'
  | 'parking'
  | 'accessible'
  | 'wifi'
  | 'phone'
  | 'whatsapp'
  | 'location'
  | 'calendar'
  | 'users'
  | 'bed'
  | 'bath'
  | 'tv'
  | 'ac'
  | 'fridge'
  | 'safe'
  | 'iron'
  | 'closet'
  | 'arrowRight'
  | 'close'
  | 'chevronDown'
  | 'menu'
  | 'clock'
  | 'check'
  | 'compass'
  | 'sparkle';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const paths: Record<IconName, ReactNode> = {
  pool: (
    <>
      <path {...stroke} d="M3 20c1.8 0 2.7-1.2 4.5-1.2S10.2 20 12 20s2.7-1.2 4.5-1.2S19.2 20 21 20" />
      <path {...stroke} d="M3 16c1.8 0 2.7-1.2 4.5-1.2S10.2 16 12 16s2.7-1.2 4.5-1.2S19.2 16 21 16" />
      <path {...stroke} d="M8 12V5a2 2 0 0 1 4 0v7M12 8h2" />
    </>
  ),
  spa: (
    <>
      <path {...stroke} d="M12 21c4-2 7-5.5 7-10 0-3.5-2.5-6-5-6.5.5 3-1 6.5-2 8.5" />
      <path {...stroke} d="M12 21c-4-2-7-5.5-7-10 0-3.5 2.5-6 5-6.5-.5 3 1 6.5 2 8.5" />
      <path {...stroke} d="M12 21v-8" />
    </>
  ),
  restaurant: (
    <>
      <path {...stroke} d="M7 3v8a2 2 0 0 0 4 0V3M9 11v10" />
      <path {...stroke} d="M17 3c-1.5 0-2.5 1.5-2.5 4S15.5 11 17 11v10" />
      <path {...stroke} d="M17 3v8" />
    </>
  ),
  bar: (
    <>
      <path {...stroke} d="M5 4h14l-7 7z" />
      <path {...stroke} d="M12 11v7" />
      <path {...stroke} d="M8 21h8M10 18h4" />
    </>
  ),
  events: (
    <>
      <rect {...stroke} x="3" y="5" width="18" height="16" rx="2" />
      <path {...stroke} d="M3 10h18M8 3v4M16 3v4M8 15h3" />
    </>
  ),
  roomService: (
    <>
      <path {...stroke} d="M3 18h18" />
      <path {...stroke} d="M5 18a7 7 0 0 1 14 0" />
      <path {...stroke} d="M12 11V9a1.5 1.5 0 0 1 3 0" />
    </>
  ),
  reception: (
    <>
      <path {...stroke} d="M3 18h18" />
      <path {...stroke} d="M4 18v-3a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3" />
      <circle {...stroke} cx="9" cy="4.5" r="1.5" />
      <path {...stroke} d="M9 11V8" />
    </>
  ),
  parking: (
    <>
      <rect {...stroke} x="4" y="4" width="16" height="16" rx="3" />
      <path {...stroke} d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" />
    </>
  ),
  accessible: (
    <>
      <circle {...stroke} cx="12" cy="4.5" r="1.5" />
      <path {...stroke} d="M11 8v5h5l2 7" />
      <path {...stroke} d="M11 13a5 5 0 1 0 4 8" />
    </>
  ),
  wifi: (
    <>
      <path {...stroke} d="M4 9a12 12 0 0 1 16 0" />
      <path {...stroke} d="M7 12.5a8 8 0 0 1 10 0" />
      <path {...stroke} d="M10 16a4 4 0 0 1 4 0" />
      <path {...stroke} d="M12 19.5h.01" />
    </>
  ),
  phone: (
    <path
      {...stroke}
      d="M5 4h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z"
    />
  ),
  whatsapp: (
    <>
      <path {...stroke} d="M4 20l1.3-4A8 8 0 1 1 8 18.4z" />
      <path
        {...stroke}
        d="M9 8.5c.3 2.5 2 4.2 4.5 4.5.6 0 1.2-.6 1.2-1.2l-1.4-.8-1 .8a4 4 0 0 1-1.7-1.7l.8-1-.8-1.4c-.7 0-1.3.6-1.3 1.2z"
      />
    </>
  ),
  location: (
    <>
      <path {...stroke} d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11z" />
      <circle {...stroke} cx="12" cy="10" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect {...stroke} x="3" y="5" width="18" height="16" rx="2" />
      <path {...stroke} d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  users: (
    <>
      <circle {...stroke} cx="9" cy="8" r="3" />
      <path {...stroke} d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path {...stroke} d="M16 5.5a3 3 0 0 1 0 5.6M16.5 20a5.5 5.5 0 0 0-2.2-4.4" />
    </>
  ),
  bed: (
    <>
      <path {...stroke} d="M3 18v-8a2 2 0 0 1 2-2h9a4 4 0 0 1 4 4v6" />
      <path {...stroke} d="M3 13h16M3 18h18" />
      <circle {...stroke} cx="7" cy="10" r="1.5" />
    </>
  ),
  bath: (
    <>
      <path {...stroke} d="M4 12h16v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path {...stroke} d="M6 12V6a2 2 0 0 1 4 0" />
      <path {...stroke} d="M7 21l-1 1M17 21l1 1" />
    </>
  ),
  tv: (
    <>
      <rect {...stroke} x="3" y="6" width="18" height="12" rx="2" />
      <path {...stroke} d="M8 21h8" />
    </>
  ),
  ac: (
    <>
      <rect {...stroke} x="3" y="4" width="18" height="8" rx="2" />
      <path {...stroke} d="M6 8h12" />
      <path {...stroke} d="M12 14v6M9 17l3 3 3-3" />
    </>
  ),
  fridge: (
    <>
      <rect {...stroke} x="6" y="3" width="12" height="18" rx="2" />
      <path {...stroke} d="M6 10h12M9 6.5v2M9 13v3" />
    </>
  ),
  safe: (
    <>
      <rect {...stroke} x="3" y="5" width="18" height="14" rx="2" />
      <circle {...stroke} cx="12" cy="12" r="3" />
      <path {...stroke} d="M12 9v1.5M12 13.5V15M9 12h1.5M13.5 12H15" />
    </>
  ),
  iron: (
    <>
      <path {...stroke} d="M5 16h14v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
      <path {...stroke} d="M3 16c0-4 4-6 9-6h6a3 3 0 0 1 3 3" />
      <path {...stroke} d="M13 8l2-3" />
    </>
  ),
  closet: (
    <>
      <rect {...stroke} x="5" y="3" width="14" height="18" rx="1.5" />
      <path {...stroke} d="M12 3v18M10 11h.01M14 11h.01" />
    </>
  ),
  arrowRight: <path {...stroke} d="M5 12h14M13 6l6 6-6 6" />,
  close: <path {...stroke} d="M6 6l12 12M18 6L6 18" />,
  chevronDown: <path {...stroke} d="M6 9l6 6 6-6" />,
  menu: <path {...stroke} d="M4 7h16M4 12h16M4 17h16" />,
  clock: (
    <>
      <circle {...stroke} cx="12" cy="12" r="8.5" />
      <path {...stroke} d="M12 7.5V12l3 2" />
    </>
  ),
  check: <path {...stroke} d="M5 12.5l4.5 4.5L19 7" />,
  compass: (
    <>
      <circle {...stroke} cx="12" cy="12" r="8.5" />
      <path {...stroke} d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  sparkle: (
    <path
      {...stroke}
      d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"
    />
  ),
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
