import { cloneDate } from './utils';

/**
 * 获取一天的开始时间（00:00:00.000）
 */
export const startOfDay = (date: Date): Date => {
  const result = cloneDate(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * 获取一天的结束时间（23:59:59.999）
 */
export const endOfDay = (date: Date): Date => {
  const result = cloneDate(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * 获取一周的开始时间（周一 00:00:00.000）
 */
export const startOfWeek = (date: Date, weekStartsOn: number = 1): Date => {
  const result = cloneDate(date);
  const day = result.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  result.setDate(result.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * 获取一周的结束时间（周日 23:59:59.999）
 */
export const endOfWeek = (date: Date, weekStartsOn: number = 1): Date => {
  const result = startOfWeek(date, weekStartsOn);
  result.setDate(result.getDate() + 6);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * 获取一个月的开始时间（当月第一天 00:00:00.000）
 */
export const startOfMonth = (date: Date): Date => {
  const result = cloneDate(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * 获取一个月的结束时间（当月最后一天 23:59:59.999）
 */
export const endOfMonth = (date: Date): Date => {
  const result = cloneDate(date);
  result.setMonth(result.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * 获取一年的开始时间（1月1日 00:00:00.000）
 */
export const startOfYear = (date: Date): Date => {
  const result = cloneDate(date);
  result.setMonth(0, 1);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * 获取一年的结束时间（12月31日 23:59:59.999）
 */
export const endOfYear = (date: Date): Date => {
  const result = cloneDate(date);
  result.setMonth(11, 31);
  result.setHours(23, 59, 59, 999);
  return result;
};
