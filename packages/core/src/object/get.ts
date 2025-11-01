export type Path = string | Array<string | number>;
const toSegments = (path: Path): (string | number)[] =>
  Array.isArray(path)
    ? path
    : path
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean)
        .map((s) => (String(+s) === s ? +s : s));

export const get = <T, D = undefined>(obj: T, path: Path, def?: D): D | unknown => {
  let cur: unknown = obj;
  for (const seg of toSegments(path)) {
    if (cur == null) return def;
    if (typeof cur === 'object' && cur !== null) {
      cur =
        typeof seg === 'number'
          ? (cur as Record<number, unknown>)[seg]
          : (cur as Record<string, unknown>)[seg];
    } else {
      return def;
    }
  }
  return cur === undefined ? def : cur;
};
