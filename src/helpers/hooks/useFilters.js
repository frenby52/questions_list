import { useState, useCallback, useEffect } from 'react';
import { ARRAY_TYPE_PROPERTIES, SEARCH_DEBOUNCE_MS } from '../../constants/constants.js';
import { toggleInArray } from '../utils/utils.js';
import { useSearchParams } from 'react-router-dom';
import { parseArray, parseNumberList, mapFiltersToParams } from '../utils/api.js';
import { useDebounce } from './useDebounce.js';

const defaultFilters = {
  search: '',
  specializationId: null,
  skills: [],
  keywords: [],
  complexity: [],
  rate: [],
  status: 'all',
};

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
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
    const params = mapFiltersToParams({ ...filters, search: debouncedSearch }, page);
    setSearchParams(params, { replace: true });
  }, [filters, debouncedSearch, page, setSearchParams]);

  const handleFiltersChange = useCallback((key, newValue) => {
    if (newValue === null) return;

    setFilters((prevFilters) => {
      if (key === 'specializationId') {
        return { ...defaultFilters, [key]: newValue };
      }
      const actualValue = ARRAY_TYPE_PROPERTIES.includes(key)
        ? toggleInArray(prevFilters[key], newValue)
        : newValue;
      return { ...prevFilters, [key]: actualValue };
    });


    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage) => setPage(nextPage), []);

  return [filters, setFilters, page, debouncedSearch, handlePageChange, handleFiltersChange];
};
