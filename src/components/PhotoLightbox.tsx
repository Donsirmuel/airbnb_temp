import React, { useState, useEffect, useRef } from 'react';
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react';
import gsap from 'gsap';

interface PhotoLightboxProps {
  isOpen: boolean;
  images: string[];
  initialIndex?: number;
  title: string;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  isOpen,
  images,
  initialIndex = 0,
  title,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // ACT 4: Gallery Lightbox Trigger Animation
  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl text-white select-none"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="gallery-modal w-full max-w-6xl h-full flex flex-col justify-between"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="w-full flex items-center justify-between z-10 pb-4 border-b border-[#F5EBE6]/10">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#A3968E] font-mono block">Architectural Gallery</span>
            <h4 className="font-serif text-lg sm:text-xl text-[#F5EBE6]">{title}</h4>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[#A3968E]">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#1C1613] border border-[#F5EBE6]/20 flex items-center justify-center text-[#F5EBE6] hover:bg-[#F5EBE6] hover:text-[#120E0C] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Image Stage */}
        <div className="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - Photo ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 w-12 h-12 rounded-full bg-[#1C1613]/80 border border-[#F5EBE6]/20 flex items-center justify-center text-white hover:bg-[#F5EBE6] hover:text-[#120E0C] transition-all cursor-pointer shadow-xl"
                aria-label="Previous photo"
              >
                <CaretLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 w-12 h-12 rounded-full bg-[#1C1613]/80 border border-[#F5EBE6]/20 flex items-center justify-center text-white hover:bg-[#F5EBE6] hover:text-[#120E0C] transition-all cursor-pointer shadow-xl"
                aria-label="Next photo"
              >
                <CaretRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Thumbnail Filmstrip */}
        {images.length > 1 && (
          <div className="w-full flex items-center justify-center gap-2 overflow-x-auto py-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
                  currentIndex === idx ? 'border-[#F5EBE6] scale-105 opacity-100 ring-1 ring-white/50' : 'border-transparent opacity-40 hover:opacity-80'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
