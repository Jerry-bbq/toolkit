/**
 * 检查值是否为 Error 对象
 */
export const isError = (value: unknown): value is Error => value instanceof Error;
