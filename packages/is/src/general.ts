/**
 * 检查值是否已定义（不为 undefined）
 */
export const isDefined = <T>(value: T | undefined): value is T => value !== undefined;

/**
 * 检查值是否为 undefined
 */
export const isUndefined = (value: unknown): value is undefined => value === undefined;

/**
 * 检查值是否为 null 或 undefined
 */
export const isNil = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

/**
 * 检查值是否为 null
 */
export const isNull = (value: unknown): value is null => value === null;
