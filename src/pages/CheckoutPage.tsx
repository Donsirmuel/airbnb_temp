import React, { useState } from 'react';
import { 
  CaretRight as ChevronRight, ArrowLeft, ShieldCheck, CheckCircle as CheckCircle2, 
  CreditCard, Buildings as Building, Coins, Clock, Sparkle as Sparkles, User, 
  EnvelopeSimple as Mail, Phone, CalendarBlank as CalendarIcon, Users, Check, DownloadSimple as Download, Printer 
} from '@phosphor-icons/react';
import { useBooking, ADDON_PRICING_USD } from '../context/BookingContext';
import { PROPERTIES } from '../data/properties';
import { Property, BookingAddOns, BookingConfirmation } from '../types';
import { CuratedImage } from '../components/CuratedImage';

interface CheckoutPageProps {
  slug?: string;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ slug: propSlug }) => {
  const { 
    currentRoute, navigate, searchParams, guestInfo, updateGuestInfo, 
    bookingAddOns, toggleAddOn, formatPrice, calculateNights, 
    getPricingBreakdown, confirmedBooking, setConfirmedBooking,
    showToast
  } = useBooking();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<{ fullName?: string; email?: string; phone?: string }>({});

  const activeSlug = propSlug || currentRoute.replace('/book/', '').split('/')[0] || 'the-oakwood-loft-lagos';
  const property: Property = PROPERTIES.find(p => p.slug === activeSlug || p.id === activeSlug) || PROPERTIES[0];

  const pricing = getPricingBreakdown(property);

  const validateForm = () => {
    const errors: { fullName?: string; email?: string; phone?: string } = {};
    if (!guestInfo.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!guestInfo.email.trim() || !guestInfo.email.includes('@')) errors.email = 'Please enter a valid email address.';
    if (!guestInfo.phone.trim()) errors.phone = 'Please enter a phone number so we can text you arrival directions and your door code.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const el = document.getElementById('guest-form-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const ref = `NH-${Math.floor(1000 + Math.random() * 9000)}-${property.city.substring(0, 3).toUpperCase()}`;
      const confirmation: BookingConfirmation = {
        bookingRef: ref,
        property,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        nights: pricing.nights,
        guests: searchParams.guests,
        guestInfo: { ...guestInfo },
        addOns: { ...bookingAddOns },
        pricingBreakdown: { ...pricing },
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setConfirmedBooking(confirmation);
      setIsProcessing(false);
      showToast({
        title: 'Booking confirmed',
        message: `Your reference is ${ref}. We sent confirmation details and your VAT receipt to ${guestInfo.email}.`,
        type: 'success',
        duration: 6500,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const handleToggleAddOn = (key: keyof BookingAddOns) => {
    const willEnable = !bookingAddOns[key];
    toggleAddOn(key);
    showToast({
      title: willEnable ? 'Extra added' : 'Extra removed',
      message: `${ADDON_PRICING_USD[key].title} ${willEnable ? 'added to' : 'removed from'} your booking.`,
      type: 'info',
      duration: 3500,
    });
  };

  // If already confirmed, render the Confirmation Receipt view
  if (confirmedBooking && confirmedBooking.property.id === property.id) {
    return (
      <div className="w-full pt-28 pb-24 px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto">
        <div className="bg-[#1C1613] border border-[#F5EBE6]/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-6 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-emerald-400 block mb-2">
              Booking confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F5EBE6] font-normal">
              You are all set for {confirmedBooking.property.title}
            </h1>
            <p className="text-xs text-[#A3968E] mt-2">
              Booking reference: <strong className="font-mono text-[#F5EBE6]">{confirmedBooking.bookingRef}</strong>
            </p>
          </div>

          {/* Receipt Breakdown Box */}
          <div className="bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl p-6 mb-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#F5EBE6]/10 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#A3968E] block">Lead guest</span>
                <span className="font-medium text-[#F5EBE6]">{confirmedBooking.guestInfo.fullName}</span>
                <span className="text-[11px] text-[#A3968E] block">{confirmedBooking.guestInfo.email}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#A3968E] block">Dates</span>
                <span className="font-medium text-[#F5EBE6]">
                  {confirmedBooking.checkIn} — {confirmedBooking.checkOut} ({confirmedBooking.nights} nights)
                </span>
                <span className="text-[11px] text-[#A3968E] block">{confirmedBooking.guests} {confirmedBooking.guests === 1 ? 'Guest' : 'Guests'}</span>
              </div>
            </div>

            {/* Total Paid */}
            <div className="flex items-baseline justify-between pt-2">
              <div>
                <span className="text-xs text-[#A3968E]">Total paid ({confirmedBooking.pricingBreakdown.currency})</span>
                <span className="text-[10px] text-emerald-400 font-mono block">Paid via {guestInfo.paymentMethod.toUpperCase()}</span>
              </div>
              <span className="font-serif text-2xl sm:text-3xl text-[#F5EBE6] font-semibold font-mono">
                {formatPrice(confirmedBooking.pricingBreakdown.grandTotal)}
              </span>
            </div>
          </div>

          {/* Next Steps for Arrival */}
          <div className="p-6 rounded-2xl bg-[#120E0C] border border-[#F5EBE6]/10 mb-8 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#F5EBE6] flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>What happens next</span>
            </h4>
            <p className="text-xs text-[#A3968E] leading-relaxed">
              1. A copy of your booking confirmation and VAT invoice has been sent to <strong>{confirmedBooking.guestInfo.email}</strong>.
            </p>
            <p className="text-xs text-[#A3968E] leading-relaxed">
              2. Your 6-digit door code and detailed house directions will be sent 24 hours before your check-in time ({property.checkInTime}).
            </p>
            <p className="text-xs text-[#A3968E] leading-relaxed">
              3. If you have any questions before then, message our WhatsApp desk at <strong>+234 812 345 6789</strong>.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#28201C] hover:bg-[#F5EBE6]/15 border border-[#F5EBE6]/15 text-xs text-[#F5EBE6] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print receipt</span>
            </button>
            <button
              onClick={() => {
                setConfirmedBooking(null);
                navigate('/residences');
              }}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#F5EBE6] hover:bg-white text-[#120E0C] text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Browse other homes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-24 pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#A3968E] mb-6">
        <button onClick={() => navigate('/residences')} className="hover:text-[#F5EBE6] transition-colors">
          Residences
        </button>
        <ChevronRight className="w-3 h-3 text-[#A3968E]/60" />
        <button onClick={() => navigate(`/residences/${property.slug}`)} className="hover:text-[#F5EBE6] transition-colors">
          {property.title}
        </button>
        <ChevronRight className="w-3 h-3 text-[#A3968E]/60" />
        <span className="text-[#F5EBE6]">Checkout</span>
      </div>

      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Booking</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F5EBE6] font-normal">
          Confirm your reservation
        </h1>
      </div>

      {/* 2-Column Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left 7-Col: Guest Info, Add-ons, Payment */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* STEP 1: Guest Information */}
          <div id="guest-form-section" className="p-6 sm:p-8 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/15">
            <div className="flex items-center gap-3 pb-5 border-b border-[#F5EBE6]/10 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center font-mono text-xs text-[#F5EBE6]">
                1
              </span>
              <h3 className="font-serif text-xl text-[#F5EBE6] font-normal">Your details</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">
                  Full name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A3968E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={guestInfo.fullName}
                    onChange={e => updateGuestInfo('fullName', e.target.value)}
                    placeholder="e.g. Sterling Archer"
                    className="w-full bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-[#F5EBE6] focus:outline-none focus:border-[#F5EBE6]/30"
                  />
                </div>
                {formErrors.fullName && <p className="text-[11px] text-red-400 mt-1">{formErrors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">
                    Email address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A3968E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={guestInfo.email}
                      onChange={e => updateGuestInfo('email', e.target.value)}
                      placeholder="sterling@agency.com"
                      className="w-full bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-[#F5EBE6] focus:outline-none focus:border-[#F5EBE6]/30"
                    />
                  </div>
                  {formErrors.email && <p className="text-[11px] text-red-400 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">
                    Phone number (for your door code and directions) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#A3968E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={guestInfo.phone}
                      onChange={e => updateGuestInfo('phone', e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-[#F5EBE6] focus:outline-none focus:border-[#F5EBE6]/30"
                    />
                  </div>
                  {formErrors.phone && <p className="text-[11px] text-red-400 mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">
                    Estimated arrival time
                  </label>
                  <select
                    value={guestInfo.arrivalTime}
                    onChange={e => updateGuestInfo('arrivalTime', e.target.value)}
                    className="w-full bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl py-2.5 px-3 text-xs text-[#F5EBE6] focus:outline-none focus:border-[#F5EBE6]/30 cursor-pointer"
                  >
                    <option value="15:00" className="bg-[#1C1613]">3:00 PM (Standard check-in)</option>
                    <option value="16:00" className="bg-[#1C1613]">4:00 PM - 6:00 PM (Late afternoon)</option>
                    <option value="19:00" className="bg-[#1C1613]">7:00 PM - 9:00 PM (Evening)</option>
                    <option value="22:00" className="bg-[#1C1613]">10:00 PM or later (Keypad self check-in)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">
                    Flight or train number (optional)
                  </label>
                  <input
                    type="text"
                    value={guestInfo.flightNumber}
                    onChange={e => updateGuestInfo('flightNumber', e.target.value)}
                    placeholder="e.g. BA 075 or EK 783"
                    className="w-full bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl py-2.5 px-3 text-xs text-[#F5EBE6] focus:outline-none focus:border-[#F5EBE6]/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">
                  Special requests or notes (optional)
                </label>
                <textarea
                  rows={2}
                  value={guestInfo.specialRequests}
                  onChange={e => updateGuestInfo('specialRequests', e.target.value)}
                  placeholder="Tell us about bed preferences, arrival notes, or any questions..."
                  className="w-full bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl p-3 text-xs text-[#F5EBE6] focus:outline-none focus:border-[#F5EBE6]/30"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Bespoke Add-Ons Selection */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/15">
            <div className="flex items-center gap-3 pb-5 border-b border-[#F5EBE6]/10 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center font-mono text-xs text-[#F5EBE6]">
                2
              </span>
              <div>
                <h3 className="font-serif text-xl text-[#F5EBE6] font-normal">Optional extras</h3>
                <p className="text-[11px] text-[#A3968E]">Services you can add to your stay</p>
              </div>
            </div>

            <div className="space-y-3">
              {(Object.keys(ADDON_PRICING_USD) as Array<keyof BookingAddOns>).map(key => {
                const item = ADDON_PRICING_USD[key];
                const active = bookingAddOns[key];
                return (
                  <div
                    key={key}
                    onClick={() => handleToggleAddOn(key)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                      active
                        ? 'bg-[#28201C] border-[#F5EBE6] shadow-md'
                        : 'bg-[#1C1613] border-[#F5EBE6]/10 hover:border-[#F5EBE6]/25'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors ${
                          active ? 'bg-[#F5EBE6] border-[#F5EBE6]' : 'border-[#F5EBE6]/30 bg-[#28201C]'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-[#120E0C]" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#F5EBE6]">{item.title}</h4>
                        <p className="text-[11px] text-[#A3968E] mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-semibold text-[#F5EBE6]">
                        +{formatPrice(item.price)}
                      </span>
                      <span className="text-[10px] text-[#A3968E] block font-mono">
                        {item.type === 'per_night' ? '/ night' : '/ stay'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Payment Method Selection */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/15">
            <div className="flex items-center gap-3 pb-5 border-b border-[#F5EBE6]/10 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center font-mono text-xs text-[#F5EBE6]">
                3
              </span>
              <h3 className="font-serif text-xl text-[#F5EBE6] font-normal">Payment method</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                onClick={() => updateGuestInfo('paymentMethod', 'card')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  guestInfo.paymentMethod === 'card'
                    ? 'bg-[#28201C] border-[#F5EBE6] text-[#F5EBE6]'
                    : 'bg-[#1C1613] border-[#F5EBE6]/10 text-[#A3968E] hover:text-[#F5EBE6]'
                }`}
              >
                <CreditCard className="w-5 h-5 mb-2 text-[#F5EBE6]" />
                <span className="text-xs font-medium block">Card</span>
                <span className="text-[10px] opacity-75 font-mono">Visa, Mastercard, Verve</span>
              </button>

              <button
                type="button"
                onClick={() => updateGuestInfo('paymentMethod', 'transfer')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  guestInfo.paymentMethod === 'transfer'
                    ? 'bg-[#28201C] border-[#F5EBE6] text-[#F5EBE6]'
                    : 'bg-[#1C1613] border-[#F5EBE6]/10 text-[#A3968E] hover:text-[#F5EBE6]'
                }`}
              >
                <Building className="w-5 h-5 mb-2 text-[#F5EBE6]" />
                <span className="text-xs font-medium block">Bank transfer</span>
                <span className="text-[10px] opacity-75 font-mono">USD, EUR, GBP, NGN</span>
              </button>

              <button
                type="button"
                onClick={() => updateGuestInfo('paymentMethod', 'crypto')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  guestInfo.paymentMethod === 'crypto'
                    ? 'bg-[#28201C] border-[#F5EBE6] text-[#F5EBE6]'
                    : 'bg-[#1C1613] border-[#F5EBE6]/10 text-[#A3968E] hover:text-[#F5EBE6]'
                }`}
              >
                <Coins className="w-5 h-5 mb-2 text-[#F5EBE6]" />
                <span className="text-xs font-medium block">Crypto</span>
                <span className="text-[10px] opacity-75 font-mono">USDC / USDT</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/5 text-xs text-[#A3968E] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Payments are processed over an encrypted connection. Free cancellation up to 48 hours before check-in.
              </span>
            </div>
          </div>

        </div>

        {/* Right 5-Col: Live Booking Summary */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="bg-[#1C1613] border border-[#F5EBE6]/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            <span className="text-[10px] uppercase tracking-widest text-[#A3968E] font-mono block mb-4">
              Summary
            </span>

            {/* Selected Property Cardlet */}
            <div className="flex items-start gap-4 pb-6 border-b border-[#F5EBE6]/10">
              <CuratedImage
                src={property.heroImage}
                alt={property.title}
                containerClassName="w-20 h-20 rounded-2xl shrink-0 border border-[#F5EBE6]/10"
              />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  {property.city}, {property.country}
                </span>
                <h4 className="font-serif text-lg text-[#F5EBE6] font-medium leading-snug">
                  {property.title}
                </h4>
                <p className="text-[11px] text-[#A3968E] mt-0.5">
                  {property.scaleSqFt} sq ft · {property.bedrooms} Bed · Fiber Wi-Fi
                </p>
              </div>
            </div>

            {/* Stay Parameters */}
            <div className="py-4 border-b border-[#F5EBE6]/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#A3968E]">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>Dates</span>
                </span>
                <span className="font-mono text-[#F5EBE6]">
                  {searchParams.checkIn} → {searchParams.checkOut}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#A3968E]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Duration</span>
                </span>
                <span className="font-mono text-[#F5EBE6]">{pricing.nights} Nights</span>
              </div>

              <div className="flex items-center justify-between text-[#A3968E]">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Guests</span>
                </span>
                <span className="font-mono text-[#F5EBE6]">{searchParams.guests} {searchParams.guests === 1 ? 'Guest' : 'Guests'}</span>
              </div>
            </div>

            {/* Dynamic Cost Itemization */}
            <div className="py-4 border-b border-[#F5EBE6]/10 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-[#A3968E]">
                <span>{formatPrice(property.pricePerNightUSD)} × {pricing.nights} nights</span>
                <span className="font-mono text-[#F5EBE6]">{formatPrice(pricing.baseTotal)}</span>
              </div>

              <div className="flex items-center justify-between text-[#A3968E]">
                <span>Cleaning fee</span>
                <span className="font-mono text-[#F5EBE6]">{formatPrice(pricing.cleaningFee)}</span>
              </div>

              <div className="flex items-center justify-between text-[#A3968E]">
                <span>Service and support fee (8%)</span>
                <span className="font-mono text-[#F5EBE6]">{formatPrice(pricing.serviceFee)}</span>
              </div>

              {pricing.addOnsTotal > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span>Selected extras</span>
                  <span className="font-mono">+{formatPrice(pricing.addOnsTotal)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[#A3968E]">
                <span>Local taxes and fees</span>
                <span className="font-mono text-[#F5EBE6]">{formatPrice(pricing.taxes)}</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="pt-4 flex items-baseline justify-between mb-6">
              <div>
                <span className="text-xs text-[#A3968E] block">Total to pay</span>
                <span className="text-[10px] text-[#A3968E] font-mono">Currency: {pricing.currency}</span>
              </div>
              <span className="font-serif text-2xl sm:text-3xl text-[#F5EBE6] font-semibold font-mono">
                {formatPrice(pricing.grandTotal)}
              </span>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleConfirmReservation}
              disabled={isProcessing}
              className="w-full py-4 rounded-full bg-[#F5EBE6] hover:bg-white text-[#120E0C] text-xs font-semibold uppercase tracking-wider transition-all shadow-xl active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Confirming...</span>
              ) : (
                <>
                  <span>Confirm reservation</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-[#A3968E] text-center mt-3 font-light">
              Free cancellation up to 48 hours before check-in.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
