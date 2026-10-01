import { useState, useEffect, useCallback } from 'react';

type UseModalStateReturn = [boolean, () => void, () => void];

export const useModalState = (): UseModalStateReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return [isOpen, open, close];
};
