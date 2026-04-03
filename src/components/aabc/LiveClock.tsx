'use client';

import { useState, useEffect } from 'react';

export default function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Initial set immediately so it doesn't wait 1 second
    const updateTime = () => {
      const now = new Date();
      setTime(
        `${now.getUTCHours().toString().padStart(2, '0')}:${now
          .getUTCMinutes()
          .toString()
          .padStart(2, '0')}:${now
          .getUTCSeconds()
          .toString()
          .padStart(2, '0')} UTC`
      );
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // To prevent hydration mismatch, we render empty string or a placeholder initially if we wanted 
  // but it's a client component so 'CONNECTING...' before hydration or on first render is fine.
  return <span className={className}>{time || 'CONNECTING...'}</span>;
}
