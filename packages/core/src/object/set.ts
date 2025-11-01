import type { Path } from './get';
const toSegments = (path: Path): (string | number)[] =>
  Array.isArray(path)
    ? path
    : path
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean)
        .map((s) => (String(+s) === s ? +s : s));

const getOrCreateValue = (
  cur: unknown,
  shouldArray: boolean
): Record<string | number, unknown> | unknown[] => {
  if (cur != null) {
    const isArray = Array.isArray(cur);
    const isObject = Object.prototype.toString.call(cur) === '[object Object]';
    if (isArray || isObject) {
      return shouldArray && !isArray ? [] : (cur as Record<string | number, unknown> | unknown[]);
    }
  }
  return shouldArray ? [] : {};
};

export const set = <T extends object>(obj: T, path: Path, value: unknown): T => {
  const segs = toSegments(path);
  if (segs.length === 0) return obj;
  const out: unknown = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur: Record<string | number, unknown> = out as Record<string | number, unknown>;
  for (let i = 0; i < segs.length - 1; i++) {
    const s = segs[i];
    const next = segs[i + 1];
    const exists = cur[s] != null;
    const shouldArray = typeof next === 'number';
    cur[s] = exists ? getOrCreateValue(cur[s], shouldArray) : getOrCreateValue(null, shouldArray);
    cur = cur[s] as Record<string | number, unknown>;
  }
  const last = segs[segs.length - 1];
  cur[last] = value;
  return out as T;
};
