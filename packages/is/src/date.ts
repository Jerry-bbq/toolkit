/**
 * 检查值是否为 Date 对象
 */
export const isDate = (value: unknown): value is Date =>
  value instanceof Date && !Number.isNaN((value as Date).getTime());
