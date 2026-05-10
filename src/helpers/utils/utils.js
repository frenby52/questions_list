export const toggleInArray = (array, item) => {
  if (array.includes(item)) {
    return array.filter((x) => x !== item);
  }
  return [...array, item].sort((a, b) => a - b);
};

export const toggleComplexity = (currentComplexity, newValue) => {
  const rangeArray = String(newValue).split(',');
  const hasOverlap = rangeArray.some((val) => currentComplexity.includes(val));
  let nextComplexity;

  if (hasOverlap) {
    nextComplexity = currentComplexity.filter((val) => !rangeArray.includes(val));
  } else {
    nextComplexity = [...currentComplexity, ...rangeArray];
  }

  return nextComplexity.sort((a, b) => Number(a) - Number(b));
};

export function getPages(total, current) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = [];
  pages.push(1);
  if (current > 3) pages.push('…');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push('…');
  pages.push(total);
  return pages;
}
