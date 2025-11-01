/**
 * 检查值是否为指定构造函数的实例
 */
export const isInstance = <T extends new (...args: unknown[]) => unknown>(
  value: unknown,
  constructor: T
): value is InstanceType<T> => value instanceof constructor;
