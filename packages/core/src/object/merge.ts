const blocked = new Set(['__proto__', 'prototype', 'constructor']);
export const merge = <A extends object, B extends object>(a: A, b: B): A & B => {
  const out = { ...a } as A & B;
  for (const k in b) {
    if (Object.prototype.hasOwnProperty.call(b, k) && !blocked.has(k)) {
      (out as Record<string, unknown>)[k] = (b as Record<string, unknown>)[k];
    }
  }
  return out;
};
