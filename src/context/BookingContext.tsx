import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Currency, CurrencyInfo, Property, SearchParams, BookingAddOns, GuestInfo, BookingConfirmation } from '../types';
import { PROPERTIES } from '../data/properties';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CURRENCY_MAP: Record<Currency, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
  NGN: { code: 'NGN', symbol: '₦', rate: 1550, label: 'NGN (₦)' },
};

export const ADDON_PRICING_USD: Record<keyof BookingAddOns, { title: string; price: number; type: 'per_stay' | 'per_night'; desc: string }> = {
  airportTransfer: {
    title: 'Private Chauffeur Airport Transfer',
    price: 65,
    type: 'per_stay',
    desc: 'Executive Mercedes transfer with baggage concierge upon arrival & departure',
  },
  privateChef: {
    title: 'Private Chef Dining Experience',
    price: 180,
    type: 'per_night',
    desc: 'Bespoke multi-course dinner prepared daily with market-fresh local produce',
  },
  dailyHousekeeping: {
    title: 'Daily Turndown & Housekeeping',
    price: 45,
    type: 'per_night',
    desc: 'Meticulous daily linen refresh, towel replenishment, and kitchen polishing',
  },
  stockedKitchen: {
    title: 'Artisan Welcome Pantry Provisioning',
    price: 55,
    type: 'per_stay',
    desc: 'Locally baked sourdough, organic fruits, single-origin roasts & regional wines',
  },
};

interface PricingBreakdown {
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
}

export interface Toast {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'booking';
  duration?: number;
}

interface BookingContextType {
  // Navigation
  currentRoute: string;
  navigate: (route: string, scrollRestoration?: boolean) => void;
  
  // Search state
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  updateSearchParam: <K extends keyof SearchParams>(key: K, value: SearchParams[K]) => void;

  // Selected property
  selectedProperty: Property | null;
  setSelectedProperty: (prop: Property | null) => void;
  selectPropertyBySlug: (slug: string) => Property | null;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  currencyList: CurrencyInfo[];
  formatPrice: (priceInUSD: number, compact?: boolean) => string;
  convertUSDToActive: (priceInUSD: number) => number;

  // Add-ons & Guest Form
  bookingAddOns: BookingAddOns;
  setBookingAddOns: React.Dispatch<React.SetStateAction<BookingAddOns>>;
  toggleAddOn: (key: keyof BookingAddOns) => void;
  guestInfo: GuestInfo;
  setGuestInfo: React.Dispatch<React.SetStateAction<GuestInfo>>;
  updateGuestInfo: <K extends keyof GuestInfo>(key: K, value: GuestInfo[K]) => void;

  // Calculation helpers
  calculateNights: (checkInStr: string, checkOutStr: string) => number;
  getPricingBreakdown: (property: Property, addOnsOverride?: BookingAddOns) => PricingBreakdown;

  // Bookings list / history
  confirmedBooking: BookingConfirmation | null;
  setConfirmedBooking: (b: BookingConfirmation | null) => void;

  // Concierge whatsapp helper
  getWhatsAppConciergeUrl: (customMsg?: string) => string;

  // Toast notifications
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Initial fallback dates (formatted YYYY-MM-DD for consistency)
const getDefaultDates = () => {
  const now = new Date();
  const checkIn = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const checkOut = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  return {
    checkIn: checkIn.toISOString().split('T')[0],
    checkOut: checkOut.toISOString().split('T')[0],
  };
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultDates = useMemo(() => getDefaultDates(), []);

  // Browser path or fallback
  const getInitialRoute = () => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');
    if (hash && hash.startsWith('/')) return hash;
    return path && path.length > 0 ? path : '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  const [searchParams, setSearchParams] = useState<SearchParams>(() => {
    try {
      const saved = localStorage.getItem('nearhome_search');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      destination: 'all',
      checkIn: defaultDates.checkIn,
      checkOut: defaultDates.checkOut,
      guests: 2,
    };
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('nearhome_currency') as Currency;
      if (saved && CURRENCY_MAP[saved]) return saved;
    } catch (e) {}
    return 'USD';
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(PROPERTIES[0]);

