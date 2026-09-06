import { useLayoutEffect, useEffect, DependencyList } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook to manage GSAP ScrollTrigger lifecycles cleanly on route changes and page unmounts.
 * Acts as an automatic cleanup crew: the second a user switches pages,
 * it wipes away all previous page scroll effects, kills active tweens,
 * restores pinned spacers, and recalculates coordinates so the website stays fast and glitch-free.
 */
export function useScrollAnimation(
  setupAnimations: () => void | (() => void),
  dependencies: DependencyList = []
) {
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    let isMounted = true;
    let customCleanup: void | (() => void);

    // Snapshot existing triggers before setting up new ones
    const triggersBefore = new Set(ScrollTrigger.getAll());

    // Create GSAP context for safe encapsulation and garbage collection
    const ctx = gsap.context(() => {
      customCleanup = setupAnimations();
    });

    // Refresh ScrollTrigger coordinates after DOM calculations settle
    const rafId = requestAnimationFrame(() => {
      if (isMounted) {
        ScrollTrigger.refresh();
      }
    });

    // Automatic Cleanup Crew on page switch / unmount:
    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);

      // 1. Run any custom cleanup provided by setupAnimations
      if (typeof customCleanup === 'function') {
        try {
          customCleanup();
        } catch (e) {
          console.warn('Scroll animation cleanup error:', e);
        }
      }

      // 2. Kill and remove all ScrollTriggers created in this lifecycle
      const currentTriggers = ScrollTrigger.getAll();
      currentTriggers.forEach((trigger) => {
        if (!triggersBefore.has(trigger)) {
          // Unpin and kill trigger cleanly (true reverts pinned element positioning and removes spacers)
          trigger.kill(true);
        }
      });

      // 3. Revert GSAP context (kills all tweens, resets recorded styles)
      ctx.revert();

      // 4. Clean up any lingering pinned spacer elements left in the DOM
      const spacers = document.querySelectorAll('.pin-spacer');
      spacers.forEach((spacer) => {
        if (spacer.parentElement && spacer.children.length > 0) {
          while (spacer.firstChild) {
            spacer.parentElement.insertBefore(spacer.firstChild, spacer);
          }
          spacer.parentElement.removeChild(spacer);
        }
      });

      // 5. Refresh ScrollTrigger for incoming view
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, dependencies);
}

export { gsap, ScrollTrigger };
