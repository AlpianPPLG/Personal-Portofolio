import { useState, useEffect } from 'react';

interface UseSplashScreenOptions {
  duration?: number;
  minDisplayTime?: number;
  showOnFirstVisit?: boolean;
}

export const useSplashScreen = (options: UseSplashScreenOptions = {}) => {
  const {
    duration = 3000,
    minDisplayTime = 2000,
    showOnFirstVisit = true
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('portfolio-visited');

    if (showOnFirstVisit && !hasVisited) {
      setShowSplash(true);
      localStorage.setItem('portfolio-visited', 'true');
    } else if (!showOnFirstVisit) {
      setShowSplash(true);
    }

    // Ensure minimum display time
    const minTimer = setTimeout(() => {
      setIsLoading(false);
    }, minDisplayTime);

    return () => clearTimeout(minTimer);
  }, [showOnFirstVisit, minDisplayTime]);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return {
    showSplash: showSplash && isLoading,
    handleSplashFinish,
    duration
  };
};
