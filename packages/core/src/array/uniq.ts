/**
 * 数组去重
 */
export const uniq = <T>(arr: readonly T[]): T[] => {
  return Array.from(new Set(arr));
};
