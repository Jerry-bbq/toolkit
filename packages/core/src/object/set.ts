import type { Path } from './get';
const toSegments = (path: Path): (string | number)[] =>
  Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean).map(s => (String(+s) === s ? +s : s));

export const set = <T extends object>(obj: T, path: Path, value: any): T => {
  const segs = toSegments(path);
  if (segs.length === 0) return obj as T;
  const out: any = Array.isArray(obj) ? [...(obj as any)] : { ...(obj as any) };
  let cur: any = out;
  for (let i = 0; i < segs.length - 1; i++) {
    const s = segs[i];
    const next = segs[i + 1];
    const exists = cur[s as any] != null;
    const shouldArray = typeof next === 'number';
    cur[s as any] = exists
      ? (Array.isArray(cur[s as any]) || Object.prototype.toString.call(cur[s as any]) === '[object Object]')
        ? (shouldArray && !Array.isArray(cur[s as any]) ? [] : cur[s as any])
        : (shouldArray ? [] : {})
      : (shouldArray ? [] : {});
    cur = cur[s as any];
  }
  const last = segs[segs.length - 1];
  cur[last as any] = value;
  return out as T;
};
