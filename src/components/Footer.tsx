import React from 'react';
import { ChatCircleDots, ShieldCheck, WifiHigh, Key } from '@phosphor-icons/react';
import { useBooking } from '../context/BookingContext';
import { Currency } from '../types';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { navigate, currency, setCurrency, currencyList, getWhatsAppConciergeUrl } = useBooking();

  return (
    <footer className="w-full bg-[#120E0C] border-t border-[#F5EBE6]/10 text-[#A3968E] pt-16 pb-12 px-6 sm:px-12 lg:px-20 mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-14 border-b border-[#F5EBE6]/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#1C1613] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] shrink-0">
              <Key className="w-5 h-5 text-[#F5EBE6]" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-[#F5EBE6] font-medium">Non-Shared Residences</h4>
              <p className="text-xs text-[#A3968E] mt-1 leading-relaxed">
                100% private entrance, dedicated living space, and no host or guest cohabitation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#1C1613] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] shrink-0">
              <WifiHigh className="w-5 h-5 text-[#F5EBE6]" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-[#F5EBE6] font-medium">Verified 1Gbps Fiber</h4>
              <p className="text-xs text-[#A3968E] mt-1 leading-relaxed">
                Benchmark tested and speed-verified prior to every check-in for uninterrupted remote work.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#1C1613] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#F5EBE6]" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-[#F5EBE6] font-medium">50-Point Physical Audit</h4>
              <p className="text-xs text-[#A3968E] mt-1 leading-relaxed">
                Soundproof STC ratings, water pressure, climate stability, and hygiene verified in person.
              </p>
            </div>
          </div>
        </div>

        {/* Main Sitemap Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-[#F5EBE6]/10">
          
          {/* Column 1: Brand & WhatsApp Concierge */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <BrandLogo size="lg" />
              <p className="text-xs text-[#A3968E] mt-4 max-w-sm leading-relaxed">
                A boutique collection of design-forward residences crafted for deep focus, restorative rest, and authentic urban living across global creative capitals.
              </p>
            </div>

            <div className="mt-8">
              <span className="text-[10px] uppercase tracking-widest text-[#A3968E] block font-mono mb-2">Direct Concierge Hotline</span>
              <a
                href={getWhatsAppConciergeUrl('Hello Near Home team, I need assistance with a reservation inquiry.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1C1613] border border-[#F5EBE6]/15 hover:border-[#F5EBE6]/40 text-xs text-[#F5EBE6] transition-all group"
              >
                <ChatCircleDots className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp: +234 812 345 6789</span>
                <span className="text-[10px] text-emerald-400 font-mono ml-1">● Active</span>
              </a>
            </div>
          </div>

          {/* Column 2: Flagship Stays */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#F5EBE6] mb-4">Residences</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/residences')} className="hover:text-[#F5EBE6] transition-colors">
                  All Global Residences
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/residences/the-oakwood-loft-lagos')} className="hover:text-[#F5EBE6] transition-colors">
                  Ikoyi, Lagos
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/residences/the-mews-library-london')} className="hover:text-[#F5EBE6] transition-colors">
                  Kensington, London
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/residences/the-cast-iron-brownstone-new-york')} className="hover:text-[#F5EBE6] transition-colors">
                  Brooklyn Heights, NY
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/residences/the-hinoki-pavilion-kyoto')} className="hover:text-[#F5EBE6] transition-colors">
                  Higashiyama, Kyoto
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/residences/the-desert-modernist-penthouse-dubai')} className="hover:text-[#F5EBE6] transition-colors">
                  Downtown Dubai
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Experiences */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#F5EBE6] mb-4">Hospitality</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/experience')} className="hover:text-[#F5EBE6] transition-colors">
                  Keyless Smart Arrival
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/experience')} className="hover:text-[#F5EBE6] transition-colors">
                  Ergonomic Workstations
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/experience')} className="hover:text-[#F5EBE6] transition-colors">
                  Private Chef & Dining
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/experience')} className="hover:text-[#F5EBE6] transition-colors">
                  Chauffeur Transfers
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/support')} className="hover:text-[#F5EBE6] transition-colors">
                  Long-Term Stays (30+ Days)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Currency */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#F5EBE6] mb-4">Client Support</h5>
            <ul className="space-y-2.5 text-xs mb-6">
              <li>
                <button onClick={() => navigate('/support')} className="hover:text-[#F5EBE6] transition-colors">
                  Inquiries & Contact
                </button>
              </li>
              <li>
                <a href="mailto:concierge@nearhome.luxury" className="hover:text-[#F5EBE6] transition-colors">
                  concierge@nearhome.luxury
                </a>
              </li>
              <li>
                <span className="text-stone-400">Emergency Host: +234 1 800 9900</span>
              </li>
            </ul>

            <span className="text-[10px] uppercase tracking-widest text-[#A3968E] block font-mono mb-2">Display Currency</span>
            <div className="flex flex-wrap gap-1.5">
              {currencyList.map(c => (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c.code as Currency)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                    currency === c.code
                      ? 'bg-[#F5EBE6] text-[#120E0C] font-semibold'
                      : 'bg-[#1C1613] text-[#A3968E] hover:text-[#F5EBE6] border border-[#F5EBE6]/10'
                  }`}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Legal & Guarantee */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A3968E]/80">
          <p>© {new Date().getFullYear()} Near Home Residences Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/experience')} className="hover:text-[#F5EBE6] transition-colors">
              Verification Standards
            </button>
            <button onClick={() => navigate('/support')} className="hover:text-[#F5EBE6] transition-colors">
              Privacy & Cookies
            </button>
            <button onClick={() => navigate('/support')} className="hover:text-[#F5EBE6] transition-colors">
              Booking Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
