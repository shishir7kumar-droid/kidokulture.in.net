'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // Prevent double tracking or tracking the same page on re-renders
    if (pathname === lastPath.current) return;
    
    // Don't track the dashboard itself to avoid noise
    if (pathname.startsWith('/rk-hidden')) return;

    const trackVisit = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: pathname }),
        });
        lastPath.current = pathname;
      } catch (err) {
        // Silently fail to not interrupt user experience
        console.error('Tracking error:', err);
      }
    };

    // Delay slightly to ensure page load feels snappy
    const timer = setTimeout(trackVisit, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // This component doesn't render anything
}
