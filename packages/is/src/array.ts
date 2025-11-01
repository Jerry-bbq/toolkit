/**
 * 检查值是否为数组
 */
export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

/**
 * 检查数组是否为空
 */
export const isArrayEmpty = (value: unknown): boolean => {
  return isArray(value) && value.length === 0;
};

/**
 * 检查值是否为类数组对象（具有 length 属性的对象）
 */
export const isArrayLike = (value: unknown): value is ArrayLike<unknown> => {
  if (value == null || typeof value === 'function') {
    return false;
  }
  if (typeof value === 'string') {
    return true;
  }
  if (typeof value !== 'object') {
    return false;
  }
  const length = (value as Record<string, unknown>).length;
  return typeof length === 'number' && length >= 0 && length % 1 === 0;
};
