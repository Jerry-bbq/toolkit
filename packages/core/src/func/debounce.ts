export const debounce = <F extends (...args: unknown[]) => unknown>(fn: F, wait = 200): F => {
  let t: ReturnType<typeof setTimeout> | undefined;
  return ((...args: Parameters<F>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  }) as F;
};
