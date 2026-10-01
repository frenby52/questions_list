import { ARRAY_TYPE_PROPERTIES } from '@/shared/constants/constants';
import type { Filters } from '@/shared/api/types';

export function mapFiltersToParams(filters: Filters): URLSearchParams {
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

  if (filters.status && filters.status !== 'all') {
    params.set('status', filters.status);
  }

  return params;
}

export function buildUrl(params: URLSearchParams, apiUrl: string): string {
  return `${apiUrl}?${params.toString()}`;
}

export function parseArray(searchParams: URLSearchParams, key: string): string[] {
  const value = searchParams.get(key);
  return value ? value.split(',').map((s) => s.trim()).filter(Boolean) : [];
}

export function parseNumberList(searchParams: URLSearchParams, key: string): number[] {
  const value = searchParams.get(key);
  return value
    ? value.split(',').map((s) => Number(String(s).trim())).filter((n) => !Number.isNaN(n))
    : [];
}

export const toggleInArray = <T extends string | number>(
  array: readonly T[] | undefined,
  item: T,
): T[] => {
  const current = array ?? [];
  if (current.includes(item)) {
    return current.filter((x) => x !== item);
  }
  return [...current, item].sort((a, b) => Number(a) - Number(b));
};

export const toggleComplexity = (
  currentComplexity: string[] | undefined,
  newValue: string | number,
): string[] => {
  const current = currentComplexity ?? [];
  const rangeArray = String(newValue).split(',');
  const hasOverlap = rangeArray.some((val) => current.includes(val));
  const nextComplexity = hasOverlap
    ? current.filter((val) => !rangeArray.includes(val))
    : [...current, ...rangeArray];

  return nextComplexity.sort((a, b) => Number(a) - Number(b));
};

export function getPages(total: number, current: number): Array<number | '…'> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: Array<number | '…'> = [];
  pages.push(1);
  if (current > 3) pages.push('…');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push('…');
  pages.push(total);

  return pages;
}

export function getErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== 'object') return null;

  if ('status' in error) {
    if (error.status === 'FETCH_ERROR') return 'Проблема с соединением. Проверьте интернет.';
    if (error.status === 'PARSING_ERROR') return 'Не удалось обработать ответ сервера.';
    if (error.status === 404) return 'Данные не найдены.';
    if (typeof error.status === 'number' && error.status >= 500) {
      return 'Сервер временно недоступен. Попробуйте позже.';
    }

    const data = 'data' in error ? (error.data as { message?: string } | undefined) : undefined;
    return data?.message ?? `Ошибка запроса (${error.status}).`;
  }

  if ('message' in error && typeof error.message === 'string') {
    return error.message;
  }

  return 'Что-то пошло не так.';
}
