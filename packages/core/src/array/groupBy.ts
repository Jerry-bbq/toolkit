/**
 * 按指定键分组数组
 */
export const groupBy = <T, K extends string | number>(
  arr: readonly T[],
  key: (item: T) => K
): Record<K, T[]> => {
  const result = {} as Record<K, T[]>;
  for (const item of arr) {
    const k = key(item);
    if (!result[k]) {
      result[k] = [];
    }
    result[k].push(item);
  }
  return result;
};
