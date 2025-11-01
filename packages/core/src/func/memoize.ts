/**
 * 记忆化函数：缓存函数结果，避免重复计算
 * @param fn - 要记忆化的函数
 * @param keyer - 可选的自定义键生成函数
 * @returns 记忆化后的函数
 */
export const memoize = <F extends (...args: unknown[]) => unknown>(
  fn: F,
  keyer?: (...args: Parameters<F>) => string
): F => {
  const cache = new Map<string, ReturnType<F>>();
  const defaultKeyer = (...args: Parameters<F>): string => {
    return JSON.stringify(args);
  };
  const getKey = keyer || defaultKeyer;

  return ((...args: Parameters<F>) => {
    const key = getKey(...args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args) as ReturnType<F>;
    cache.set(key, result);
    return result;
  }) as F;
};
