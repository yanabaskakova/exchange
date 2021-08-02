import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = <T>(handler?: () => void): RefObject<T> => {
  const ref = useRef<T>(null);
  const handlerRef = useRef<typeof handler>();
  handlerRef.current = handler;

  useEffect(() => {
    const cb = (event: Event) => {
      const handler = handlerRef.current;
      const parent = ref.current;
      if (
        typeof handler === 'function' &&
        event.target instanceof Node &&
        parent instanceof Node &&
        !parent.contains(event.target)
      ) {
        handler();
      }
    };

    document.addEventListener('click', cb);

    return () => {
      document.removeEventListener('click', cb);
    };
  }, []);

  return ref;
};
