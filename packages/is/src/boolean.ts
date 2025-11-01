/**
 * 检查值是否为布尔值
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

/**
 * 检查值是否为 true
 */
export const isTrue = (value: unknown): value is true => value === true;

/**
 * 检查值是否为 false
 */
export const isFalse = (value: unknown): value is false => value === false;
