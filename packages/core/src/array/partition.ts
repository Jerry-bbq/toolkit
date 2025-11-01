/**
 * 将数组分割为满足条件和不满足条件的两部分
 */
export const partition = <T>(arr: readonly T[], predicate: (item: T) => boolean): [T[], T[]] => {
  const truthy: T[] = [];
  const falsy: T[] = [];
  for (const item of arr) {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }
  return [truthy, falsy];
};
