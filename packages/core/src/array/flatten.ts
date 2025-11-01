/**
 * 展平数组（一层深度）
 */
export const flatten = <T>(arr: readonly (T | T[])[]): T[] => {
  const result: T[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  }
  return result;
};

/**
 * 深度展平数组
 */
export const flattenDeep = <T>(arr: readonly unknown[]): T[] => {
  const result: T[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenDeep<T>(item));
    } else {
      result.push(item as T);
    }
  }
  return result;
};
