/**
 * 获取对象的所有键（类型安全）
 */
export const keys = <T extends object>(obj: T): Array<keyof T> => {
  return Object.keys(obj) as Array<keyof T>;
};
