export type Path = string | Array<string | number>;
const toSegments = (path: Path): (string | number)[] =>
  Array.isArray(path)
    ? path
    : path
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean)
        .map(s => (String(+s) === s ? +s : s));

export const get = <T, D = undefined>(obj: T, path: Path, def?: D): any => {
  let cur: any = obj;
  for (const seg of toSegments(path)) {
    if (cur == null) return def;
    cur = typeof seg === 'number' ? cur[seg] : cur[seg];
  }
  return cur === undefined ? def : cur;
};
