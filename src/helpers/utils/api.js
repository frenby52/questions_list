const API_URL = import.meta.env.VITE_API_URL;

export const PAGE_SIZE_DEFAULT = 10;
export const ARRAY_TYPE_PROPERTIES = ['skills', 'complexity', 'rate'];

export async function apiRequest(url) {
  const response = await fetch(`${API_URL}${url}`);
  if (!response.ok) {
    throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
  }
  return response.json();
}

export function buildQueryParams(filters, page) {
  const params = { page };

  if (filters.search.trim()) {
    params.titleOrDescription = filters.search.trim();
  }
  if (filters.specializationId) {
    params.specializationId = filters.specializationId;
  }
  if (filters.skills.length) {
    params.skills = filters.skills;
  }

  if (filters.complexity.length) {
    params.complexity = filters.complexity.flat();
  }
  if (filters.rate.length) {
    params.rate = filters.rate;
  }
  if (filters.status && filters.status !== 'all') {
    params.status = filters.status;
  }

  return params;
}

export function buildUrl(params) {
  const baseUrl = `/questions/public-questions`;
  const paramsUrl = new URLSearchParams({
    page: params.page,
    limit: params.limit || PAGE_SIZE_DEFAULT
  });

  if (params.titleOrDescription?.length) {
    paramsUrl.set('titleOrDescription', params.titleOrDescription);
  }

  if (params.specializationId) {
    paramsUrl.set('specializationId', params.specializationId);
  }

  ARRAY_TYPE_PROPERTIES.forEach(key => {
    if (params[key]?.length) {
      paramsUrl.set(key, params[key].join(', '));
    }
  });

  if (params.status && params.status !== 'all') {
    paramsUrl.set('status', params.status);
  }

  return `${baseUrl}?${paramsUrl.toString()}`;
}
