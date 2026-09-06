import React from 'react';
import { CheckCircle, Sparkle, Info, X, Buildings } from '@phosphor-icons/react';
import { useBooking, Toast } from '../context/BookingContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useBooking();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-md w-[calc(100vw-3rem)] sm:w-auto pointer-events-none"
    >
      {toasts.map((toast: Toast) => {
        const isBooking = toast.type === 'booking';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-[#1C1613]/95 backdrop-blur-xl border border-[#F5EBE6]/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] text-[#F5EBE6] animate-fadeIn transition-all duration-300"
          >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">
              {isBooking ? (
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Buildings className="w-4 h-4" />
                </div>
              ) : isSuccess ? (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-[#28201C] border border-[#F5EBE6]/20 flex items-center justify-center text-[#F5EBE6]">
                  <Sparkle className="w-4 h-4 text-[#F5EBE6]" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-semibold font-mono tracking-wider uppercase text-[#F5EBE6]">
                  {toast.title}
                </h4>
                {isBooking && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[9px] font-mono uppercase">
                    Itinerary
                  </span>
                )}
              </div>
              <p className="text-xs text-[#A3968E] mt-1 leading-relaxed line-clamp-3">
                {toast.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#A3968E] hover:text-[#F5EBE6] p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
