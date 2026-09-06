export type Currency = 'USD' | 'EUR' | 'NGN' | 'GBP';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  rate: number; // relative to USD
  label: string;
}

export interface NeighborhoodPlace {
  name: string;
  type: string;
  icon: string;
  time: string;
  note: string;
}

export interface NeighborhoodGuide {
  area: string;
  tagline: string;
  places: NeighborhoodPlace[];
  mapEmbedQuery?: string;
}

export interface AmenityGroup {
  category: string;
  items: string[];
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  tag: string;
  city: string;
  country: string;
  neighborhoodArea: string;
  cluster: string;
  clusterName: string;
  pricePerNightUSD: number;
  scaleSqFt: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  acousticsRating: string;
  fiberSpeedMbps: number;
  bedConfig: string;
  checkInTime: string;
  checkOutTime: string;
  heroImage: string;
  galleryImages: string[];
  desc: string;
  architecturalStory: string;
  amenityGroups: AmenityGroup[];
  houseRules: string[];
  neighborhood: NeighborhoodGuide;
  featured?: boolean;
  tier?: 'Flagship' | 'Heritage' | 'Penthouse' | 'Retreat';
}

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface BookingAddOns {
  airportTransfer: boolean;
  privateChef: boolean;
  dailyHousekeeping: boolean;
  stockedKitchen: boolean;
}

export interface GuestInfo {
  fullName: string;
  email: string;
  phone: string;
  arrivalTime: string;
  flightNumber: string;
  specialRequests: string;
  paymentMethod: 'card' | 'transfer' | 'applepay' | 'crypto';
}

export interface BookingConfirmation {
  reference?: string;
  bookingRef: string;
  property: Property;
  searchParams?: SearchParams;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalNights?: number;
  addOns: BookingAddOns;
  guestInfo: GuestInfo;
  pricing?: {
    baseRate: number;
    cleaningFee: number;
    serviceFee: number;
    addOnsTotal: number;
    taxes: number;
    grandTotal: number;
    currency: Currency;
  };
  pricingBreakdown: {
    nights: number;
    baseRatePerNight: number;
    baseTotal: number;
    cleaningFee: number;
    serviceFee: number;
    addOnsTotal: number;
    taxes: number;
    grandTotal: number;
    currency: Currency;
    currencySymbol: string;
  };
  createdAt: string;
}
