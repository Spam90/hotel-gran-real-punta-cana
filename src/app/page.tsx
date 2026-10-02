import { Hero } from '@/components/sections/Hero';
import { StaySearch } from '@/components/sections/StaySearch';
import { IntroSection } from '@/components/sections/IntroSection';
import { RoomsSection } from '@/components/sections/RoomsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PracticalInfoSection } from '@/components/sections/PracticalInfoSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { LocationSection } from '@/components/sections/LocationSection';
import { CtaBand } from '@/components/sections/CtaBand';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StaySearch />
      <IntroSection />
      <RoomsSection />
      <ServicesSection />
      <PracticalInfoSection />
      <GallerySection />
      <LocationSection />
      <CtaBand />
      <ContactSection />
    </>
  );
}
