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

export function buildUrl(params: URLSearchParams, apiUrl: string): string {
  return `${apiUrl}?${params.toString()}`;
}
