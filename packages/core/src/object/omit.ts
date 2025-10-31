export const omit = <T extends object, const K extends readonly (keyof T)[]>(
  obj: T,
  keys: K
): Omit<T, K[number]> => {
  const s = new Set<keyof T>(keys as any);
  const out = {} as any;
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k) && !s.has(k as any)) {
      out[k] = (obj as any)[k];
    }
  }
  return out;
};
