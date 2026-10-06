import { useEffect, useMemo } from 'react';
import type { Paginated } from '@/shared/api';
import type { Filters } from '@/entities/question';
import type { Specialization } from '@/entities/specialization';
import { useGetQuestionsQuery } from '@/entities/question';

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

  const { data: seedQuestions, isError: isSeedError } = useGetQuestionsQuery({}, { skip: !shouldResolveInitialSpec });

  useEffect(() => {
    if (!shouldResolveInitialSpec) return;
    // if (!specializations || specializations.data.length === 0) return;
    // setSpecializationId(specializations.data[0]?.id);
    if (!seedQuestions || seedQuestions.total === 0) return;
    const specId = seedQuestions?.data[0]?.questionSpecializations[0]?.id ?? specializations?.data[0]?.id;
    if (specId) setSpecializationId(specId);
    
  }, [specializations, setSpecializationId, shouldResolveInitialSpec, seedQuestions]);

  return shouldResolveInitialSpec && !isSeedError;
}
