import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { ResidencesPage } from './pages/ResidencesPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SupportPage } from './pages/SupportPage';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AppRouter: React.FC = () => {
  const { currentRoute } = useBooking();
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // Route Entrance Transition Lifecycle with robust cleanup
  useLayoutEffect(() => {
    const container = pageContainerRef.current;
    if (!container) return;

    // Kill any active in-flight tweens on the container before starting entrance
    gsap.killTweensOf(container);

    // Pure fade entrance to ensure no CSS transforms break descendant position:fixed/ScrollTrigger pinning
    const entranceTween = gsap.fromTo(
      container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        clearProps: 'all',
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      }
    );

    return () => {
      // Kill active tweens on the container when route switches
      entranceTween.kill();
      gsap.killTweensOf(container);
    };
  }, [currentRoute]);

  // Determine active view based on path
  const renderCurrentPage = () => {
    if (currentRoute === '/' || currentRoute === '') {
      return <HomePage />;
    }
    if (currentRoute === '/residences') {
      return <ResidencesPage />;
    }
    if (currentRoute.startsWith('/residences/')) {
      const slug = currentRoute.replace('/residences/', '').split('/')[0];
      return <PropertyDetailsPage slug={slug} />;
    }
    if (currentRoute.startsWith('/property/')) {
      const slug = currentRoute.replace('/property/', '').split('/')[0];
      return <PropertyDetailsPage slug={slug} />;
    }
    if (currentRoute.startsWith('/book/')) {
      const slug = currentRoute.replace('/book/', '').split('/')[0];
      return <CheckoutPage slug={slug} />;
    }
    if (currentRoute === '/checkout' || currentRoute.startsWith('/checkout/')) {
      return <CheckoutPage />;
    }
    if (currentRoute === '/experience') {
      return <ExperiencePage />;
    }
    if (currentRoute === '/support') {
      return <SupportPage />;
    }
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#120E0C] text-[#F5EBE6]">
      {/* Editorial Non-Sticky Navbar */}
      <Navbar />

      {/* Main Page Stage with Exact ID: #page-content-wrapper */}
      <main
        id="page-content-wrapper"
        ref={pageContainerRef}
        className="flex-1 w-full"
      >
        {renderCurrentPage()}
      </main>

      {/* Persistent Global Footer */}
      <Footer />

      {/* Global Notification Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <AppRouter />
    </BookingProvider>
  );
}
