/**
 * 将数组分割成指定大小的块
 */
export const chunk = <T>(arr: readonly T[], size: number): T[][] => {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size) as T[]);
  }
  return result;
};
