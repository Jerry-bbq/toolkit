/**
 * 首字母大写
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * 每个单词首字母大写
 */
export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
};
