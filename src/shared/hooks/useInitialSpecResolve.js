import { useEffect, useMemo } from 'react';

export function useInitialSpecResolve(filters, specializations, setFilters) {
    const shouldResolveInitialSpec = useMemo(() =>
          !filters.specializationId &&
          filters.search.trim() === '' &&
          filters.skills.length === 0 &&
          filters.keywords.length === 0 &&
          filters.complexity.length === 0 &&
          filters.rate.length === 0,
        [filters]
      );
    
      useEffect(() => {
        if (!shouldResolveInitialSpec) return;       
        if (!specializations || specializations?.data?.length === 0) return;  
        setFilters((prev) => ({ ...prev, specializationId: specializations.data[0]?.id }));
      }, [specializations, setFilters, shouldResolveInitialSpec]);
    
  return shouldResolveInitialSpec;
}


