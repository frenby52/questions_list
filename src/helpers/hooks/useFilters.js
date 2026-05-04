import { useState, useCallback } from 'react';
import {ARRAY_TYPE_PROPERTIES} from '../../constants/constants.js';
import { toggleInArray } from '../utils/utils.js';

const initialFilters = {
  search: '',
  specializationId: null,
  skills: [],
  complexity: [],
  rate: [],
  status: 'all',
};

export const useFilters = () => {
    const [filters, setFilters] = useState(initialFilters);
    const [page, setPage] = useState(1);

    const handleFiltersChange = useCallback((key, newValue) => {
        if (newValue === null) return;

        setFilters((prevFilters) => {
            if (key === 'specializationId') {
              return { ...initialFilters, [key]: newValue };
            }
            const actualValue = ARRAY_TYPE_PROPERTIES.includes(key)
              ? toggleInArray(prevFilters[key], newValue)
              : newValue;
            return { ...prevFilters, [key]: actualValue };
          });


        setPage(1);
    }, []);

    const handlePageChange = useCallback((nextPage) => {
      setPage(nextPage);
    }, []);

    return [filters, setFilters, page, handlePageChange, handleFiltersChange];

};