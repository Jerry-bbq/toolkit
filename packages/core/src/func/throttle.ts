/**
 * 节流函数：在指定时间间隔内最多执行一次
 * @param fn - 要节流的函数
 * @param wait - 等待时间（毫秒，默认 200）
 * @returns 节流后的函数
 */
export const throttle = <F extends (...args: unknown[]) => unknown>(fn: F, wait = 200): F => {
  let lastTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return ((...args: Parameters<F>) => {
    const now = Date.now();
    const remaining = wait - (now - lastTime);

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
      lastTime = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastTime = Date.now();
        timeoutId = undefined;
        fn(...args);
      }, remaining);
    }
  }) as F;
};
