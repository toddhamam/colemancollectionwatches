'use client';

import { useEffect, useRef, type DependencyList } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Creates a GSAP context scoped to a container ref.
 * Automatically reverts all animations on unmount.
 */
export function useGSAP(
  callback: () => void,
  deps: DependencyList = [],
  scope?: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const ctx = gsap.context(callback, scope?.current ?? undefined);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Creates a ScrollTrigger instance with automatic cleanup.
 */
export function useScrollTrigger(
  config: ScrollTrigger.Vars,
  deps: DependencyList = [],
) {
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    triggerRef.current = ScrollTrigger.create(config);

    return () => {
      triggerRef.current?.kill();
      triggerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return triggerRef;
}
