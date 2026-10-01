import { useState, useCallback, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ARRAY_TYPE_PROPERTIES, SEARCH_DEBOUNCE_MS } from '@/shared/constants/constants';
import { useSearchParams } from 'react-router-dom';
import { toggleInArray, toggleComplexity, parseArray, parseNumberList, mapFiltersToParams } from '@/shared/helpers/helpers';
import { useDebounce } from '@/shared/hooks/useDebounce';
import type { Filters } from '@/shared/api/types';

export type FilterChangeHandler = (key: keyof Filters, newValue: string | number | null) => void;

type UseFiltersReturn = [
  Filters,
  Dispatch<SetStateAction<Filters>>,
  number,
  string,
  (nextPage: number) => void,
  FilterChangeHandler,
];

const defaultFilters: Filters = {
  search: '',
  specializationId: null,
  skills: [],
  keywords: [],
  complexity: [],
  rate: [],
  status: 'all',
};

export const useFilters = (): UseFiltersReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('titleOrDescription') || defaultFilters.search,
    specializationId: Number(searchParams.get('specializationId')) || defaultFilters.specializationId,
    skills: parseNumberList(searchParams, 'skills'),
    keywords: parseArray(searchParams, 'keywords'),
    complexity: parseArray(searchParams, 'complexity'),
    rate: parseNumberList(searchParams, 'rate'),
    status: searchParams.get('status') || defaultFilters.status,
  });

  const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1);
  const debouncedSearch = useDebounce(filters.search, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    const params = mapFiltersToParams({ ...filters, search: debouncedSearch, page });
    setSearchParams(params, { replace: true });
  }, [filters, debouncedSearch, page, setSearchParams]);

  const handleFiltersChange = useCallback<FilterChangeHandler>((key, newValue) => {
    if (newValue === null) return;

    setFilters((prevFilters) => {
      if (key === 'specializationId') {
        return { ...defaultFilters, [key]: Number(newValue) };
      }
      if (key === 'complexity') {
        return { ...prevFilters, complexity: toggleComplexity(prevFilters.complexity, newValue) };
      }
      const actualValue = (ARRAY_TYPE_PROPERTIES as readonly string[]).includes(key)
        ? toggleInArray(prevFilters[key], newValue)
        : newValue;
      return { ...prevFilters, [key]: actualValue };
    });

    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage: number) => setPage(nextPage), []);

  return [filters, setFilters, page, debouncedSearch, handlePageChange, handleFiltersChange];
};
