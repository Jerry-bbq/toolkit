/**
 * 计算两个日期之间的天数差
 */
export const diffDays = (a: Date, b: Date): number => {
  const diff = a.getTime() - b.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

/**
 * 计算两个日期之间的月数差
 */
export const diffMonths = (a: Date, b: Date): number => {
  const yearDiff = a.getFullYear() - b.getFullYear();
  const monthDiff = a.getMonth() - b.getMonth();
  return yearDiff * 12 + monthDiff;
};

/**
 * 计算两个日期之间的年数差
 */
export const diffYears = (a: Date, b: Date): number => {
  return a.getFullYear() - b.getFullYear();
};

/**
 * 计算两个日期之间的小时差
 */
export const diffHours = (a: Date, b: Date): number => {
  const diff = a.getTime() - b.getTime();
  return Math.floor(diff / (1000 * 60 * 60));
};

/**
 * 计算两个日期之间的分钟差
 */
export const diffMinutes = (a: Date, b: Date): number => {
  const diff = a.getTime() - b.getTime();
  return Math.floor(diff / (1000 * 60));
};

/**
 * 计算两个日期之间的秒数差
 */
export const diffSeconds = (a: Date, b: Date): number => {
  const diff = a.getTime() - b.getTime();
  return Math.floor(diff / 1000);
};
