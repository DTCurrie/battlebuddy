import { useState, useEffect } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (handler: (ev: Event, windowSize: WindowSize) => void): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize(ev: Event) {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      setWindowSize(size);
      handler(ev, size);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handler]);

  return windowSize;
};