  const [bookingAddOns, setBookingAddOns] = useState<BookingAddOns>({
    airportTransfer: false,
    privateChef: false,
    dailyHousekeeping: false,
    stockedKitchen: false,
  });

  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    fullName: '',
    email: '',
    phone: '',
    arrivalTime: '15:00',
    flightNumber: '',
    specialRequests: '',
    paymentMethod: 'card',
  });

  const [confirmedBooking, setConfirmedBooking] = useState<BookingConfirmation | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: Toast = { id, ...toast };
    setToasts(prev => [...prev.slice(-3), newToast]);

    const duration = toast.duration || 4200;
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  // Sync route on popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentRoute(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Save search & currency
  useEffect(() => {
    try {
      localStorage.setItem('nearhome_search', JSON.stringify(searchParams));
    } catch (e) {}
  }, [searchParams]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('nearhome_currency', c);
    } catch (e) {}
  };

  // GSAP animated router navigation with ScrollTrigger cleanup
  const navigate = (newRoute: string, scrollRestoration: boolean = true) => {
    if (newRoute === currentRoute) {
      if (scrollRestoration) window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const pageContainer = document.getElementById('page-content-wrapper') || document.getElementById('page-content');
    if (pageContainer) {
      gsap.to(pageContainer, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        clearProps: 'all',
        onComplete: () => {
          setCurrentRoute(newRoute);
          try {
            window.history.pushState(null, '', newRoute);
          } catch (e) {
            window.location.hash = newRoute;
          }
          if (scrollRestoration) {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }
        },
      });
    } else {
      setCurrentRoute(newRoute);
      try {
        window.history.pushState(null, '', newRoute);
      } catch (e) {
        window.location.hash = newRoute;
      }
      if (scrollRestoration) window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const updateSearchParam = <K extends keyof SearchParams>(key: K, value: SearchParams[K]) => {
    setSearchParams(prev => ({ ...prev, [key]: value }));
  };

  const selectPropertyBySlug = (slug: string): Property | null => {
    const match = PROPERTIES.find(p => p.slug === slug || p.id === slug);
    if (match) {
      setSelectedProperty(match);
      return match;
    }
    return null;
  };

  const toggleAddOn = (key: keyof BookingAddOns) => {
    setBookingAddOns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateGuestInfo = <K extends keyof GuestInfo>(key: K, value: GuestInfo[K]) => {
    setGuestInfo(prev => ({ ...prev, [key]: value }));
  };

  const convertUSDToActive = (priceInUSD: number): number => {
    const rate = CURRENCY_MAP[currency]?.rate || 1;
    return priceInUSD * rate;
  };

  const formatPrice = (priceInUSD: number, compact: boolean = false): string => {
    const info = CURRENCY_MAP[currency] || CURRENCY_MAP.USD;
    const converted = priceInUSD * info.rate;

    if (currency === 'NGN') {
      const rounded = Math.round(converted / 100) * 100;
      return `${info.symbol}${rounded.toLocaleString()}`;
    }

    if (compact) {
      return `${info.symbol}${Math.round(converted).toLocaleString()}`;
    }

    return `${info.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const calculateNights = (checkInStr: string, checkOutStr: string): number => {
    try {
      const d1 = new Date(checkInStr);
      const d2 = new Date(checkOutStr);
      const diffTime = d2.getTime() - d1.getTime();
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 1;
    } catch (e) {
      return 7;
    }
  };

  const getPricingBreakdown = (
    property: Property,
    addOnsOverride?: BookingAddOns
  ): PricingBreakdown => {
    const activeAddOns = addOnsOverride || bookingAddOns;
    const nights = calculateNights(searchParams.checkIn, searchParams.checkOut);
    const baseRatePerNight = property.pricePerNightUSD;
    const baseTotal = baseRatePerNight * nights;
    const cleaningFee = Math.round(property.pricePerNightUSD * 0.45);
    const serviceFee = Math.round(baseTotal * 0.08);

    let addOnsTotal = 0;
    if (activeAddOns.airportTransfer) addOnsTotal += ADDON_PRICING_USD.airportTransfer.price;
    if (activeAddOns.stockedKitchen) addOnsTotal += ADDON_PRICING_USD.stockedKitchen.price;
    if (activeAddOns.privateChef) addOnsTotal += ADDON_PRICING_USD.privateChef.price * nights;
    if (activeAddOns.dailyHousekeeping) addOnsTotal += ADDON_PRICING_USD.dailyHousekeeping.price * nights;

    const subtotal = baseTotal + cleaningFee + serviceFee + addOnsTotal;
    const taxes = Math.round(subtotal * 0.075);
    const grandTotal = subtotal + taxes;

    return {
      nights,
      baseRatePerNight,
      baseTotal,
      cleaningFee,
      serviceFee,
      addOnsTotal,
      taxes,
      grandTotal,
      currency,
      currencySymbol: CURRENCY_MAP[currency].symbol,
    };
  };

  const getWhatsAppConciergeUrl = (customMsg?: string): string => {
    const phone = '2348123456789'; // Near Home WhatsApp Concierge Line
    const defaultText = `Hello Near Home Concierge, I am inquiring about booking ${selectedProperty ? selectedProperty.title : 'a residence'} for ${searchParams.guests} guests (${searchParams.checkIn} to ${searchParams.checkOut}).`;
    const message = encodeURIComponent(customMsg || defaultText);
    return `https://wa.me/${phone}?text=${message}`;
  };

  const currencyList = useMemo(() => Object.values(CURRENCY_MAP), []);

  return (
    <BookingContext.Provider
      value={{
        currentRoute,
        navigate,
        searchParams,
        setSearchParams,
        updateSearchParam,
        selectedProperty,
        setSelectedProperty,
        selectPropertyBySlug,
        currency,
        setCurrency,
        currencyList,
        formatPrice,
        convertUSDToActive,
        bookingAddOns,
        setBookingAddOns,
        toggleAddOn,
        guestInfo,
        setGuestInfo,
        updateGuestInfo,
        calculateNights,
        getPricingBreakdown,
        confirmedBooking,
        setConfirmedBooking,
        getWhatsAppConciergeUrl,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
