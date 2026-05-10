const API_URL = import.meta.env.VITE_API_URL;
import { PAGE_SIZE_DEFAULT, ARRAY_TYPE_PROPERTIES } from '../../constants/constants.js';

export const API_ENDPOINTS = {
  QUESTIONS: `/questions/public-questions`,
  SPECIALIZATIONS: `/specializations`,
  SKILLS: `/skills`,
};

export async function apiRequest(url) {
  const response = await fetch(`${API_URL}${url}`);
  if (!response.ok) {
    throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
  }
  return response.json();
}

export function mapFiltersToParams(filters, page) {
  const params = new URLSearchParams();
  
  if (page > 1) params.set('page', String(page));

  // params.set('limit', String(PAGE_SIZE_DEFAULT));
  
  if (filters.search?.trim()) {
    params.set('titleOrDescription', filters.search.trim());
  }

  if (filters.specializationId) {
    params.set('specializationId', String(filters.specializationId));
  }

  ARRAY_TYPE_PROPERTIES.forEach(key => {
    const value = filters[key];
    if (Array.isArray(value) && value.length > 0) {
      params.set(key, value.join(','));
    }
  });

  if (filters.status && filters.status !== 'all') {
    params.set('status', filters.status);
  }

  return params;
}

export function buildUrl(params, apiUrl) {
  return `${apiUrl}?${params.toString()}`;
}

export function parseArray(searchParams, key) {
  return searchParams.get(key) ? searchParams.get(key).split(',').map((s) => s.trim()).filter(Boolean) : [];
}

export function parseNumberList(searchParams, key) {
  return searchParams.get(key) ? searchParams.get(key).split(',').map((s) => Number(String(s).trim())).filter((n) => !Number.isNaN(n)) : [];
}

export function logQuestionsRequest(label, queryString) {
  console.info(`[API] GET ${API_ENDPOINTS.QUESTIONS}?${queryString} (${label})`);
}
