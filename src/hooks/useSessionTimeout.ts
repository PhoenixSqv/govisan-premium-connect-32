import { useEffect, useRef, useState } from 'react';
import { logout } from '@/lib/cms/auth';

export const useSessionTimeout = (timeoutMinutes: number = 120) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimeout = () => {
    lastActivityRef.current = Date.now();
    
    // Clear existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
    
    setShowWarning(false);
    setTimeLeft(null);

    // Set warning timeout (5 minutes before logout)
    warningTimeoutRef.current = setTimeout(() => {
      setShowWarning(true);
      setTimeLeft(5 * 60); // 5 minutes in seconds
      
      // Start countdown
      const countdownInterval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownInterval);
            logout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    }, (timeoutMinutes - 5) * 60 * 1000); // Show warning 5 minutes before logout

    // Set main timeout
    timeoutRef.current = setTimeout(() => {
      logout();
    }, timeoutMinutes * 60 * 1000);
  };

  const handleUserActivity = () => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;
    
    // Only reset if more than 1 minute has passed since last reset
    if (timeSinceLastActivity > 60000) {
      resetTimeout();
    }
  };

  useEffect(() => {
    // Initial timeout setup
    resetTimeout();

    // Activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      // Cleanup
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [timeoutMinutes]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const extendSession = () => {
    resetTimeout();
  };

  return {
    showWarning,
    timeLeft,
    formatTime,
    extendSession
  };
};