const blocked = new Set(['__proto__','prototype','constructor']);
export const merge = <A extends object, B extends object>(a: A, b: B): A & B => {
  const out: any = { ...(a as any) };
  for (const k in b) {
    if (Object.prototype.hasOwnProperty.call(b, k) && !blocked.has(k)) {
      out[k] = (b as any)[k];
    }
  }
  return out as A & B;
};
