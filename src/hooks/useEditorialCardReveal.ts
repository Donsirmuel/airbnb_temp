import { useLayoutEffect, useEffect, DependencyList, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable hook to handle batch reveal animations for `.editorial-card` elements.
 * Rather than attaching separate ScrollTriggers to every individual card,
 * this groups them using ScrollTrigger.batch so cards enter the viewport smoothly—
 * fading in and growing slightly with staggered timing—preventing lag on mobile and desktop.
 */
export function useEditorialCardReveal(
  containerRef?: RefObject<HTMLElement | null>,
  dependencies: DependencyList = []
) {
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const root = containerRef?.current || document;
    const cards = root.querySelectorAll('.editorial-card');
    
    if (cards.length === 0) return;

    let isMounted = true;
    let batchTriggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      // Set initial card state
      gsap.set(cards, { opacity: 0, y: 35, scale: 0.96 });

      // Group cards together with ScrollTrigger.batch for fluid batched animation
      batchTriggers = ScrollTrigger.batch(cards, {
        start: 'top 90%',
        interval: 0.08,
        batchMax: 6,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 35,
            scale: 0.96,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.in',
            overwrite: 'auto',
          });
        },
      });
    }, root);

    const rafId = requestAnimationFrame(() => {
      if (isMounted) {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
      if (batchTriggers && batchTriggers.length > 0) {
        batchTriggers.forEach(t => t.kill());
      }
      ctx.revert();
    };
  }, dependencies);
}
