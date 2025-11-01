export * as object from './object';
export * as array from './array';
export * as string from './string';
export * as number from './number';
export * as func from './func';

// 常用函数的直接导出（便于快速使用）
export { pick, omit, get, set, merge, keys, values, entries, deepClone } from './object';
export { uniqBy, uniq, chunk, flatten, flattenDeep, groupBy, sortBy, partition } from './array';
export { camelCase, kebabCase, snakeCase, capitalize, capitalizeWords, truncate } from './string';
export { clamp, random, randomFloat, range, lerp, normalize } from './number';
export { debounce, throttle, memoize } from './func';
