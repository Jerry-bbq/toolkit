/**
 * 检查值是否为函数
 */
export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown =>
  typeof value === 'function';
