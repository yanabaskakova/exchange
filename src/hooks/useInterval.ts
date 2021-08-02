import { useEffect, useRef } from 'react';

export const useInterval = (cb: () => void, delay: number | null, executeImmediately = true) => {
  const savedCallback = useRef<() => void>(() => {
    /* do nothing */
  });

  useEffect(() => {
    if (executeImmediately) cb();
    savedCallback.current = cb;
  }, [cb, executeImmediately]);

  useEffect(() => {
    if (delay !== null) {
      const intervalId = setInterval(savedCallback.current, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};
