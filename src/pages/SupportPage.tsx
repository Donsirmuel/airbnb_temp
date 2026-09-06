import React, { useState } from 'react';
import { 
  ChatCircleDots as MessageSquare, EnvelopeSimple as Mail, Phone, Clock, CaretDown as ChevronDown, 
  CaretUp as ChevronUp, PaperPlaneRight as Send, CheckCircle as CheckCircle2, ShieldCheck, Question as HelpCircle, Buildings as Building 
} from '@phosphor-icons/react';
import { useBooking } from '../context/BookingContext';

export const SupportPage: React.FC = () => {
  const { getWhatsAppConciergeUrl } = useBooking();

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    category: 'booking',
    message: '',
  });

  const faqs = [
    {
      q: 'How does keyless arrival work if my flight lands late at night?',
      a: 'All Near Home residences operate with military-grade 256-bit encrypted keyless digital locks. Exactly 24 hours prior to your scheduled check-in time, our system generates and emails your unique, time-activated PIN code. It remains active throughout your stay and expires automatically upon checkout. You can arrive at 3:00 PM or 3:00 AM without coordinating with anyone.',
    },
    {
      q: 'What is the Near Home 1Gbps Fiber Guarantee?',
      a: 'Before any guest crosses the threshold, our field team performs a physical speed and latency test. We guarantee symmetrical speeds of at least 1,000 Mbps with sub-8ms jitter. Furthermore, all flagship residences in emerging infrastructure hubs (such as Lagos and Abuja) feature uninterrupted automatic inverter/solar power systems with dual-redundant fiber feeds.',
    },
    {
      q: 'What is your cancellation and date modification policy?',
      a: 'We understand schedules change. Direct reservations can be modified or fully refunded up to 48 hours before scheduled check-in. For extended stays (14+ nights), cancellations require 7 days advance notice for a 100% refund.',
    },
    {
      q: 'Can I book extended residencies (30+ days) or corporate stays?',
      a: 'Yes. We offer preferred corporate tariffs and tailored monthly residency agreements. These include weekly linen turnover, VAT billing receipts for corporate tax reconciliation, and flexible extension options. Reach out via the Corporate Inquiry tab below.',
    },
    {
      q: 'Are pets permitted inside the residences?',
      a: 'Select residences in London, Brooklyn, and Cape Town are pet-friendly for well-trained companions with advance notice. An additional pet sanitization fee of $50 per stay applies to ensure subsequent allergy-sensitive guests experience pristine air quality.',
    },
    {
      q: 'What happens in the event of an in-stay maintenance need?',
      a: 'Our residential duty manager is stationed within a 20-minute perimeter of each residence cluster. If an appliance, water filter, or HVAC unit requires attention, an authorized technician is dispatched with an average resolution time under 45 minutes.',
    },
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) return;

    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryForm({ name: '', email: '', category: 'booking', message: '' });
    }, 4000);
  };

  return (
    <div className="w-full pt-32 pb-32 sm:pb-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="mb-14 max-w-2xl">
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Concierge & Assistance</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F5EBE6] font-normal">
          Client Support & Inquiries
        </h1>
        <p className="text-sm text-[#A3968E] mt-3 font-light leading-relaxed">
          Direct human communication without chatbot queues. Reach our residential liaison team 24 hours a day, 7 days a week.
        </p>
      </div>

      {/* ============================================================ */}
      {/* 4 DIRECT CONTACT TILES                                       */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        
        {/* Tile 1: WhatsApp */}
        <div className="p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">Instant Messaging</span>
            <h4 className="font-serif text-lg text-[#F5EBE6]">WhatsApp Concierge</h4>
            <p className="text-xs text-[#A3968E] mt-2 leading-relaxed">
              Fastest response channel for check-in requests, transfers, or dining reservations.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#F5EBE6]/10">
            <a
              href={getWhatsAppConciergeUrl('Hello Concierge, I would like direct support regarding Near Home.')}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1.5"
            >
              <span>+234 812 345 6789</span>
              <span className="text-[10px] font-mono">● Active</span>
            </a>
          </div>
        </div>

        {/* Tile 2: Email */}
        <div className="p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-[#F5EBE6]" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">Direct Correspondence</span>
            <h4 className="font-serif text-lg text-[#F5EBE6]">Concierge Email</h4>
            <p className="text-xs text-[#A3968E] mt-2 leading-relaxed">
              Invoices, receipts, special leases, or custom guest requirements.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#F5EBE6]/10">
            <a
              href="mailto:concierge@nearhome.luxury"
              className="text-xs font-semibold text-[#F5EBE6] hover:underline"
            >
              concierge@nearhome.luxury
            </a>
          </div>
        </div>

        {/* Tile 3: Emergency Line */}
        <div className="p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-amber-300" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">In-Stay Duty Host</span>
            <h4 className="font-serif text-lg text-[#F5EBE6]">24/7 Emergency Line</h4>
            <p className="text-xs text-[#A3968E] mt-2 leading-relaxed">
              Guaranteed 15-minute physical response for in-house emergency support.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#F5EBE6]/10">
            <span className="text-xs font-mono text-[#F5EBE6] font-semibold">+234 1 800 9900</span>
          </div>
        </div>

        {/* Tile 4: Corporate Residency */}
        <div className="p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center mb-4">
              <Building className="w-5 h-5 text-purple-300" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">Corporate Stays</span>
            <h4 className="font-serif text-lg text-[#F5EBE6]">Long-Stay Tariffs</h4>
            <p className="text-xs text-[#A3968E] mt-2 leading-relaxed">
              Tailored agreements and tax-deductible invoicing for corporate relocation.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#F5EBE6]/10">
            <span className="text-xs font-mono text-purple-300 font-medium">30+ Days · -20% Tariff</span>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 2-COLUMN: INQUIRY SUBMISSION FORM & FAQ ACCORDION            */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left 6-Col: Direct Inquiry Form */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/15">
          <span className="text-[10px] uppercase tracking-widest text-[#A3968E] font-mono block mb-2">Message Us</span>
          <h3 className="font-serif text-2xl text-[#F5EBE6] font-normal mb-6">Send an Inquiry</h3>

          {inquirySubmitted ? (
            <div className="p-6 rounded-2xl bg-[#28201C] border border-emerald-500/30 text-center animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <h4 className="font-serif text-xl text-[#F5EBE6]">Inquiry Received</h4>
              <p className="text-xs text-[#A3968E] mt-2">
                Thank you for reaching out. A client liaison will respond to your correspondence within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={inquiryForm.category}
                  onChange={e => setInquiryForm({ ...inquiryForm, category: e.target.value })}
                  className="w-full bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl py-2.5 px-3.5 text-xs text-[#F5EBE6] focus:outline-none focus:border-[#F5EBE6]/30 cursor-pointer"
                >
                  <option value="booking" className="bg-[#1C1613]">Reservation & Dates Question</option>
                  <option value="extended" className="bg-[#1C1613]">Extended Stay / Corporate Residency (30+ Nights)</option>
                  <option value="concierge" className="bg-[#1C1613]">Custom Concierge / Chef / Chauffeur Service</option>
                  <option value="partner" className="bg-[#1C1613]">Property Partnership / Architectural Auditing</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    placeholder="Marcus Chen"
                    className="w-full bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl py-2.5 px-3.5 text-xs text-[#F5EBE6] focus:outline-none focus:border-[#F5EBE6]/30"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    placeholder="marcus@domain.com"
                    className="w-full bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl py-2.5 px-3.5 text-xs text-[#F5EBE6] focus:outline-none focus:border-[#F5EBE6]/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={inquiryForm.message}
                  onChange={e => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  placeholder="Provide your travel dates, residence of interest, or specific questions..."
                  className="w-full bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl p-3.5 text-xs text-[#F5EBE6] focus:outline-none focus:border-[#F5EBE6]/30"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#F5EBE6] hover:bg-white text-[#120E0C] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right 6-Col: Interactive FAQ Accordion */}
        <div className="lg:col-span-6 flex flex-col gap-y-4">
          <div className="mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#A3968E] font-mono block mb-1">Clarifications</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EBE6] font-normal">Frequently Answered</h3>
          </div>

          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#1C1613] border border-[#F5EBE6]/10 hover:border-[#F5EBE6]/20 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-medium text-[#F5EBE6] hover:text-white transition-colors cursor-pointer"
                >
                  <span className="leading-snug pr-2 font-serif">{faq.q}</span>
                  <span className="p-1 rounded-full bg-[#28201C] text-[#A3968E] shrink-0 border border-[#F5EBE6]/5">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-3 border-t border-[#F5EBE6]/10 text-xs sm:text-sm text-[#D6CBC5] leading-relaxed font-light">
                    <p className="mt-0.5">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
