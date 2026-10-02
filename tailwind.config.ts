import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Paleta: tonos arena, blanco cálido, azul profundo y dorado discreto.
        sand: {
          50: '#FAF6EF',
          100: '#F3EADB',
          200: '#E7D8BF',
          300: '#D8C09B',
          400: '#C4A474',
          500: '#AE8A54',
          600: '#8F6E3F',
          700: '#6F5433',
        },
        ocean: {
          50: '#EAF2F6',
          100: '#CBDDE7',
          200: '#9DBFD1',
          300: '#6A9BB5',
          400: '#3F7593',
          500: '#1E5673',
          600: '#134258',
          700: '#0E3446',
          800: '#0A2735',
          900: '#061B25',
        },
        cream: '#FBF9F5',
        gold: {
          400: '#CBAE73',
          500: '#B9944C',
          600: '#9C7A38',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px -20px rgba(9, 39, 53, 0.35)',
        card: '0 22px 60px -30px rgba(9, 39, 53, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.9s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
