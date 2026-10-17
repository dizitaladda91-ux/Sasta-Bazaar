import React, { useEffect, useRef, useState } from 'react';

/**
 * RevealOnScroll Component
 * Smoothly transitions content into view from left, right, or bottom
 * as the user scrolls and explores more content on the website.
 */
export default function RevealOnScroll({
  children,
  direction = 'up', // 'left', 'right', 'up', 'none'
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.1,
  once = true
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [threshold, once]);

  // Direction transform styles when hidden
  let transformHidden = 'translate-y-8';
  if (direction === 'left') transformHidden = '-translate-x-12 sm:-translate-x-16';
  else if (direction === 'right') transformHidden = 'translate-x-12 sm:translate-x-16';
  else if (direction === 'none') transformHidden = 'scale-95';

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : `opacity-0 ${transformHidden} pointer-events-none`
      } ${className}`}
    >
      {children}
    </div>
  );
}
