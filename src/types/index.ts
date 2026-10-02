export type RoomCategoryId = 'standard' | 'deluxe' | 'double' | 'suite';

/**
 * Rango de precio recopilado. `isReference` indica que es una tarifa
 * orientativa pendiente de confirmación por el hotel (no una oferta garantizada).
 */
export interface PriceReference {
  from: number;
  to: number;
  currency: 'USD';
  /** true => se presenta como "tarifa de referencia"; false/ausente => "consultar tarifa". */
  isReference: boolean;
}

export interface Room {
  id: RoomCategoryId;
  name: string;
  tagline: string;
  description: string;
  /** Nº de habitaciones de esta categoría (dato recopilado, no disponibilidad actual). */
  units: number | null;
  features: string[];
  /** Puede ser null cuando no se dispone de tarifa (familiar y VIP). */
  price: PriceReference | null;
  image: string;
  imageAlt: string;
}

export type ServiceIconId =
  | 'pool'
  | 'reception'
  | 'parking'
  | 'accessible'
  | 'wifi'
  | 'ac'
  | 'cleaning'
  | 'nonsmoking'
  | 'breakfast';

export interface Service {
  id: ServiceIconId;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  /** Etiqueta provisional de la imagen (fotografía de stock, no oficial). */
  placeholder: boolean;
}

export interface Attraction {
  name: string;
  /** Distancia o tiempo aproximados, pendientes de verificación. */
  distance: string;
}

export interface ContactDetails {
  /** Número mostrado en la interfaz. */
  phoneDisplay: string;
  /** Enlace tel: en formato internacional normalizado. */
  phoneTel: string;
  /**
   * Número internacional normalizado usado para los enlaces de WhatsApp.
   * Se asume que puede cambiar cuando el hotel confirme su contacto.
   */
  whatsappNumber: string;
  addressLine: string;
  city: string;
  region: string;
  country: string;
  /** URL de Google Maps para localizar la dirección (sin coordenadas inventadas). */
  mapsUrl: string;
}

export interface PracticalInfoItem {
  id: string;
  label: string;
  value: string;
}

/** Datos de una consulta de estancia (buscador y formulario de contacto). */
export interface StayQuery {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType?: RoomCategoryId | '';
}

/** Datos que pueden prellenar el flujo de reserva desde otras secciones. */
export interface BookingPrefill {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  roomId?: RoomCategoryId;
}

/** Datos de contacto del huésped en el flujo de reserva (demo). */
export interface BookingDetails {
  name: string;
  email: string;
  phone: string;
}
