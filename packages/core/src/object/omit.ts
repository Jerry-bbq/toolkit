export const omit = <T extends object, const K extends readonly (keyof T)[]>(
  obj: T,
  keys: K
): Omit<T, K[number]> => {
  const s = new Set<keyof T>(keys);
  const out = {} as Omit<T, K[number]>;
  for (const k in obj) {
    const key = k as keyof T;
    if (Object.prototype.hasOwnProperty.call(obj, key) && !s.has(key)) {
      (out as Record<string | number | symbol, unknown>)[key] = (
        obj as Record<string | number | symbol, unknown>
      )[key];
    }
  }
  return out;
};
