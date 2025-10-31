export const debounce = <F extends (...a: any[]) => any>(fn: F, wait = 200) => {
  let t: ReturnType<typeof setTimeout> | undefined;
  return ((...args: Parameters<F>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  }) as F;
};
