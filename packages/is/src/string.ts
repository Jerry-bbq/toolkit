/**
 * 检查值是否为字符串
 */
export const isString = (value: unknown): value is string => typeof value === 'string';
