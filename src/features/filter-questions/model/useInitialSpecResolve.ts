import { useEffect, useMemo } from 'react';
import type { Paginated } from '@/shared/api';
import type { Filters } from '@/entities/question';
import type { Specialization } from '@/entities/specialization';

export function useInitialSpecResolve(
  filters: Filters,
  specializations: Paginated<Specialization> | undefined,
  setSpecializationId: (id: number) => void,
): boolean {
  const shouldResolveInitialSpec = useMemo(() =>
      !filters.specializationId &&
      (filters.search?.trim() ?? '') === '' &&
      (filters.skills?.length ?? 0) === 0 &&
      (filters.keywords?.length ?? 0) === 0 &&
      (filters.complexity?.length ?? 0) === 0 &&
      (filters.rate?.length ?? 0) === 0,
    [filters],
  );

  useEffect(() => {
    if (!shouldResolveInitialSpec) return;
    if (!specializations || specializations.data.length === 0) return;
    setSpecializationId(specializations.data[0]?.id);
  }, [specializations, setSpecializationId, shouldResolveInitialSpec]);

  return shouldResolveInitialSpec;
}
