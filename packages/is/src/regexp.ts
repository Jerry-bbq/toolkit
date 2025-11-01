/**
 * 检查值是否为 RegExp 对象
 */
export const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp;
