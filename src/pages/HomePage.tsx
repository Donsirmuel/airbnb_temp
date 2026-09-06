import React, { useState, useRef } from 'react';
import { 
  MagnifyingGlass as Search, CalendarBlank as CalendarIcon, Users, ArrowRight, 
  WifiHigh as Wifi, MapPin, CaretRight as ChevronRight, CaretLeft as ChevronLeft, ShieldCheck, Key,
  CaretUp as ChevronUp, CaretDown as ChevronDown 
} from '@phosphor-icons/react';
import { useBooking } from '../context/BookingContext';
import { PROPERTIES } from '../data/properties';
import { DatePickerModal } from '../components/DatePickerModal';
import { CuratedImage } from '../components/CuratedImage';
import { Property } from '../types';
import { useScrollAnimation, gsap, ScrollTrigger } from '../hooks/useScrollAnimation';
import { useEditorialCardReveal } from '../hooks/useEditorialCardReveal';

export const HomePage: React.FC = () => {
  const { navigate, searchParams, updateSearchParam, formatPrice, showToast } = useBooking();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<Record<string, number>>({});
  const homeRef = useRef<HTMLDivElement>(null);

  // Top flagship residences
  const flagshipStays = PROPERTIES.slice(0, 4);

  // Bind reusable intersection-based card reveals with scale and opacity
  useEditorialCardReveal(homeRef, []);

  // BIND ALL GSAP & SCROLLTRIGGER LIFECYCLES
  useScrollAnimation(() => {
    // -------------------------------------------------------------
    // ACT 1: HERO SCENE PARALLAX & ENTRANCE
    // -------------------------------------------------------------
    // Element 1: Hero Text Staggered Line-by-Line Reveal (GSAP fromTo with silky editorial timing)
    const heroLines = document.querySelectorAll('.hero-title-line');
    const heroSubtext = document.querySelector('.hero-subtext');
    const heroSearchBar = document.querySelector('.hero-search-bar');

    const heroTl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      delay: 0.12,
    });

    if (heroLines.length > 0) {
      heroTl.fromTo(
        heroLines,
        {
          yPercent: 115,
          opacity: 0,
          rotateX: 10,
          transformOrigin: '0% 50% -20',
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.25,
          stagger: 0.16,
          ease: 'power4.out',
        }
      );
    }

    if (heroSubtext) {
      heroTl.fromTo(
        heroSubtext,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      );
    }

    if (heroSearchBar) {
      heroTl.fromTo(
        heroSearchBar,
        { y: 32, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 0.95, ease: 'power3.out' },
        '-=0.6'
      );
    }

    // Element 2: Background Image Parallax with GSAP ScrollTrigger
    const heroBg = document.querySelector('.hero-bg-image');
    const heroSection = document.querySelector('#hero-section');
    if (heroBg && heroSection) {
      gsap.fromTo(
        heroBg,
        {
          yPercent: 0,
          scale: 1,
        },
        {
          yPercent: 28,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    // -------------------------------------------------------------
    // ACT 3: FULL-BLEED PINNED SCROLLYTELLING CLIP REVEAL
    // -------------------------------------------------------------
    const cinematicSection = document.querySelector('#cinematic-experience-section');
    const maskContainer = document.querySelector('.mask-expand-container');
    if (cinematicSection && maskContainer) {
      const cinematicTl = gsap.timeline({
        scrollTrigger: {
          trigger: cinematicSection,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // Keyframe 1: Expand frame from rounded box to full-bleed viewport cover
      cinematicTl.to(
        maskContainer,
        {
          width: '100vw',
          maxWidth: '100vw',
          height: '100vh',
          borderRadius: '0px',
          ease: 'power2.inOut',
        },
        0
      );

      // Keyframe 2: Subtle architectural depth zoom on the image
      const cinematicImg = maskContainer.querySelector('img');
      if (cinematicImg) {
        cinematicTl.fromTo(
          cinematicImg,
          { scale: 1.0 },
          { scale: 1.08, ease: 'none' },
          0
        );
      }

      // Keyframe 3: Staggered entrance of internal floating badges
      const badges = maskContainer.querySelectorAll('.floating-badge');
      if (badges.length > 0) {
        cinematicTl.fromTo(
          badges,
          { scale: 0.75, opacity: 0, y: 24 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.15, ease: 'back.out(1.5)' },
          0.15
        );
      }
    }
  }, []);

  const testimonials = [
    {
      quote: "The acoustic isolation at The Oakwood Loft in Lagos was extraordinary. I recorded studio podcasts and ran transatlantic client workshops without a single interruption.",
      author: "Adewale Vance",
      role: "Principal Product Architect",
      stay: "The Oakwood Loft · Lagos",
    },
    {
      quote: "The Mews Library in Kensington felt like an authentic private club. Double-height oak shelves, crackling fireplace, and an honest 1.2Gbps connection for deep writing.",
      author: "Eleanor Sterling",
      role: "Contributing Editor",
      stay: "The Mews Library · London",
    },
    {
      quote: "Near Home represents the antithesis of sterile cookie-cutter rentals. The Hinoki soaking tub and moss courtyard in Kyoto were a spiritual reset after Tokyo meetings.",
      author: "Kenji Takahashi",
      role: "Creative Director",
      stay: "The Hinoki Pavilion · Kyoto",
    },
  ];

  const homeFaqs = [
    {
      q: "How does Near Home guarantee acoustic isolation and quietude?",
      a: "Every residence in our portfolio undergoes acoustic frequency auditing to ensure ambient indoor background noise levels do not exceed 35 dB. We implement acoustic double/triple-glazed windows, solid timber doors with perimeter drop-seals, and architectural insulation so you can work, think, and rest without street or neighbor disturbance.",
    },
    {
      q: "What does verified 1Gbps connectivity mean in practice?",
      a: "Before each reservation, our local concierge runs live wired and wireless speed and latency tests. We provide redundant symmetrical fiber connections with mesh Wi-Fi 6 coverage throughout the entire residence, ensuring frictionless video conferencing, large asset transfers, and simultaneous streaming.",
    },
    {
      q: "Can I book for flexible or extended stays (1 week to 6 months)?",
      a: "Yes. All Near Home properties are fully furnished, fully serviced residences configured for both short-term retreats and long-term stays. Stays beyond 14 nights receive weekly architectural housekeeping, linen rotations, and bespoke concierge rates.",
    },
    {
      q: "How do check-in, keyless arrival, and concierge assistance work?",
      a: "Arrival is entirely seamless and keyless. 24 hours prior to check-in, you receive encrypted mobile access credentials and a personal orientation briefing. Our dedicated concierge team is available 24/7 via private WhatsApp or direct line for private airport transfers, pantry provisioning, or private chef arrangements.",
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      title: 'Searching Residences',
      message: `Filtering curated stays for ${searchParams.destination === 'all' ? 'all destinations' : searchParams.destination} (${searchParams.guests} guests).`,
      type: 'info',
    });
    navigate('/residences');
  };

  const handleNextPhoto = (e: React.MouseEvent, prop: Property) => {
    e.stopPropagation();
    const images = prop.galleryImages.length > 0 ? prop.galleryImages : [prop.heroImage];
    setActivePhotoIdx(prev => ({
      ...prev,
      [prop.id]: ((prev[prop.id] || 0) + 1) % images.length,
    }));
  };

  const handlePrevPhoto = (e: React.MouseEvent, prop: Property) => {
    e.stopPropagation();
    const images = prop.galleryImages.length > 0 ? prop.galleryImages : [prop.heroImage];
    setActivePhotoIdx(prev => ({
      ...prev,
      [prop.id]: ((prev[prop.id] || 0) - 1 + images.length) % images.length,
    }));
  };

  return (
    <div ref={homeRef} className="w-full">
      {/* Date Picker Modal */}
      <DatePickerModal isOpen={datePickerOpen} onClose={() => setDatePickerOpen(false)} />

      {/* ============================================================ */}
      {/* ACT 1: HERO SCENE WITH EXACT REQUIRED EDITORIAL COPY         */}
      {/* ============================================================ */}
      <section 
        id="hero-section" 
        className="relative min-h-screen flex flex-col justify-between pt-24 pb-20 sm:pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden"
      >
        {/* Parallax Background Canvas */}
        <div className="absolute inset-0 -top-24 -bottom-24 z-0 overflow-hidden pointer-events-none">
          <div className="hero-bg-image w-full h-[130%] -top-[15%] relative will-change-transform">
            <CuratedImage
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"
              alt="Warm Architectural Living Room"
              containerClassName="w-full h-full"
              className="filter brightness-[0.45] contrast-[1.05]"
              priority={true}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-[#120E0C]/35 to-[#120E0C]/40"></div>
        </div>

        {/* Hero Title Lines with generous vertical rhythm and no forced overlaps */}
        <div className="relative z-10 max-w-4xl mt-16 sm:mt-24 flex flex-col gap-y-6 sm:gap-y-8">
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#F5EBE6] tracking-tight leading-[1.04]">
            <span className="block overflow-hidden py-0.5">
              <span className="hero-title-line block will-change-transform">
                The warmth
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span className="hero-title-line block will-change-transform">
                of home,
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span className="hero-title-line block font-serif italic font-light text-[#F5EBE6]/95 will-change-transform">
                anywhere in the world.
              </span>
            </span>
          </h1>

          <p className="hero-subtext text-base sm:text-lg text-[#D6CBC5] max-w-xl font-light leading-relaxed">
            Handpicked architectural apartments designed for effortless comfort, productivity, and rest.
          </p>
        </div>

        {/* Clean, Non-AI Search Bar */}
        <div className="hero-search-bar relative z-10 w-full max-w-4xl mt-12 sm:mt-16">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-[#1C1613] border border-[#F5EBE6]/15 rounded-2xl p-3 grid grid-cols-1 md:grid-cols-4 gap-3 items-center shadow-2xl"
          >
            {/* Destination */}
            <div className="px-4 py-2 border-b md:border-b-0 md:border-r border-[#F5EBE6]/10">
              <label className="text-[10px] uppercase tracking-widest text-[#A3968E] font-mono block">Destination</label>
              <select
                value={searchParams.destination}
                onChange={e => updateSearchParam('destination', e.target.value)}
                className="w-full bg-transparent text-xs text-[#F5EBE6] font-medium focus:outline-none mt-1 cursor-pointer"
              >
                <option value="all" className="bg-[#1C1613] text-[#F5EBE6]">All Destinations</option>
                <option value="Lagos" className="bg-[#1C1613] text-[#F5EBE6]">Lagos, Nigeria</option>
                <option value="Abuja" className="bg-[#1C1613] text-[#F5EBE6]">Abuja, Nigeria</option>
                <option value="London" className="bg-[#1C1613] text-[#F5EBE6]">London, United Kingdom</option>
                <option value="New York" className="bg-[#1C1613] text-[#F5EBE6]">New York, United States</option>
                <option value="Cape Town" className="bg-[#1C1613] text-[#F5EBE6]">Cape Town, South Africa</option>
                <option value="Kyoto" className="bg-[#1C1613] text-[#F5EBE6]">Kyoto, Japan</option>
                <option value="Dubai" className="bg-[#1C1613] text-[#F5EBE6]">Dubai, UAE</option>
                <option value="Cairo" className="bg-[#1C1613] text-[#F5EBE6]">Cairo, Egypt</option>
              </select>
            </div>

            {/* Check-In / Check-Out */}
            <div
              onClick={() => setDatePickerOpen(true)}
              className="px-4 py-2 border-b md:border-b-0 md:border-r border-[#F5EBE6]/10 cursor-pointer"
            >
              <label className="text-[10px] uppercase tracking-widest text-[#A3968E] font-mono block">Dates</label>
              <div className="flex items-center justify-between mt-1 text-xs text-[#F5EBE6] font-medium">
                <span className="truncate font-mono">{searchParams.checkIn} — {searchParams.checkOut}</span>
                <CalendarIcon className="w-3.5 h-3.5 text-[#A3968E] shrink-0 ml-1" />
              </div>
            </div>

            {/* Guests */}
            <div className="px-4 py-2 border-b md:border-b-0 md:border-r border-[#F5EBE6]/10">
              <label className="text-[10px] uppercase tracking-widest text-[#A3968E] font-mono block">Guests</label>
              <div className="flex items-center justify-between mt-1">
                <select
                  value={searchParams.guests}
                  onChange={e => updateSearchParam('guests', Number(e.target.value))}
                  className="w-full bg-transparent text-xs text-[#F5EBE6] font-medium focus:outline-none cursor-pointer"
                >
                  <option value={1} className="bg-[#1C1613] text-[#F5EBE6]">1 Guest</option>
                  <option value={2} className="bg-[#1C1613] text-[#F5EBE6]">2 Guests</option>
                  <option value={3} className="bg-[#1C1613] text-[#F5EBE6]">3 Guests</option>
                  <option value={4} className="bg-[#1C1613] text-[#F5EBE6]">4 Guests</option>
                  <option value={6} className="bg-[#1C1613] text-[#F5EBE6]">6 Guests</option>
                </select>
                <Users className="w-3.5 h-3.5 text-[#A3968E] shrink-0 ml-1" />
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full h-full min-h-[46px] bg-[#F5EBE6] hover:bg-white text-[#120E0C] font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Residences</span>
            </button>
          </form>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ACT 2: ASYMMETRICAL CARD SCALE-UP & REVEAL                  */}
      {/* ============================================================ */}
      <section className="py-28 sm:py-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6 border-b border-[#F5EBE6]/10 pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Curated Collection</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F5EBE6] font-normal">Flagship Residences</h2>
          </div>
          <button
            onClick={() => navigate('/residences')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5EBE6] hover:text-white transition-colors group cursor-pointer"
          >
            <span>View All Residences</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* 2-Column Asymmetrical Grid with .editorial-card triggers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {flagshipStays.map((stay, idx) => {
            const isOffset = idx % 2 === 1;
            const images = stay.galleryImages.length > 0 ? stay.galleryImages : [stay.heroImage];
            const currentPhotoIdx = activePhotoIdx[stay.id] || 0;
            const activePhoto = images[currentPhotoIdx];

            return (
              <div
                key={stay.id}
                onClick={() => navigate(`/residences/${stay.slug}`)}
                className={`editorial-card group cursor-pointer rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10 hover:border-[#F5EBE6]/30 overflow-hidden flex flex-col justify-between transition-transform duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl ${
                  isOffset ? 'lg:translate-y-8' : ''
                }`}
              >
                {/* Photo Stage with Hairline Border Separation */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-black border-b border-[#F5EBE6]/10">
                  <CuratedImage
                    src={activePhoto}
                    alt={stay.title}
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    containerClassName="w-full h-full"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1613] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                  {/* Carousel Controls */}
                  {images.length > 1 && (
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={e => handlePrevPhoto(e, stay)}
                        className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={e => handleNextPhoto(e, stay)}
                        className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Location Tag */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                    <div className="px-3 py-1 rounded-full bg-[#120E0C]/80 backdrop-blur-md border border-[#F5EBE6]/15 text-[11px] font-mono text-[#F5EBE6] flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#A3968E]" />
                      <span>{stay.city}, {stay.country}</span>
                    </div>
                  </div>

                  {/* Refined Nightly Rate Badge */}
                  <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#120E0C]/95 backdrop-blur-md border border-[#F5EBE6]/20 shadow-lg text-xs font-semibold text-[#F5EBE6] pointer-events-none">
                    <span>{formatPrice(stay.pricePerNightUSD)}</span>
                    <span className="font-normal text-[10px] text-[#A3968E] ml-1">/ night</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-widest text-[#A3968E] font-mono">
                        {stay.neighborhoodArea}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#28201C] border border-emerald-500/20 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Wifi className="w-3 h-3" />
                        {stay.fiberSpeedMbps}Mbps Fiber
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EBE6] group-hover:text-white transition-colors">
                      {stay.title}
                    </h3>

                    <p className="text-xs text-[#A3968E] mt-3 line-clamp-2 leading-relaxed font-light">
                      {stay.desc}
                    </p>
                  </div>

                  {/* Specs Pill Container with Clear Hairline Borders */}
                  <div className="mt-8 pt-5 border-t border-[#F5EBE6]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#A3968E]">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#D6CBC5]">
                      <span className="px-2.5 py-1 rounded-full bg-[#28201C] border border-[#F5EBE6]/10">
                        {stay.scaleSqFt} sq ft
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#28201C] border border-[#F5EBE6]/10">
                        {stay.bedrooms} {stay.bedrooms === 1 ? 'Bed' : 'Beds'}
                      </span>
                      <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-[#28201C] border border-[#F5EBE6]/10">
                        Max {stay.maxGuests} Guests
                      </span>
                    </div>

                    <span className="text-[#F5EBE6] font-medium flex items-center gap-1 group-hover:translate-x-1.5 transition-transform text-xs">
                      Reserve Stay →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* ACT 3: FULL-BLEED PINNED SCROLLYTELLING CLIP REVEAL          */}
      {/* ============================================================ */}
      <section 
        id="cinematic-experience-section" 
        className="relative w-full min-h-screen py-24 sm:py-32 bg-[#0D0A09] flex items-center justify-center overflow-hidden"
      >
        <div 
          id="cinematic-pin-stage" 
          className="w-full h-full flex items-center justify-center overflow-hidden relative"
        >
          {/* Target Frame: .mask-expand-container */}
          <div 
            className="mask-expand-container relative overflow-hidden bg-black shadow-2xl flex flex-col justify-between items-center p-8 sm:p-14 lg:p-16 min-h-[580px] sm:min-h-[660px]"
            style={{ width: '86vw', maxWidth: '1240px', height: '78vh', borderRadius: '40px' }}
          >
            {/* Cinematic Full-Bleed Background Image */}
            <CuratedImage
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85"
              alt="Cinematic Living Sanctuary"
              containerClassName="w-full h-full absolute inset-0"
              className="filter brightness-[0.72] contrast-[1.08]"
              priority={false}
            />

            {/* Architectural Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A09]/95 via-[#0D0A09]/45 to-[#0D0A09]/75 pointer-events-none"></div>

            {/* Top Category Indicator */}
            <div className="relative z-10 w-full flex justify-center">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-mono text-[#A3968E] px-4 py-1.5 rounded-full bg-[#120E0C]/60 backdrop-blur-md border border-[#F5EBE6]/10">
                Atmosphere & Architecture
              </span>
            </div>

            {/* Central Typography Header with deliberate gap-y and max-width */}
            <div className="relative z-10 text-center px-4 max-w-3xl my-auto flex flex-col items-center gap-y-4 sm:gap-y-6">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5EBE6] font-normal leading-[1.12]">
                Designed for uninterrupted thought.
              </h2>
              <p className="text-sm sm:text-base text-[#D6CBC5] max-w-xl mx-auto font-light leading-relaxed">
                Quiet acoustics, natural materials, and deliberate ergonomics create an environment where creativity and deep rest feel effortless.
              </p>
            </div>

            {/* Natural Flex Bottom Row: Badges in natural flow, avoiding any text overlap */}
            <div className="relative z-20 flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 pointer-events-none">
              <div className="floating-badge px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1C1613]/90 border border-[#F5EBE6]/20 backdrop-blur-md text-[11px] sm:text-xs font-mono text-[#F5EBE6] flex items-center gap-2 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>Sub-35 dB Sound Isolation</span>
              </div>
              <div className="floating-badge px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1C1613]/90 border border-[#F5EBE6]/20 backdrop-blur-md text-[11px] sm:text-xs font-mono text-[#F5EBE6] flex items-center gap-2 shadow-lg">
                <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>1Gbps Dedicated Fiber</span>
              </div>
              <div className="floating-badge px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1C1613]/90 border border-[#F5EBE6]/20 backdrop-blur-md text-[11px] sm:text-xs font-mono text-[#F5EBE6] flex items-center gap-2 shadow-lg">
                <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                <span>Keyless Contactless Arrival</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* GUEST REFLECTIONS SECTION ("Words from Residents")          */}
      {/* ============================================================ */}
      <section id="reviews" className="py-28 sm:py-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-[#F5EBE6]/10">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 flex flex-col items-center gap-y-3.5">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block">Reflections</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F5EBE6] font-normal leading-tight">Words from Residents</h2>
          <p className="text-sm text-[#A3968E] max-w-md font-light leading-relaxed">
            Impressions from authors, founders, and traveling professionals who made our residences their temporary home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#1C1613] border border-[#F5EBE6]/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#F5EBE6]/25 transition-all"
            >
              <p className="text-xs sm:text-sm text-[#F5EBE6]/90 leading-relaxed font-light italic">
                "{t.quote}"
              </p>

              <div className="mt-8 pt-6 border-t border-[#F5EBE6]/10">
                <h5 className="text-xs font-medium text-[#F5EBE6]">{t.author}</h5>
                <p className="text-[11px] text-[#A3968E] mt-0.5">{t.role}</p>
                <span className="inline-block mt-2 text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  {t.stay}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* FREQUENTLY ASKED QUESTIONS ACCORDION                         */}
      {/* ============================================================ */}
      <section id="faq" className="py-28 sm:py-36 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto border-t border-[#F5EBE6]/10">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 flex flex-col items-center gap-y-3.5">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block">Clarifications</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F5EBE6] font-normal leading-tight">Frequently Answered</h2>
          <p className="text-sm text-[#A3968E] max-w-md font-light leading-relaxed">
            Essential details regarding acoustic standards, residential leases, connectivity, and arrival logistics.
          </p>
        </div>

        <div className="w-full flex flex-col gap-y-4">
          {homeFaqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="w-full rounded-2xl bg-[#1C1613] border border-[#F5EBE6]/10 hover:border-[#F5EBE6]/20 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-medium text-[#F5EBE6] hover:text-white transition-colors cursor-pointer"
                >
                  <span className="leading-snug font-serif pr-2">{faq.q}</span>
                  <span className="p-1.5 rounded-full bg-[#28201C] text-[#A3968E] shrink-0 border border-[#F5EBE6]/5">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-[#F5EBE6]/10 text-xs sm:text-sm text-[#D6CBC5] leading-relaxed font-light">
                    <p className="mt-1">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
