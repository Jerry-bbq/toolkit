/**
 * 截断字符串
 */
export const truncate = (str: string, length: number, suffix: string = '...'): string => {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
};
