import { useState, useEffect } from 'react';
export const useBgScrollBlock = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        if (isFilterOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
        return () => {
          document.body.style.overflow = '';
        };
      }, [isFilterOpen]);

      return [isFilterOpen, setIsFilterOpen];    
};