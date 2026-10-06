import React, { useState } from 'react';
import { 
  ShieldCheck, WifiHigh as Wifi, Key, SpeakerHigh as Volume2, Sparkle as Sparkles, Coffee, 
  ForkKnife as Utensils, Car, Check, ArrowRight, ChatCircleDots as MessageSquare, Bed, 
  ThermometerSimple as Thermometer, CheckCircle as CheckCircle2, Lightning 
} from '@phosphor-icons/react';
import { useBooking } from '../context/BookingContext';

export const ExperiencePage: React.FC = () => {
  const { navigate, getWhatsAppConciergeUrl } = useBooking();
  const [activeAuditTab, setActiveAuditTab] = useState<'acoustics' | 'connectivity' | 'sleep' | 'climate' | 'culinary'>('acoustics');

  const auditData = {
    acoustics: {
      title: 'Sound and quietness',
      desc: 'We check the room with the windows open and closed to make sure you won\'t be kept awake at night or interrupted during calls.',
      checks: [
        'Double-glazed windows that latch firmly to block street traffic',
        'Solid wood bedroom doors with perimeter bottom seals',
        'Quiet air conditioners that do not rattle or hum loudly',
        'Bedrooms positioned away from lift shafts and noisy stairwells',
      ],
    },
    connectivity: {
      title: 'Fiber internet and Wi-Fi',
      desc: 'Every home has its own dedicated fiber line. We test upload and download speeds and confirm the Wi-Fi reaches every room.',
      checks: [
        'Speed-tested connection that handles multiple simultaneous video calls',
        'High upload speeds for screen sharing and transferring large files',
        'Wi-Fi routers placed so there are no weak signals in the bedroom or workspace',
        'Router connected to battery backup in cities with electrical grid cuts',
      ],
    },
    sleep: {
      title: 'Beds and curtains',
      desc: 'A bad mattress ruins a trip. We check mattress firmness, pillows, and whether the curtains actually block morning light.',
      checks: [
        'Supportive hybrid or pocket-coil mattresses in every bedroom',
        'Washed cotton sheets and fresh duvet covers',
        'A choice of firm and soft pillows',
        'Blackout curtains or window blinds that block morning sunlight',
      ],
    },
    climate: {
      title: 'Showers, water, and cooling',
      desc: 'We test water pressure, temperature consistency, and air conditioning units in person before listing.',
      checks: [
        'Strong water pressure with consistent, reliable hot water',
        'Independent air conditioning units in each bedroom and the living room',
        'Clean air filters inspected before arrival',
        'Backup water storage tanks in buildings where municipal water is intermittent',
      ],
    },
    culinary: {
      title: 'Kitchen and cooking essentials',
      desc: 'Practical cooking tools so you can make proper meals, not just microwave takeout containers.',
      checks: [
        'Sharp kitchen knives, cutting boards, and stainless or cast-iron pans',
        'Coffee maker, electric kettle, and mugs',
        'Full-size refrigerator and freezer with clean shelves',
        'Dishwasher or dish drying rack with dish soap and fresh sponges',
      ],
    },
  };

  return (
    <div className="w-full pt-32 pb-32 sm:pb-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Page Title & Vision */}
      <div className="mb-16 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Our standards</span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5EBE6] font-normal leading-tight">
          What we check before you arrive.
        </h1>
        <p className="text-sm sm:text-base text-[#A3968E] mt-4 font-light leading-relaxed">
          We focus on the things that usually cause headaches in short-term rentals: street noise, weak Wi-Fi, confusing key handoffs, and unexpected power cuts.
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
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-2">Sound</span>
            <h3 className="font-serif text-2xl text-[#F5EBE6] font-normal">Acoustic insulation and quiet rooms</h3>
            <p className="text-xs text-[#A3968E] mt-3 leading-relaxed font-light">
              We check background noise levels in each apartment. Windows are double-glazed (two layers of glass separated by an air pocket that dampens sound), doors are solid timber with bottom seals, and bedrooms are set away from busy streets.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#F5EBE6]/10 flex items-center gap-2 text-xs font-mono text-amber-200">
            <span>Double-glazed windows</span>
            <span>·</span>
            <span>Solid-core doors</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-[#1C1613] border border-[#F5EBE6]/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] mb-6">
              <Wifi className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-2">Work</span>
            <h3 className="font-serif text-2xl text-[#F5EBE6] font-normal">Tested fiber internet and desks</h3>
            <p className="text-xs text-[#A3968E] mt-3 leading-relaxed font-light">
              Every home has its own dedicated fiber line, not a shared building router. We test speeds before you check in. Workspaces include a real desk and an adjustable office chair you can sit in all day without back pain.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#F5EBE6]/10 flex items-center gap-2 text-xs font-mono text-emerald-300">
            <span>High-speed fiber</span>
            <span>·</span>
            <span>Ergonomic office seating</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-[#1C1613] border border-[#F5EBE6]/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] mb-6">
              <Key className="w-6 h-6 text-[#F5EBE6]" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-2">Arrival</span>
            <h3 className="font-serif text-2xl text-[#F5EBE6] font-normal">Keyless digital door codes</h3>
            <p className="text-xs text-[#A3968E] mt-3 leading-relaxed font-light">
              We send your 6-digit door code and arrival instructions 24 hours before you arrive. Whether your plane lands in the middle of the afternoon or at 2:00 AM, you can let yourself in without waiting on anyone.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#F5EBE6]/10 flex items-center gap-2 text-xs font-mono text-[#A3968E]">
            <span>Keypad smart lock</span>
            <span>·</span>
            <span>Self check-in anytime after 3:00 PM</span>
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="bg-[#1C1613] border border-[#F5EBE6]/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] mb-6">
              <ShieldCheck className="w-6 h-6 text-purple-300" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3968E] block mb-2">Reliability</span>
            <h3 className="font-serif text-2xl text-[#F5EBE6] font-normal">Inverters and solar power backup</h3>
            <p className="text-xs text-[#A3968E] mt-3 leading-relaxed font-light">
              In cities where the local electrical grid cuts out (such as Lagos and Abuja), our buildings run automatic inverters and solar battery banks. Your lights, laptops, and Wi-Fi stay on even when the street power drops.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#F5EBE6]/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span>Automatic battery switchover</span>
            <span>·</span>
            <span>Uninterrupted Wi-Fi</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PHYSICAL VERIFICATION AUDIT BREAKDOWN                        */}
      {/* ============================================================ */}
      <section className="bg-[#1C1613] border border-[#F5EBE6]/15 rounded-3xl p-8 sm:p-12 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">In-person checks</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5EBE6] font-normal">
            What we inspect before listing a home
          </h2>
          <p className="text-xs text-[#A3968E] mt-3">
            Our team visits every apartment in person to test each of these items before welcoming guests.
          </p>
        </div>

        {/* Audit Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'acoustics', label: 'Sound & quiet' },
            { id: 'connectivity', label: 'Fiber & Wi-Fi' },
            { id: 'sleep', label: 'Beds & curtains' },
            { id: 'climate', label: 'Showers & air conditioning' },
            { id: 'culinary', label: 'Kitchen & coffee' },
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
      {/* EXTRA IN-STAY SERVICES SPREAD                               */}
      {/* ============================================================ */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#F5EBE6]/10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#A3968E] block mb-2">Optional extras</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5EBE6] font-normal">
              Services you can add to your stay
            </h2>
          </div>
          <a
            href={getWhatsAppConciergeUrl('Hello Near Home team, I would like to ask about extra services for an upcoming stay.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1613] border border-[#F5EBE6]/20 text-xs text-[#F5EBE6] hover:bg-[#F5EBE6] hover:text-[#120E0C] transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Message our team</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10">
            <Car className="w-6 h-6 text-[#F5EBE6] mb-4" />
            <h4 className="font-serif text-lg text-[#F5EBE6]">Airport pickup ($65)</h4>
            <p className="text-xs text-[#A3968E] mt-2 leading-relaxed">
              A driver meets you outside arrivals with your name on a card and drives you directly to the apartment.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10">
            <Utensils className="w-6 h-6 text-[#F5EBE6] mb-4" />
            <h4 className="font-serif text-lg text-[#F5EBE6]">Cooked dinner on arrival ($180)</h4>
            <p className="text-xs text-[#A3968E] mt-2 leading-relaxed">
              A local cook prepares a fresh, hot dinner in your kitchen on your first evening so you don't have to order takeout after traveling.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/10">
            <Coffee className="w-6 h-6 text-[#F5EBE6] mb-4" />
            <h4 className="font-serif text-lg text-[#F5EBE6]">Groceries on arrival ($55)</h4>
            <p className="text-xs text-[#A3968E] mt-2 leading-relaxed">
              Fresh bread, milk, eggs, fruit, and ground coffee stocked in your kitchen before you unlock the door.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#1C1613] border border-[#F5EBE6]/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EBE6]">Ready to find a stay?</h3>
          <p className="text-xs text-[#A3968E] mt-1">Browse our homes in ten cities with transparent nightly rates and flexible cancellation.</p>
        </div>
        <button
          onClick={() => navigate('/residences')}
          className="px-8 py-3.5 rounded-full bg-[#F5EBE6] hover:bg-white text-[#120E0C] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
        >
          Browse homes
        </button>
      </div>
    </div>
  );
};
