import React, { useState, useEffect } from 'react';
import { 
  MapPin, WifiHigh as Wifi, ShieldCheck, Clock, Bed, ArrowsOut as Maximize2, 
  CalendarBlank as CalendarIcon, Users, Check, CaretRight as ChevronRight, 
  ArrowLeft, Coffee, ForkKnife as Utensils, Wine, ChatCircleDots as MessageSquare, Sparkle as Sparkles 
} from '@phosphor-icons/react';
import { useBooking } from '../context/BookingContext';
import { PROPERTIES } from '../data/properties';
import { Property } from '../types';
import { PhotoLightbox } from '../components/PhotoLightbox';
import { DatePickerModal } from '../components/DatePickerModal';
import { CuratedImage } from '../components/CuratedImage';
import { useScrollAnimation, gsap, ScrollTrigger } from '../hooks/useScrollAnimation';

interface PropertyDetailsPageProps {
  slug?: string;
}

export const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({ slug: propSlug }) => {
  const { 
    currentRoute, navigate, searchParams, updateSearchParam, 
    formatPrice, calculateNights, getPricingBreakdown, getWhatsAppConciergeUrl,
    showToast
  } = useBooking();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // Extract slug from props or URL
  const activeSlug = propSlug || currentRoute.replace('/residences/', '').split('/')[0] || 'the-oakwood-loft-lagos';
  
  const property: Property = PROPERTIES.find(p => p.slug === activeSlug || p.id === activeSlug) || PROPERTIES[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeSlug]);

  // Bind GSAP animations for Property Details
  useScrollAnimation(() => {
    const titleLines = document.querySelectorAll('.hero-title-line');
    if (titleLines.length > 0) {
      gsap.fromTo(
        titleLines,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
      );
    }

    // Sticky sidebar micro-interaction
    const sidebar = document.querySelector('.sticky-checkout-sidebar');
    if (sidebar) {
      ScrollTrigger.create({
        trigger: sidebar,
        start: 'top 120px',
        onEnter: () => gsap.to(sidebar, { boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)', duration: 0.3 }),
        onLeaveBack: () => gsap.to(sidebar, { boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)', duration: 0.3 }),
      });
    }
  }, [activeSlug]);

  const pricing = getPricingBreakdown(property);
  const gallery = property.galleryImages.length > 0 ? property.galleryImages : [property.heroImage];

  const handleOpenLightbox = (index: number = 0) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleProceedToCheckout = () => {
    showToast({
      title: 'Added to Reservation',
      message: `${property.title} in ${property.city} selected for ${pricing.nights} nights. Proceeding to checkout.`,
      type: 'booking',
    });
    navigate(`/book/${property.slug}`);
  };

  const getPlaceIcon = (icon: string) => {
    if (icon === 'coffee') return <Coffee className="w-4 h-4 text-[#F5EBE6]" />;
    if (icon === 'utensils') return <Utensils className="w-4 h-4 text-[#F5EBE6]" />;
    return <Wine className="w-4 h-4 text-[#F5EBE6]" />;
  };

  return (
    <div className="w-full pt-32 pb-28 sm:pb-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Lightbox & Calendar Modals */}
      <PhotoLightbox
        isOpen={lightboxOpen}
        images={gallery}
        initialIndex={lightboxIndex}
        title={property.title}
        onClose={() => setLightboxOpen(false)}
      />

      <DatePickerModal
        isOpen={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#A3968E] mb-6">
        <button onClick={() => navigate('/')} className="hover:text-[#F5EBE6] transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-[#A3968E]/60" />
        <button onClick={() => navigate('/residences')} className="hover:text-[#F5EBE6] transition-colors">
          Residences
        </button>
        <ChevronRight className="w-3 h-3 text-[#A3968E]/60" />
        <span className="text-[#F5EBE6] truncate">{property.title}</span>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#1C1613] border border-[#F5EBE6]/15 text-[11px] font-mono text-[#F5EBE6] flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#A3968E]" />
              <span>{property.neighborhoodArea}, {property.country}</span>
            </span>
            {property.tier && (
              <span className="px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[10px] font-mono text-amber-200">
                {property.tier} Grade
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F5EBE6] font-normal tracking-tight">
            <span className="hero-title-line block">{property.title}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={getWhatsAppConciergeUrl(`Hello, I have a quick question about staying at ${property.title}.`)}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-full bg-[#1C1613] border border-[#F5EBE6]/15 hover:border-[#F5EBE6]/30 text-xs text-[#F5EBE6] flex items-center gap-2 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ask Concierge</span>
          </a>
        </div>
      </div>

      {/* ============================================================ */}
      {/* EDITORIAL ASYMMETRICAL PHOTO GALLERY                         */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 rounded-3xl overflow-hidden mb-12 relative">
        {/* Massive Primary Hero Photo */}
        <div
          onClick={() => handleOpenLightbox(0)}
          className="lg:col-span-2 relative h-96 lg:h-[500px] overflow-hidden group cursor-pointer bg-black"
        >
          <CuratedImage
            src={gallery[0]}
            alt={`${property.title} Main Architecture`}
            className="group-hover:scale-105 transition-transform duration-700 ease-out"
            containerClassName="w-full h-full"
            priority={true}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none"></div>
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#120E0C]/80 backdrop-blur-md text-[11px] font-mono text-[#F5EBE6] pointer-events-none">
            Primary Living & Natural Light
          </div>
        </div>

        {/* 4 Secondary Architectural Thumbnails */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-3 h-96 lg:h-[500px]">
          {gallery.slice(1, 5).map((img, idx) => {
            const photoIdx = idx + 1;
            const isLast = idx === 3;
            return (
              <div
                key={idx}
                onClick={() => handleOpenLightbox(photoIdx)}
                className="relative overflow-hidden group cursor-pointer bg-black rounded-xl"
              >
                <CuratedImage
                  src={img}
                  alt={`${property.title} View ${photoIdx}`}
                  className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none"></div>

                {isLast && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 pointer-events-none">
                    <Maximize2 className="w-5 h-5 text-[#F5EBE6] mb-1" />
                    <span className="text-xs font-serif text-[#F5EBE6] font-medium">View All Photos</span>
                    <span className="text-[10px] font-mono text-[#A3968E] mt-0.5">({gallery.length} Images)</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* HIGH-VISIBILITY PROPERTY SPECIFICATIONS BAR                  */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 sm:p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/15 mb-16 text-center">
        <div className="p-2">
          <span className="text-[10px] uppercase font-mono text-[#A3968E] block mb-1">Scale</span>
          <span className="text-sm sm:text-base font-serif text-[#F5EBE6] font-medium">
            {property.scaleSqFt.toLocaleString()} sq ft
          </span>
        </div>

        <div className="p-2 border-l border-[#F5EBE6]/10">
          <span className="text-[10px] uppercase font-mono text-[#A3968E] block mb-1">Acoustic Shield</span>
          <span className="text-xs sm:text-sm font-mono text-[#F5EBE6] font-medium">
            {property.acousticsRating.split(' ')[0]} {property.acousticsRating.split(' ')[1]}
          </span>
        </div>

        <div className="p-2 border-l border-[#F5EBE6]/10">
          <span className="text-[10px] uppercase font-mono text-[#A3968E] block mb-1">Verified WiFi</span>
          <span className="text-xs sm:text-sm font-mono text-emerald-400 font-semibold flex items-center justify-center gap-1">
            <Wifi className="w-3.5 h-3.5" />
            <span>{property.fiberSpeedMbps} Mbps</span>
          </span>
        </div>

        <div className="p-2 border-l border-[#F5EBE6]/10">
          <span className="text-[10px] uppercase font-mono text-[#A3968E] block mb-1">Check-in / Out</span>
          <span className="text-xs sm:text-sm font-mono text-[#F5EBE6] font-medium">
            {property.checkInTime} / {property.checkOutTime}
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 p-2 sm:border-l border-[#F5EBE6]/10">
          <span className="text-[10px] uppercase font-mono text-[#A3968E] block mb-1">Bed Configuration</span>
          <span className="text-xs sm:text-sm font-serif text-[#F5EBE6] font-medium truncate block">
            {property.bedConfig}
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2-COLUMN MAIN CONTENT & STICKY RESERVATION SIDEBAR           */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left 7-Col: Architectural Narrative & Breakdown */}
        <div className="lg:col-span-7 space-y-16">
          
          {/* Architectural Story */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Narrative</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F5EBE6] font-normal mb-4">
              Architectural Story & Design Philosophy
            </h2>
            <p className="text-sm text-[#F5EBE6]/90 leading-relaxed font-light mb-4">
              {property.desc}
            </p>
            <p className="text-sm text-[#A3968E] leading-relaxed font-light">
              {property.architecturalStory}
            </p>
          </div>

          {/* Grouped Amenities Matrix */}
          <div className="pt-8 border-t border-[#F5EBE6]/10">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Specifications</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F5EBE6] font-normal mb-6">
              Residence Amenities Matrix
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {property.amenityGroups.map(group => (
                <div key={group.category} className="p-5 rounded-2xl bg-[#1C1613] border border-[#F5EBE6]/10">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#F5EBE6] pb-3 border-b border-[#F5EBE6]/10 mb-3">
                    {group.category}
                  </h4>
                  <ul className="space-y-2">
                    {group.items.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-[#A3968E]">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules & Policies */}
          <div className="pt-8 border-t border-[#F5EBE6]/10">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">House Etiquette</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F5EBE6] font-normal mb-4">
              House Rules & Quiet Hours
            </h2>
            <div className="p-6 rounded-2xl bg-[#1C1613] border border-[#F5EBE6]/10 space-y-3">
              {property.houseRules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-[#A3968E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5EBE6]/40 mt-1.5 shrink-0"></span>
                  <p>{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhood & Location Guide */}
          <div className="pt-8 border-t border-[#F5EBE6]/10">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Surroundings</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F5EBE6] font-normal mb-2">
              Neighborhood Guide: {property.neighborhood.area}
            </h2>
            <p className="text-xs text-[#A3968E] mb-6">
              {property.neighborhood.tagline}
            </p>

            <div className="space-y-3">
              {property.neighborhood.places.map((place, idx) => (
                <div
                  key={idx}
                  className="bg-[#1C1613] border border-[#F5EBE6]/10 hover:border-[#F5EBE6]/25 rounded-2xl p-4 flex items-start justify-between gap-4 transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center shrink-0">
                      {getPlaceIcon(place.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-xs text-[#F5EBE6]">{place.name}</h5>
                        <span className="text-[9px] uppercase tracking-wider text-[#A3968E] bg-[#28201C] px-2 py-0.5 rounded font-mono">
                          {place.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#A3968E] mt-1 leading-relaxed font-light">
                        {place.note}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-[#28201C] px-2.5 py-1 rounded-full whitespace-nowrap">
                    {place.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 5-Col: Sticky Reservation Sidebar Widget */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="sticky-checkout-sidebar bg-[#1C1613] border border-[#F5EBE6]/20 rounded-3xl p-6 sm:p-8 shadow-2xl transition-shadow duration-300">
            
            {/* Price Header */}
            <div className="flex items-baseline justify-between pb-6 border-b border-[#F5EBE6]/10">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#A3968E] font-mono block">Direct Rate</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-serif text-3xl sm:text-4xl text-[#F5EBE6] font-normal">
                    {formatPrice(property.pricePerNightUSD)}
                  </span>
                  <span className="text-xs text-[#A3968E] font-mono">/ night</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                  ● Direct Best Rate
                </span>
              </div>
            </div>

            {/* Date & Guest Selectors */}
            <div className="my-6 space-y-3">
              {/* Date trigger */}
              <div
                onClick={() => setDatePickerOpen(true)}
                className="p-3.5 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 hover:border-[#F5EBE6]/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#A3968E] font-mono">
                  <span>Selected Dates</span>
                  <span>{pricing.nights} Nights</span>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-[#F5EBE6] font-medium">
                  <span>{searchParams.checkIn} — {searchParams.checkOut}</span>
                  <CalendarIcon className="w-4 h-4 text-[#A3968E]" />
                </div>
              </div>

              {/* Guests selector */}
              <div className="p-3.5 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 hover:border-[#F5EBE6]/30 transition-colors">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#A3968E] font-mono mb-1">
                  <span>Number of Guests</span>
                  <span>Max {property.maxGuests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <select
                    value={searchParams.guests}
                    onChange={e => updateSearchParam('guests', Number(e.target.value))}
                    className="w-full bg-transparent text-xs text-[#F5EBE6] font-medium focus:outline-none cursor-pointer"
                  >
                    {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n} className="bg-[#1C1613]">
                        {n} {n === 1 ? 'Guest' : 'Guests'} (Full Private Residence)
                      </option>
                    ))}
                  </select>
                  <Users className="w-4 h-4 text-[#A3968E] shrink-0 ml-2" />
                </div>
              </div>
            </div>

            {/* Itemized Pricing Breakdown */}
            <div className="space-y-2.5 py-5 border-y border-[#F5EBE6]/10 text-xs">
              <div className="flex items-center justify-between text-[#A3968E]">
                <span>
                  {formatPrice(property.pricePerNightUSD)} × {pricing.nights} nights
                </span>
                <span className="font-mono text-[#F5EBE6]">{formatPrice(pricing.baseTotal)}</span>
              </div>

              <div className="flex items-center justify-between text-[#A3968E]">
                <span>Deep Architectural Cleaning Fee</span>
                <span className="font-mono text-[#F5EBE6]">{formatPrice(pricing.cleaningFee)}</span>
              </div>

              <div className="flex items-center justify-between text-[#A3968E]">
                <span>Concierge & Verification Service (8%)</span>
                <span className="font-mono text-[#F5EBE6]">{formatPrice(pricing.serviceFee)}</span>
              </div>

              <div className="flex items-center justify-between text-[#A3968E]">
                <span>Occupancy Taxes & Insured Bond</span>
                <span className="font-mono text-[#F5EBE6]">{formatPrice(pricing.taxes)}</span>
              </div>

              <div className="pt-3 border-t border-[#F5EBE6]/10 flex items-baseline justify-between text-sm">
                <span className="font-serif text-[#F5EBE6] font-medium">Estimated Total</span>
                <span className="font-serif text-xl sm:text-2xl text-[#F5EBE6] font-semibold font-mono">
                  {formatPrice(pricing.grandTotal)}
                </span>
              </div>
            </div>

            {/* Primary Action Button: Proceed to Checkout */}
            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full mt-6 py-3.5 rounded-full bg-[#F5EBE6] hover:bg-white text-[#120E0C] text-xs font-semibold uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-[#A3968E] text-center mt-3 font-light">
              Free cancellation up to 48 hours before check-in. Instant confirmation.
            </p>

            {/* Trust Badges */}
            <div className="mt-6 pt-5 border-t border-[#F5EBE6]/10 grid grid-cols-2 gap-2 text-[10px] font-mono text-[#A3968E]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>50-Point Audit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>{property.fiberSpeedMbps}Mbps Fiber</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
