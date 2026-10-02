import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingProvider } from '@/components/booking/BookingProvider';

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hotel Gran Real Punta Cana | Alojamiento en Bávaro, Punta Cana',
  description:
    'Demo conceptual del Hotel Gran Real Punta Cana, un hotel de 4 estrellas en Bávaro, Punta Cana. Consulta habitaciones, servicios y ubicación.',
  keywords: [
    'Hotel Gran Real Punta Cana',
    'hotel en Bávaro',
    'alojamiento Punta Cana',
    'hotel 4 estrellas Punta Cana',
  ],
  openGraph: {
    title: 'Hotel Gran Real Punta Cana',
    description:
      'Tu próxima estancia en Punta Cana. Habitaciones, servicios y ubicación en Bávaro.',
    type: 'website',
    locale: 'es_DO',
    siteName: 'Hotel Gran Real Punta Cana',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <BookingProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
