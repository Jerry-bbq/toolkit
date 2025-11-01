/**
 * 获取对象的所有值（类型安全）
 */
export const values = <T extends object>(obj: T): Array<T[keyof T]> => {
  return Object.values(obj) as Array<T[keyof T]>;
};
