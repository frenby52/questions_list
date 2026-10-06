import { useState, useCallback, useEffect, useMemo } from 'react';
import { SEARCH_DEBOUNCE_MS } from '@/shared/constants';
import { useSearchParams } from 'react-router-dom';
import { toggleInArray, toggleComplexity, parseArray, parseNumberList } from '../lib/filterHelpers';
import { mapFiltersToParams, type Filters } from '@/entities/question';
import { useDebounce } from '@/shared/hooks';

export type FilterChangeHandler = (key: keyof Filters, newValue: string | number | null) => void;

type UseFiltersReturn = [
  Filters,
  (id: number) => void,
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
};

export const useFilters = (): UseFiltersReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('titleOrDescription') || defaultFilters.search;
  const page = Number(searchParams.get('page')) || 1;
  const [search, setSearch] = useState(searchFromUrl);
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);

  const filters = useMemo<Filters>(() => ({
    search: search,
    specializationId: Number(searchParams.get('specializationId')) || defaultFilters.specializationId,
    skills: parseNumberList(searchParams, 'skills'),
    keywords: parseArray(searchParams, 'keywords'),
    complexity: parseArray(searchParams, 'complexity'),
    rate: parseNumberList(searchParams, 'rate'),
  }), [searchParams, search]);
  
  const updateUrl = useCallback((nextFilters: Filters, nextPage: number, replace = false) =>
      setSearchParams(mapFiltersToParams({ ...nextFilters, page: nextPage }), { replace }),
    [setSearchParams],
  );

  useEffect(() => {
    if (debouncedSearch === searchFromUrl) return;
    updateUrl({ ...filters, search: debouncedSearch }, 1, true);
  }, [debouncedSearch, filters, searchFromUrl, updateUrl]);

  const handleFiltersChange = useCallback<FilterChangeHandler>((key, newValue) => {
    if (newValue === null) return;

    if (key === 'search') { 
      setSearch(String(newValue)); 
      return; 
    }

    let newFilters: Filters;
    if (key === 'specializationId') newFilters = { ...defaultFilters, specializationId: Number(newValue) };
    else if (key === 'complexity') newFilters = { ...filters, complexity: toggleComplexity(filters.complexity, newValue) };
    else if (key === 'skills' || key === 'rate') newFilters = { ...filters, [key]: toggleInArray(filters[key], Number(newValue)) };
    else if (key === 'keywords') newFilters = { ...filters, keywords: toggleInArray(filters.keywords, String(newValue)) };
    else newFilters = { ...filters, [key]: newValue };

    updateUrl({ ...newFilters, search: debouncedSearch }, 1);
    
  }, [debouncedSearch, filters, updateUrl]);

  const handlePageChange = useCallback((nextPage: number) => updateUrl({ ...filters, search: debouncedSearch }, nextPage),
    [filters, debouncedSearch, updateUrl],
  );

  const setSpecializationId = useCallback((id: number) => updateUrl({ ...filters, specializationId: id }, page, true),
    [filters, page, updateUrl],
  );

  return [filters, setSpecializationId, page, debouncedSearch, handlePageChange, handleFiltersChange];
};
