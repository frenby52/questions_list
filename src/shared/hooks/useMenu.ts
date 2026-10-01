import { useState, useEffect, useRef } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';

type UseMenuReturn = [boolean, Dispatch<SetStateAction<boolean>>, RefObject<HTMLDivElement | null>];

export const useMenu = (initialState = false): UseMenuReturn => {
  const [isMenuOpen, setIsMenuOpen] = useState(initialState);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      (event.target as HTMLElement).blur();
      setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return [isMenuOpen, setIsMenuOpen, menuRef];
};
