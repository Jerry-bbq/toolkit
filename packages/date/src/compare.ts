/**
 * 比较两个日期是否为同一天
 */
export const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

/**
 * 比较两个日期是否为同一月
 */
export const isSameMonth = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
};

/**
 * 比较两个日期是否为同一年
 */
export const isSameYear = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear();
};

/**
 * 判断日期是否为今天
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * 判断日期是否为昨天
 */
export const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
};

/**
 * 判断日期是否为明天
 */
export const isTomorrow = (date: Date): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return isSameDay(date, tomorrow);
};

/**
 * 判断第一个日期是否早于第二个日期
 */
export const isBefore = (a: Date, b: Date): boolean => {
  return a.getTime() < b.getTime();
};

/**
 * 判断第一个日期是否晚于第二个日期
 */
export const isAfter = (a: Date, b: Date): boolean => {
  return a.getTime() > b.getTime();
};

/**
 * 判断日期是否在指定范围内
 */
export const isBetween = (date: Date, start: Date, end: Date): boolean => {
  return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
};
