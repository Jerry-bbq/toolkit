/**
 * 按指定键排序数组
 */
export const sortBy = <T, K>(
  arr: readonly T[],
  key: (item: T) => K,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  const sorted = [...arr];
  sorted.sort((a, b) => {
    const aVal = key(a);
    const bVal = key(b);
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
};
