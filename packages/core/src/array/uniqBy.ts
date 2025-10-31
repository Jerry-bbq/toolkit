export const uniqBy = <T, K>(arr: readonly T[], key: (x: T) => K): T[] => {
  const seen = new Set<K>(); const out: T[] = [];
  for (const x of arr) { const k = key(x); if (!seen.has(k)) { seen.add(k); out.push(x); } }
  return out;
};
