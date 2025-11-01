/**
 * 检查值是否为对象（不包括 null 和数组）
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
  value != null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.prototype.toString.call(value) === '[object Object]';
