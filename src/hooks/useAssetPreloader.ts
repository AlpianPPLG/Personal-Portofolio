import { useEffect, useState, useCallback } from 'react';

interface UseAssetPreloaderOptions {
  images?: string[];
  fonts?: string[];
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

const useAssetPreloader = (options: UseAssetPreloaderOptions = {}) => {
  const { images = [], fonts = [], onProgress, onComplete } = options;
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalAssets = images.length + fonts.length;

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }, []);

  const preloadFont = useCallback((fontFamily: string): Promise<void> => {
    return new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700&display=swap`;
      link.crossOrigin = 'anonymous';

      link.onload = () => resolve();
      link.onerror = () => resolve(); // Don't fail on font errors

      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    if (totalAssets === 0) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const loadAssets = async () => {
      let completedAssets = 0;

      const updateProgress = () => {
        completedAssets++;
        const progress = (completedAssets / totalAssets) * 100;
        setLoadingProgress(progress);
        onProgress?.(progress);

        if (completedAssets === totalAssets) {
          setIsComplete(true);
          onComplete?.();
        }
      };

      // Preload images
      const imagePromises = images.map(async (src) => {
        try {
          await preloadImage(src);
        } catch (_error) {
          console.warn('Failed to preload image:', src);
        } finally {
          updateProgress();
        }
      });

      // Preload fonts
      const fontPromises = fonts.map(async (font) => {
        try {
          await preloadFont(font);
        } catch (_error) {
          console.warn('Failed to preload font:', font);
        } finally {
          updateProgress();
        }
      });

      await Promise.all([...imagePromises, ...fontPromises]);
    };

    loadAssets();
  }, [images, fonts, totalAssets, preloadImage, preloadFont, onProgress, onComplete]);

  return {
    progress: loadingProgress,
    isComplete,
    totalAssets
  };
};

export default useAssetPreloader;
