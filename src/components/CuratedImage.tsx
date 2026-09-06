import React, { useState } from 'react';

interface CuratedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'tall' | 'wide' | 'auto';
  priority?: boolean;
  onLoad?: () => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';

export const CuratedImage: React.FC<CuratedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'auto',
  priority = false,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Aspect ratio helper classes
  const aspectClass = {
    video: 'aspect-[16/10]',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    tall: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    auto: '',
  }[aspectRatio];

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const activeSrc = hasError ? FALLBACK_IMAGE : src;

  const isPositioned = containerClassName.includes('absolute') || containerClassName.includes('fixed');
  const positionClass = isPositioned ? '' : 'relative';

  return (
    <div
      className={`${positionClass} overflow-hidden bg-[#181310] ${aspectClass} ${containerClassName}`.trim()}
    >
      {/* Blur-Up Placeholder & Shimmer Skeleton */}
      <div
        className={`absolute inset-0 z-0 bg-gradient-to-tr from-[#1A1411] via-[#241C17] to-[#1C1613] transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5EBE6]/5 to-transparent animate-pulse" />
        {/* Subtle architectural emblem watermark during load */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-8 h-8 rounded-full border border-[#F5EBE6]/40 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#F5EBE6]/60" />
          </div>
        </div>
      </div>

      {/* Target Image with Smooth Reveal */}
      <img
        src={activeSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-105 filter blur-xs'
        } ${className}`}
      />
    </div>
  );
};
