import { ARRAY_TYPE_PROPERTIES } from '../../constants/constants.js';
const API_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  QUESTIONS: `/questions/public-questions`,
  SPECIALIZATIONS: `/specializations`,
  SKILLS: `/skills`,
};

export function mapFiltersToParams(filters) {
  const params = new URLSearchParams();
  
  if (filters.page > 1) params.set('page', String(filters.page));

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

export function getErrorMessage(error) {
  if (!error) return null;

  if ('status' in error) {
    if (error.status === 'FETCH_ERROR') return 'Проблема с соединением. Проверьте интернет.';
    if (error.status === 'PARSING_ERROR') return 'Не удалось обработать ответ сервера.';
    if (error.status === 404) return 'Данные не найдены.';
    if (typeof error.status === 'number' && error.status >= 500) {
      return 'Сервер временно недоступен. Попробуйте позже.';
    }

    return error.data?.message ?? `Ошибка запроса (${error.status}).`;
  }
  return 'Что-то пошло не так.';
}