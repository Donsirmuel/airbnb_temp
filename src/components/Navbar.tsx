import React, { useState } from 'react';
import { List, X, CaretDown, Globe } from '@phosphor-icons/react';
import { useBooking, CURRENCY_MAP } from '../context/BookingContext';
import { Currency } from '../types';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, currency, setCurrency, currencyList } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Residences', path: '/residences' },
    { label: 'Standards', path: '/experience' },
    { label: 'Reviews', path: '/#reviews' },
    { label: 'Concierge', path: '/support' },
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (currentRoute !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(path.replace('/#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      } else {
        const el = document.getElementById(path.replace('/#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentRoute === '/';
    if (path.startsWith('/#')) return false;
    return currentRoute.startsWith(path);
  };

  return (
    // Non-sticky, authentic editorial top header that scrolls naturally with page
    <header className="relative w-full z-30 border-b border-[#F5EBE6]/10 bg-[#120E0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-5 sm:py-6 flex items-center justify-between">
        
        {/* Brand Identity & Distinctive Architectural Logo */}
        <button
          onClick={() => handleLinkClick('/')}
          className="flex items-center text-left focus:outline-none cursor-pointer group"
          aria-label="Near Home Residences"
        >
          <BrandLogo size="md" />
        </button>

        {/* Editorial Text Navigation Links in Clean Title Case */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-light text-[#A3968E]">
          {navLinks.map(link => {
            const active = isActive(link.path);
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors duration-200 cursor-pointer hover:text-[#F5EBE6] relative py-1 ${
                  active ? 'text-[#F5EBE6] font-normal' : ''
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F5EBE6]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Currency & Reserve */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCurrencyDropdownOpen(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#F5EBE6]/15 hover:border-[#F5EBE6]/40 text-xs text-[#F5EBE6] transition-all font-mono cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#A3968E]" />
              <span>{currency}</span>
              <CaretDown className="w-3 h-3 text-[#A3968E]" />
            </button>

            {currencyDropdownOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-36 bg-[#1C1613] border border-[#F5EBE6]/20 rounded-2xl p-1.5 shadow-2xl z-50 animate-fadeIn"
                onClick={() => setCurrencyDropdownOpen(false)}
              >
                {currencyList.map(c => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code as Currency)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currency === c.code
                        ? 'bg-[#F5EBE6] text-[#120E0C] font-semibold'
                        : 'text-[#F5EBE6]/80 hover:bg-[#28201C] hover:text-[#F5EBE6]'
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="font-mono text-[11px] opacity-75">{c.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clean Reserve CTA */}
          <button
            onClick={() => handleLinkClick('/residences')}
            className="hidden sm:inline-flex bg-[#F5EBE6] text-[#120E0C] px-5 py-2.5 rounded-full font-medium text-xs tracking-wider uppercase hover:bg-white transition-all shadow-sm cursor-pointer"
          >
            Explore Portfolio
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle Navigation"
            className="md:hidden p-2 text-[#F5EBE6] hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#F5EBE6]/10 bg-[#16110F] px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3 text-sm font-light text-[#A3968E]">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className="text-left py-2 text-[#F5EBE6] hover:text-white transition-colors cursor-pointer text-base"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#F5EBE6]/10 flex flex-col gap-3">
            <button
              onClick={() => handleLinkClick('/residences')}
              className="w-full bg-[#F5EBE6] text-[#120E0C] py-3 rounded-full font-semibold text-xs uppercase tracking-wider text-center cursor-pointer"
            >
              Explore Portfolio
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
