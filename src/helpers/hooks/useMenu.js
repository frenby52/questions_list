import { useState, useEffect, useRef } from 'react';

export const useMenu = (initialState = false) => {
    const [isMenuOpen, setIsMenuOpen] = useState(initialState);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!isMenuOpen) return;
    
        const handleMouseDown = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
          }
        };
        const handleKeyDown = (event) => {
          if (event.key !== 'Escape') return;
    
          event.target.blur();
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