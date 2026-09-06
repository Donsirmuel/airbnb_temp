import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'mark-only' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  light = true,
}) => {
  // Size dimensions for the icon mark
  const iconDimensions = {
    sm: { w: 26, h: 26 },
    md: { w: 34, h: 34 },
    lg: { w: 42, h: 42 },
    xl: { w: 54, h: 54 },
  }[size];

  const textColor = light ? 'text-[#F5EBE6]' : 'text-[#120E0C]';
  const subtextColor = light ? 'text-[#A3968E]' : 'text-[#7D6F66]';
  const primaryStroke = light ? '#F5EBE6' : '#120E0C';
  const accentStroke = '#C48464'; // terracotta copper tone
  const waveStroke = light ? 'rgba(245, 235, 230, 0.45)' : 'rgba(18, 14, 12, 0.4)';

  // Architectural Sanctuary & Acoustic Resonance Emblem
  const LogoMark = (
    <svg
      width={iconDimensions.w}
      height={iconDimensions.h}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="Near Home Emblem"
    >
      {/* Outer sanctuary arch / lintel */}
      <path
        d="M10 42V22C10 14.268 16.268 8 24 8C31.732 8 38 14.268 38 22V42"
        stroke={primaryStroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Base architectural threshold line */}
      <path
        d="M6 42H42"
        stroke={primaryStroke}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Subtle outer acoustic resonance wave (acoustic stillness & sound sanctuary) */}
      <path
        d="M15 22C15 17.0294 19.0294 13 24 13C28.9706 13 33 17.0294 33 22"
        stroke={waveStroke}
        strokeWidth="1.25"
        strokeDasharray="2.5 2.5"
        strokeLinecap="round"
      />

      {/* Inner architectural portal arch */}
      <path
        d="M18 42V25C18 21.6863 20.6863 19 24 19C27.3137 19 30 21.6863 30 25V42"
        stroke={accentStroke}
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      {/* Center sanctuary point: stillness / hearth */}
      <circle cx="24" cy="28" r="2" fill={accentStroke} />
    </svg>
  );

  if (variant === 'mark-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{LogoMark}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 group ${className}`}>
        {LogoMark}
        <div className="flex flex-col items-center">
          <span className={`font-serif text-lg tracking-[0.25em] uppercase font-medium leading-none ${textColor}`}>
            Near Home
          </span>
          <span className={`text-[9px] uppercase tracking-[0.35em] font-mono mt-1 ${subtextColor}`}>
            Architectural Sanctuaries
          </span>
        </div>
      </div>
    );
  }

  // Default 'full' horizontal variant
  const textSizes = {
    sm: { title: 'text-sm tracking-[0.2em]', desc: 'text-[8px] tracking-[0.25em]' },
    md: { title: 'text-base sm:text-lg tracking-[0.22em]', desc: 'text-[9px] tracking-[0.28em]' },
    lg: { title: 'text-lg sm:text-xl tracking-[0.25em]', desc: 'text-[10px] tracking-[0.3em]' },
    xl: { title: 'text-2xl tracking-[0.28em]', desc: 'text-[11px] tracking-[0.35em]' },
  }[size];

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {LogoMark}
      <div className="flex flex-col justify-center">
        <span className={`font-serif uppercase font-medium leading-none ${textSizes.title} ${textColor}`}>
          Near Home
        </span>
        <span className={`uppercase font-mono mt-1 leading-none ${textSizes.desc} ${subtextColor}`}>
          Sanctuaries & Stays
        </span>
      </div>
    </div>
  );
};
