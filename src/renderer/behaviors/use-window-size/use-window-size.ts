import { dequal } from 'dequal';
import { useState, useEffect, useRef } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (
  handler: (ev: Event, windowSize: WindowSize) => void,
  handlerDependencies: unknown[]
): WindowSize => {
  const callback = useRef(handler);
  const callbackDependencies = useRef(handlerDependencies);

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (
      callback.current !== handler ||
      !dequal(callbackDependencies.current, handlerDependencies)
    ) {
      callback.current = handler;
      callbackDependencies.current = handlerDependencies;
    }
  }, [handler, handlerDependencies]);

  useEffect(() => {
    function handleResize(ev: Event) {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      setWindowSize(size);

      if (callback.current) {
        callback.current(ev, size);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
