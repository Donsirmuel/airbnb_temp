import React, { useState } from 'react';
import { X, CaretLeft, CaretRight, CalendarBlank as CalendarIcon } from '@phosphor-icons/react';
import { useBooking } from '../context/BookingContext';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({ isOpen, onClose }) => {
  const { searchParams, updateSearchParam } = useBooking();
  
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(() => {
    return searchParams.checkIn ? new Date(searchParams.checkIn) : new Date();
  });

  const [tempCheckIn, setTempCheckIn] = useState<string>(searchParams.checkIn);
  const [tempCheckOut, setTempCheckOut] = useState<string>(searchParams.checkOut);

  if (!isOpen) return null;

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const formatYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(year, month, day);
    const dateStr = formatYMD(selectedDate);

    if (!tempCheckIn || (tempCheckIn && tempCheckOut)) {
      setTempCheckIn(dateStr);
      setTempCheckOut('');
    } else if (tempCheckIn && !tempCheckOut) {
      if (new Date(dateStr) < new Date(tempCheckIn)) {
        setTempCheckIn(dateStr);
      } else {
        setTempCheckOut(dateStr);
      }
    }
  };

  const applyPreset = (nights: number) => {
    const now = new Date();
    const inDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    const outDate = new Date(inDate.getTime() + nights * 24 * 60 * 60 * 1000);
    setTempCheckIn(formatYMD(inDate));
    setTempCheckOut(formatYMD(outDate));
    setCurrentMonthDate(inDate);
  };

  const handleApply = () => {
    if (tempCheckIn) updateSearchParam('checkIn', tempCheckIn);
    if (tempCheckOut) updateSearchParam('checkOut', tempCheckOut);
    onClose();
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyPrefix = Array.from({ length: firstDay }, (_, i) => i);

  const isSelected = (day: number) => {
    const dStr = formatYMD(new Date(year, month, day));
    return dStr === tempCheckIn || dStr === tempCheckOut;
  };

  const isInRange = (day: number) => {
    if (!tempCheckIn || !tempCheckOut) return false;
    const dTime = new Date(year, month, day).getTime();
    return dTime > new Date(tempCheckIn).getTime() && dTime < new Date(tempCheckOut).getTime();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#1C1613] border border-[#F5EBE6]/20 rounded-[2rem] p-6 sm:p-8 shadow-2xl text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F5EBE6]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#28201C] flex items-center justify-center text-[#F5EBE6]">
              <CalendarIcon className="w-4 h-4 text-[#A3968E]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#A3968E] block font-mono">Calendar & Stay Duration</span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F5EBE6] font-normal">Select Stay Dates</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] hover:bg-[#F5EBE6] hover:text-[#120E0C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => applyPreset(7)}
            className="px-3 py-1.5 rounded-full bg-[#28201C] hover:bg-[#F5EBE6]/15 text-[#F5EBE6] text-[11px] font-medium border border-[#F5EBE6]/10 transition-colors"
          >
            7 Nights · Focus Stay
          </button>
          <button
            type="button"
            onClick={() => applyPreset(14)}
            className="px-3 py-1.5 rounded-full bg-[#28201C] hover:bg-[#F5EBE6]/15 text-[#F5EBE6] text-[11px] font-medium border border-[#F5EBE6]/10 transition-colors"
          >
            14 Nights · Extended Stay
          </button>
          <button
            type="button"
            onClick={() => applyPreset(30)}
            className="px-3 py-1.5 rounded-full bg-[#28201C] hover:bg-[#F5EBE6]/15 text-[#F5EBE6] text-[11px] font-medium border border-[#F5EBE6]/10 transition-colors"
          >
            30 Nights · Monthly Residency
          </button>
        </div>

        {/* Month Navigation */}
        <div className="mt-6 flex items-center justify-between px-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-full bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] hover:border-[#F5EBE6]/40 transition-colors cursor-pointer"
            aria-label="Previous Month"
          >
            <CaretLeft className="w-4 h-4" />
          </button>
          <div className="font-serif text-base text-[#F5EBE6] font-medium">
            {monthNames[month]} {year}
          </div>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-full bg-[#28201C] border border-[#F5EBE6]/10 flex items-center justify-center text-[#F5EBE6] hover:border-[#F5EBE6]/40 transition-colors cursor-pointer"
            aria-label="Next Month"
          >
            <CaretRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase font-mono text-[#A3968E] mt-4 mb-2">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {emptyPrefix.map(idx => (
            <div key={`empty-${idx}`} className="h-9" />
          ))}
          {daysArray.map(day => {
            const selected = isSelected(day);
            const inRange = isInRange(day);

            let dayClasses = 'h-9 w-full rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer font-medium ';
            if (selected) {
              dayClasses += 'bg-[#F5EBE6] text-[#120E0C] font-semibold shadow-md ';
            } else if (inRange) {
              dayClasses += 'bg-[#F5EBE6]/20 text-[#F5EBE6] ';
            } else {
              dayClasses += 'text-[#F5EBE6]/80 hover:bg-[#28201C] hover:text-[#F5EBE6] ';
            }

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleSelectDay(day)}
                className={dayClasses}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Footer info & Apply */}
        <div className="mt-6 pt-4 border-t border-[#F5EBE6]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#A3968E] block font-mono">Selected Window</span>
            <div className="text-xs font-medium text-[#F5EBE6] mt-0.5">
              {tempCheckIn ? tempCheckIn : 'Select Check-in'} — {tempCheckOut ? tempCheckOut : 'Select Check-out'}
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setTempCheckIn('');
                setTempCheckOut('');
              }}
              className="px-4 py-2.5 rounded-full border border-[#F5EBE6]/10 hover:border-[#F5EBE6]/30 text-[#A3968E] hover:text-[#F5EBE6] text-xs transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!tempCheckIn || !tempCheckOut}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#F5EBE6] text-[#120E0C] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white font-semibold text-xs shadow-md transition-all active:scale-95"
            >
              Apply Dates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
