export const pick = <T extends object, const K extends readonly (keyof T)[]>(
  obj: T,
  keys: K
): Pick<T, K[number]> => {
  const out = {} as Pick<T, K[number]>;
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      const key = k as keyof Pick<T, K[number]>;
      out[key] = obj[k] as Pick<T, K[number]>[typeof key];
    }
  }
  return out;
};
