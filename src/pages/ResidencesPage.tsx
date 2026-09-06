import React, { useState, useMemo } from 'react';
import { 
  MagnifyingGlass as Search, SlidersHorizontal, MapPin, WifiHigh as Wifi, Users, 
  CaretLeft as ChevronLeft, CaretRight as ChevronRight, X, ArrowRight, ShieldCheck, 
  ArrowsDownUp as ArrowUpDown, Check, Sparkle as Sparkles 
} from '@phosphor-icons/react';
import { useBooking } from '../context/BookingContext';
import { PROPERTIES } from '../data/properties';
import { Property } from '../types';
import { CuratedImage } from '../components/CuratedImage';
import { useEditorialCardReveal } from '../hooks/useEditorialCardReveal';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'availability' | 'size-desc';

export const ResidencesPage: React.FC = () => {
  const { navigate, searchParams, updateSearchParam, formatPrice, calculateNights, showToast } = useBooking();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>(searchParams.destination || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  
  // Amenities toggles
  const [filterFiber, setFilterFiber] = useState(false);
  const [filterWorkspace, setFilterWorkspace] = useState(false);
  const [filterBalcony, setFilterBalcony] = useState(false);
  const [filterPool, setFilterPool] = useState(false);
  const [filterPets, setFilterPets] = useState(false);

  // Card carousel active index state map { [propertyId]: number }
  const [cardPhotoIndex, setCardPhotoIndex] = useState<Record<string, number>>({});

  const totalNights = useMemo(() => {
    return calculateNights(searchParams.checkIn, searchParams.checkOut);
  }, [searchParams.checkIn, searchParams.checkOut, calculateNights]);

  // Cities list from properties
  const cities = useMemo(() => {
    const list = Array.from(new Set(PROPERTIES.map(p => p.city)));
    return ['all', ...list];
  }, []);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(prop => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          prop.title.toLowerCase().includes(q) ||
          prop.city.toLowerCase().includes(q) ||
          prop.neighborhoodArea.toLowerCase().includes(q) ||
          prop.desc.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // City filter
      if (selectedCity !== 'all' && prop.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Max price
      if (prop.pricePerNightUSD > maxPrice) {
        return false;
      }

      // Bedrooms
      if (selectedBedrooms === '1' && prop.bedrooms !== 1) return false;
      if (selectedBedrooms === '2' && prop.bedrooms !== 2) return false;
      if (selectedBedrooms === '3+' && prop.bedrooms < 3) return false;

      // Amenities
      if (filterFiber && prop.fiberSpeedMbps < 1000) return false;
      if (filterWorkspace && !prop.desc.toLowerCase().includes('work') && !prop.desc.toLowerCase().includes('desk')) return false;
      if (filterBalcony && !prop.desc.toLowerCase().includes('terrace') && !prop.desc.toLowerCase().includes('balcony')) return false;
      if (filterPool && !prop.desc.toLowerCase().includes('pool') && !prop.desc.toLowerCase().includes('sauna') && !prop.desc.toLowerCase().includes('bath')) return false;
      if (filterPets && !prop.desc.toLowerCase().includes('pet')) return false;

      return true;
    });
  }, [searchQuery, selectedCity, maxPrice, selectedBedrooms, filterFiber, filterWorkspace, filterBalcony, filterPool, filterPets]);

  // Sorted properties
  const sortedProperties = useMemo(() => {
    const items = [...filteredProperties];
    if (sortBy === 'price-asc') {
      return items.sort((a, b) => a.pricePerNightUSD - b.pricePerNightUSD);
    }
    if (sortBy === 'price-desc') {
      return items.sort((a, b) => b.pricePerNightUSD - a.pricePerNightUSD);
    }
    if (sortBy === 'availability') {
      // Immediate availability prioritization: flagship first, then check-in timing
      return items.sort((a, b) => {
        if (a.tier === 'Flagship' && b.tier !== 'Flagship') return -1;
        if (b.tier === 'Flagship' && a.tier !== 'Flagship') return 1;
        return a.title.localeCompare(b.title);
      });
    }
    if (sortBy === 'size-desc') {
      return items.sort((a, b) => b.scaleSqFt - a.scaleSqFt);
    }
    return items; // Default featured curation
  }, [filteredProperties, sortBy]);

  const handleNextPhoto = (e: React.MouseEvent, prop: Property) => {
    e.stopPropagation();
    const images = prop.galleryImages.length > 0 ? prop.galleryImages : [prop.heroImage];
    setCardPhotoIndex(prev => {
      const current = prev[prop.id] || 0;
      return { ...prev, [prop.id]: (current + 1) % images.length };
    });
  };

  const handlePrevPhoto = (e: React.MouseEvent, prop: Property) => {
    e.stopPropagation();
    const images = prop.galleryImages.length > 0 ? prop.galleryImages : [prop.heroImage];
    setCardPhotoIndex(prev => {
      const current = prev[prop.id] || 0;
      return { ...prev, [prop.id]: (current - 1 + images.length) % images.length };
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setMaxPrice(500);
    setSelectedBedrooms('all');
    setSortBy('featured');
    setFilterFiber(false);
    setFilterWorkspace(false);
    setFilterBalcony(false);
    setFilterPool(false);
    setFilterPets(false);
    updateSearchParam('destination', 'all');
    showToast({
      title: 'Filters Reset',
      message: 'Restored default curated search criteria across all worldwide destinations.',
      type: 'info',
    });
  };

  // Reveal animation for all .editorial-card elements, responding to filter and sort updates
  useEditorialCardReveal(undefined, [sortedProperties]);

  const handleSelectResidence = (stay: Property) => {
    showToast({
      title: 'Residence Selected',
      message: `Navigating to ${stay.title} in ${stay.city}.`,
      type: 'info',
      duration: 3000,
    });
    navigate(`/residences/${stay.slug}`);
  };

  const sortLabels: Record<SortOption, string> = {
    featured: 'Featured Curation',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low',
    availability: 'Availability (Immediate)',
    'size-desc': 'Residence Size (Sq Ft)',
  };

  return (
    <div className="w-full pt-32 pb-28 sm:pb-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Page Title & Mission */}
      <div className="mb-12">
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Inventory</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F5EBE6] font-normal">
          The Residences Catalog
        </h1>
        <p className="text-sm text-[#A3968E] mt-3 max-w-2xl font-light leading-relaxed">
          Ten architectural sanctuaries across Africa, Europe, the Americas, and Asia-Pacific. Each residence is privately leased in its entirety with acoustic STC certification and verified 1Gbps connectivity.
        </p>
      </div>

      {/* ============================================================ */}
      {/* FILTER & DISCOVERY ENGINE CONTROL BAR                        */}
      {/* ============================================================ */}
      <div className="bg-[#1C1613] border border-[#F5EBE6]/10 rounded-3xl p-6 sm:p-7 mb-12 shadow-xl space-y-5">
        
        {/* Row 1: Search & Single-Row Horizontal Location Track */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Keyword Search Input */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="w-4 h-4 text-[#A3968E] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by neighborhood, city, or feature..."
              className="w-full pl-11 pr-10 py-2.5 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 text-xs text-[#F5EBE6] placeholder-[#A3968E]/60 focus:outline-none focus:border-[#F5EBE6]/40 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3968E] hover:text-[#F5EBE6] p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Single-Row Horizontal Scrollable Location Chips */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap py-1 scroll-smooth">
              {cities.map(city => {
                const active = selectedCity.toLowerCase() === city.toLowerCase();
                return (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      updateSearchParam('destination', city);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      active
                        ? 'bg-[#F5EBE6] text-[#120E0C] font-semibold shadow-md'
                        : 'bg-[#28201C] text-[#A3968E] hover:text-[#F5EBE6] border border-[#F5EBE6]/10'
                    }`}
                  >
                    {city === 'all' ? 'All Global' : city}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2: Sliders & Specific Criteria */}
        <div className="pt-4 border-t border-[#F5EBE6]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          
          {/* Nightly Rate Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#A3968E] uppercase tracking-wider font-mono text-[10px]">Max Nightly Rate</span>
              <span className="font-mono text-[#F5EBE6] font-semibold">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="150"
              max="500"
              step="10"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-[#28201C] rounded-lg appearance-none cursor-pointer accent-[#F5EBE6]"
            />
          </div>

          {/* Bedrooms Selector */}
          <div>
            <span className="text-[#A3968E] uppercase tracking-wider font-mono text-[10px] block mb-2">Bedrooms</span>
            <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-[#28201C] border border-[#F5EBE6]/10 text-xs">
              {['all', '1', '2', '3+'].map(b => (
                <button
                  key={b}
                  onClick={() => setSelectedBedrooms(b)}
                  className={`py-1.5 rounded-lg text-center transition-colors font-medium cursor-pointer ${
                    selectedBedrooms === b ? 'bg-[#F5EBE6] text-[#120E0C]' : 'text-[#A3968E] hover:text-[#F5EBE6]'
                  }`}
                >
                  {b === 'all' ? 'Any' : b}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities Chips */}
          <div className="sm:col-span-2 flex items-center flex-wrap gap-2 pt-1">
            <button
              onClick={() => setFilterFiber(!filterFiber)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                filterFiber
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                  : 'bg-[#28201C] text-[#A3968E] border border-[#F5EBE6]/5 hover:text-[#F5EBE6]'
              }`}
            >
              <Wifi className="w-3 h-3" />
              <span>1Gbps Fiber Only</span>
            </button>

            <button
              onClick={() => setFilterWorkspace(!filterWorkspace)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                filterWorkspace
                  ? 'bg-[#F5EBE6] text-[#120E0C] font-semibold'
                  : 'bg-[#28201C] text-[#A3968E] border border-[#F5EBE6]/5 hover:text-[#F5EBE6]'
              }`}
            >
              <span>Workstation</span>
            </button>

            <button
              onClick={() => setFilterBalcony(!filterBalcony)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                filterBalcony
                  ? 'bg-[#F5EBE6] text-[#120E0C] font-semibold'
                  : 'bg-[#28201C] text-[#A3968E] border border-[#F5EBE6]/5 hover:text-[#F5EBE6]'
              }`}
            >
              <span>Terrace / Balcony</span>
            </button>

            <button
              onClick={() => setFilterPets(!filterPets)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                filterPets
                  ? 'bg-[#F5EBE6] text-[#120E0C] font-semibold'
                  : 'bg-[#28201C] text-[#A3968E] border border-[#F5EBE6]/5 hover:text-[#F5EBE6]'
              }`}
            >
              <span>Pet Friendly</span>
            </button>
          </div>
        </div>

      </div>

      {/* Result Metrics & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 text-xs text-[#A3968E]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#F5EBE6] font-semibold">
            {sortedProperties.length}
          </span>
          <span>{sortedProperties.length === 1 ? 'residence available' : 'residences available'} for your criteria</span>
          {sortedProperties.length < PROPERTIES.length && (
            <button
              onClick={resetFilters}
              className="ml-2 underline text-[#F5EBE6] hover:text-white cursor-pointer"
            >
              Reset All
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E]">Sort By:</span>
            <button
              type="button"
              onClick={() => setSortDropdownOpen(prev => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1613] border border-[#F5EBE6]/15 hover:border-[#F5EBE6]/40 text-xs text-[#F5EBE6] font-mono transition-all cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#A3968E]" />
              <span>{sortLabels[sortBy]}</span>
            </button>
          </div>

          {sortDropdownOpen && (
            <div 
              className="absolute right-0 top-full mt-2 w-64 bg-[#1C1613] border border-[#F5EBE6]/20 rounded-2xl p-1.5 shadow-2xl z-40 animate-fadeIn"
              onClick={() => setSortDropdownOpen(false)}
            >
              {(Object.keys(sortLabels) as SortOption[]).map(key => (
                <button
                  key={key}
                  onClick={() => {
                    setSortBy(key);
                    showToast({
                      title: 'Catalog Sorted',
                      message: `Residences sorted by ${sortLabels[key]}.`,
                      type: 'info',
                    });
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    sortBy === key
                      ? 'bg-[#F5EBE6] text-[#120E0C] font-semibold'
                      : 'text-[#F5EBE6]/80 hover:bg-[#28201C] hover:text-[#F5EBE6]'
                  }`}
                >
                  <span>{sortLabels[key]}</span>
                  {sortBy === key && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {sortedProperties.length === 0 && (
        <div className="bg-[#1C1613] border border-[#F5EBE6]/10 rounded-3xl p-12 text-center my-12">
          <SlidersHorizontal className="w-8 h-8 text-[#A3968E] mx-auto mb-3" />
          <h3 className="font-serif text-2xl text-[#F5EBE6]">No residences matched your criteria</h3>
          <p className="text-xs text-[#A3968E] mt-2 max-w-md mx-auto">
            Try broadening your budget slider, selecting 'All Global', or resetting the amenity toggles.
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 px-6 py-2.5 rounded-full bg-[#F5EBE6] text-[#120E0C] text-xs font-semibold hover:bg-white transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* ASYMMETRICAL RESIDENCES GRID                                 */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {sortedProperties.map((stay, idx) => {
          const images = stay.galleryImages.length > 0 ? stay.galleryImages : [stay.heroImage];
          const activeIndex = cardPhotoIndex[stay.id] || 0;
          const currentImg = images[activeIndex];
          const isOffset = idx % 2 === 1;

          return (
            <div
              key={stay.id}
              onClick={() => handleSelectResidence(stay)}
              className={`editorial-card group cursor-pointer rounded-[2rem] bg-[#1C1613] border border-[#F5EBE6]/10 hover:border-[#F5EBE6]/35 overflow-hidden flex flex-col justify-between transition-transform duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl ${
                isOffset ? 'lg:translate-y-4' : ''
              }`}
            >
              {/* Card Photo Stage with Reusable CuratedImage & Carousel controls */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-black border-b border-[#F5EBE6]/10">
                <CuratedImage
                  src={currentImg}
                  alt={stay.title}
                  className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  containerClassName="w-full h-full"
                  priority={idx < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1613] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                {/* Left & Right Mini Carousel Arrows */}
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

                {/* Top Location & Tier Tags */}
                <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                  <div className="px-3 py-1 rounded-full bg-[#120E0C]/80 backdrop-blur-md border border-[#F5EBE6]/15 text-[11px] font-mono text-[#F5EBE6] flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#A3968E]" />
                    <span>{stay.city}, {stay.country}</span>
                  </div>
                  {stay.tier && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[10px] font-mono text-amber-200">
                      {stay.tier}
                    </span>
                  )}
                </div>

                {/* Photo Pagination Dots */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
                    {images.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`h-1.5 rounded-full transition-all ${
                          dotIdx === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Nightly Rate Badge */}
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#120E0C]/95 backdrop-blur-md border border-[#F5EBE6]/20 shadow-lg text-xs font-semibold text-[#F5EBE6]">
                  <span>{formatPrice(stay.pricePerNightUSD)}</span>
                  <span className="font-normal text-[10px] text-[#A3968E] ml-1">/ night</span>
                </div>
              </div>

              {/* Text Card Metadata */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#A3968E] font-mono">
                      {stay.neighborhoodArea} · {stay.clusterName}
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
                      {stay.scaleSqFt.toLocaleString()} sq ft
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#28201C] border border-[#F5EBE6]/10">
                      {stay.bedrooms} {stay.bedrooms === 1 ? 'Bed' : 'Beds'}
                    </span>
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-[#28201C] border border-[#F5EBE6]/10">
                      Max {stay.maxGuests} Guests
                    </span>
                  </div>

                  <span className="text-[#F5EBE6] font-medium flex items-center gap-1 group-hover:translate-x-1.5 transition-transform text-xs">
                    Explore Details →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
