import React, { useState } from 'react';
import { 
  ShieldCheck, WifiHigh as Wifi, Key, SpeakerHigh as Volume2, Sparkle as Sparkles, Coffee, 
  ForkKnife as Utensils, Car, Check, ArrowRight, ChatCircleDots as MessageSquare, Bed, 
  ThermometerSimple as Thermometer, CheckCircle as CheckCircle2 
} from '@phosphor-icons/react';
import { useBooking } from '../context/BookingContext';

export const ExperiencePage: React.FC = () => {
  const { navigate, getWhatsAppConciergeUrl } = useBooking();
  const [activeAuditTab, setActiveAuditTab] = useState<'acoustics' | 'connectivity' | 'sleep' | 'climate' | 'culinary'>('acoustics');

  const auditData = {
    acoustics: {
      title: 'Acoustic STC Isolation & Quietness',
      desc: 'We measure background ambient decibels with professional meters to ensure quiet interior zones below 38 dB during nocturnal hours.',
      checks: [
        'Acoustic double-glazed windows and thermal break frames',
        'Sound-isolated partition walls separating master suites',
        'Vibration-dampened HVAC and air distribution ducts',
        'Solid-core interior doors with acoustic drop seals',
      ],
    },
    connectivity: {
      title: 'Enterprise Gigabit Fiber Benchmarking',
      desc: 'No shared residential modems. Every apartment boasts an independent, business-grade dedicated fiber line.',
      checks: [
        'Unthrottled download speeds verified ≥ 1,000 Mbps',
        'Consistent upload speed verified ≥ 500 Mbps for video streaming',
        'Sub-8ms latency and zero packet loss to transatlantic gateways',
        'Dual-band Mesh 6E access points eliminating interior dead spots',
      ],
    },
    sleep: {
      title: 'Sleep Architecture & Restorative Rest',
      desc: 'Rest is the foundational luxury of travel. We invest in medical-grade support and organic natural fibers.',
      checks: [
        'Custom multi-layer natural latex and pocket-coil mattresses',
        '400+ thread count Egyptian and Belgian long-staple linens',
        'Dual-density pillow menu (down-alternative & memory foam)',
        '100% blackout drapery and acoustic side-channel tracks',
      ],
    },
    climate: {
      title: 'Climate Stability & Water Hydrotherapy',
      desc: 'Independent multi-zone climate conditioning and high-flow rainwater shower pressure.',
      checks: [
        'Multi-split whisper-quiet Inverter air conditioning',
        'High-flow thermostatic thermoresistant shower fixtures',
        'Continuous high-capacity hot water recirculation systems',
        'HEPA fine particulate air filtration and indoor humidity balancing',
      ],
    },
    culinary: {
      title: 'Artisan Kitchen & Craft Coffee Provisioning',
      desc: 'Fully outfitted chef kitchens designed for genuine home cooking and single-origin coffee rituals.',
      checks: [
        'Japanese ceramic Santoku knives and cast-iron cookware',
        'Chemex pour-over, electric gooseneck kettle & burr grinder',
        'Single-origin roasted whole beans sourced from neighborhood roasters',
        'Sub-Zero / Bosch dishwashers and induction cooktops',
      ],
    },
  };

  return (
    <div className="w-full pt-32 pb-32 sm:pb-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Page Title & Vision */}
      <div className="mb-16 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Hospitality Standards</span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5EBE6] font-normal leading-tight">
          Crafted for quiet living, seamless work, and genuine peace.
        </h1>
        <p className="text-sm sm:text-base text-[#A3968E] mt-4 font-light leading-relaxed">
          Near Home rejects the lottery of conventional vacation rentals. We curate an uncompromising standard of acoustics, high-speed fiber, and residential hospitality for discerning international travelers.
        </p>
      </div>

      {/* ============================================================ */}
      {/* THE 4 PILLARS                                               */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {/* Pillar 1 */}
        <div className="bg-[#1C1613] border border-[#F5EBE6]/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] mb-6">
              <Volume2 className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-2">Pillar I</span>
            <h3 className="font-serif text-2xl text-[#F5EBE6] font-normal">Acoustic Isolation</h3>
            <p className="text-xs text-[#A3968E] mt-3 leading-relaxed font-light">
              We understand that true luxury in bustling cities like Lagos, New York, or London is quietness. All residences feature double-glazed fenestration, decoupled ceilings, and strict evening residential policies.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#F5EBE6]/10 flex items-center gap-2 text-xs font-mono text-amber-200">
            <span>STC 50+ Certified</span>
            <span>·</span>
            <span>Sub-38 dB Sleep Baseline</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-[#1C1613] border border-[#F5EBE6]/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] mb-6">
              <Wifi className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-2">Pillar II</span>
            <h3 className="font-serif text-2xl text-[#F5EBE6] font-normal">Enterprise Fiber & Ergonomics</h3>
            <p className="text-xs text-[#A3968E] mt-3 leading-relaxed font-light">
              Built from the ground up for founders, remote executives, and creators. We verify symmetrical gigabit fiber speeds before check-in and equip every suite with Herman Miller Aeron or Mirra seating.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#F5EBE6]/10 flex items-center gap-2 text-xs font-mono text-emerald-300">
            <span>1,000 Mbps Symmetrical</span>
            <span>·</span>
            <span>Zero-Jitter Video Calls</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-[#1C1613] border border-[#F5EBE6]/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] mb-6">
              <Key className="w-6 h-6 text-[#F5EBE6]" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-2">Pillar III</span>
            <h3 className="font-serif text-2xl text-[#F5EBE6] font-normal">Frictionless Keyless Arrival</h3>
            <p className="text-xs text-[#A3968E] mt-3 leading-relaxed font-light">
              No coordinating awkward keys in airport taxis or waiting on building concierges. You receive an encrypted time-sensitive keypad code 24 hours prior to check-in, allowing seamless self-arrival 24/7.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#F5EBE6]/10 flex items-center gap-2 text-xs font-mono text-[#A3968E]">
            <span>256-Bit Encrypted Lock</span>
            <span>·</span>
            <span>Self Check-in Any Hour</span>
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="bg-[#1C1613] border border-[#F5EBE6]/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] mb-6">
              <Sparkles className="w-6 h-6 text-purple-300" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-2">Pillar IV</span>
            <h3 className="font-serif text-2xl text-[#F5EBE6] font-normal">Dedicated WhatsApp Concierge</h3>
            <p className="text-xs text-[#A3968E] mt-3 leading-relaxed font-light">
              A private, responsive residential concierge at your fingertips. From arranging an airport Mercedes transfer to procuring an in-suite private chef or stocking specialized pantry items.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#F5EBE6]/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span>Average 4-Min Response</span>
            <span>·</span>
            <span>24/7 Active Line</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 50-POINT PHYSICAL AUDIT BREAKDOWN                           */}
      {/* ============================================================ */}
      <section className="bg-[#1C1613] border border-[#F5EBE6]/15 rounded-3xl p-8 sm:p-12 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Quality Assurance</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5EBE6] font-normal">
            The 50-Point Physical Verification Audit
          </h2>
          <p className="text-xs text-[#A3968E] mt-3">
            Every property is audited in-person quarterly by our architectural standards team.
          </p>
        </div>

        {/* Audit Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'acoustics', label: 'Acoustics & Sound' },
            { id: 'connectivity', label: 'Fiber & WiFi' },
            { id: 'sleep', label: 'Sleep & Mattresses' },
            { id: 'climate', label: 'Climate & Showers' },
            { id: 'culinary', label: 'Chef Kitchen & Coffee' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveAuditTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                activeAuditTab === tab.id
                  ? 'bg-[#F5EBE6] text-[#120E0C] font-semibold shadow-md'
                  : 'bg-[#28201C] text-[#A3968E] hover:text-[#F5EBE6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Detail Stage */}
        <div className="bg-[#28201C] border border-[#F5EBE6]/10 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
          <h4 className="font-serif text-xl sm:text-2xl text-[#F5EBE6] font-normal mb-2">
            {auditData[activeAuditTab].title}
          </h4>
          <p className="text-xs text-[#A3968E] leading-relaxed mb-6 font-light">
            {auditData[activeAuditTab].desc}
          </p>

          <div className="space-y-3">
            {auditData[activeAuditTab].checks.map((c, i) => (
              <div key={i} className="flex items-start gap-3 text-xs text-[#F5EBE6]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONCIERGE ADD-ON MENU SPREAD                                */}
      {/* ============================================================ */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#F5EBE6]/10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">On-Demand Hospitality</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5EBE6] font-normal">
              Bespoke In-Stay Services
            </h2>
          </div>
          <a
            href={getWhatsAppConciergeUrl('Hello Near Home concierge, I would like to inquire about customized in-stay services.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1613] border border-[#F5EBE6]/20 text-xs text-[#F5EBE6] hover:bg-[#F5EBE6] hover:text-[#120E0C] transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Consult Concierge</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10">
            <Car className="w-6 h-6 text-[#F5EBE6] mb-4" />
            <h4 className="font-serif text-lg text-[#F5EBE6]">Private Airport Chauffeur</h4>
            <p className="text-xs text-[#A3968E] mt-2 leading-relaxed">
              Executive Mercedes E-Class or V-Class transfer directly from tarmac baggage claim to residence doors.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10">
            <Utensils className="w-6 h-6 text-[#F5EBE6] mb-4" />
            <h4 className="font-serif text-lg text-[#F5EBE6]">Private Chef Residency</h4>
            <p className="text-xs text-[#A3968E] mt-2 leading-relaxed">
              Private culinary masters preparing bespoke dinners, regional tasting menus, and customized dietary meal plans.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10">
            <Coffee className="w-6 h-6 text-[#F5EBE6] mb-4" />
            <h4 className="font-serif text-lg text-[#F5EBE6]">Artisan Pantry Provisioning</h4>
            <p className="text-xs text-[#A3968E] mt-2 leading-relaxed">
              Warm sourdough, organic milk, single-origin roasts, and chilled biodynamic wines waiting inside upon arrival.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EBE6]">Ready to experience Near Home?</h3>
          <p className="text-xs text-[#A3968E] mt-1">Explore our residences catalog or reserve directly with zero hidden markups.</p>
        </div>
        <button
          onClick={() => navigate('/residences')}
          className="px-8 py-3.5 rounded-full bg-[#F5EBE6] hover:bg-white text-[#120E0C] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
        >
          View Available Residences
        </button>
      </div>
    </div>
  );
};
