/**
 * 获取对象的所有键值对（类型安全）
 */
export const entries = <T extends object>(obj: T): Array<[keyof T, T[keyof T]]> => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
};
