import { ARRAY_TYPE_PROPERTIES } from './constants';
import type { Filters } from '../model/types';

export function mapFiltersToParams(filters: Filters & { page?: number }): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.page != null && filters.page > 1) {
    params.set('page', String(filters.page));
  }

  if (filters.search?.trim()) {
    params.set('titleOrDescription', filters.search.trim());
  }

  if (filters.specializationId) {
    params.set('specializationId', String(filters.specializationId));
  }

  ARRAY_TYPE_PROPERTIES.forEach((key) => {
    const value = filters[key];
    if (Array.isArray(value) && value.length > 0) {
      params.set(key, value.join(','));
    }
  });

  return params;
}
