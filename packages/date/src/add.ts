import { cloneDate } from './utils';

/**
 * 增加天数
 */
export const addDays = (date: Date, days: number): Date => {
  const result = cloneDate(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * 增加月数
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = cloneDate(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * 增加年数
 */
export const addYears = (date: Date, years: number): Date => {
  const result = cloneDate(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/**
 * 增加小时
 */
export const addHours = (date: Date, hours: number): Date => {
  const result = cloneDate(date);
  result.setHours(result.getHours() + hours);
  return result;
};

/**
 * 增加分钟
 */
export const addMinutes = (date: Date, minutes: number): Date => {
  const result = cloneDate(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
};

/**
 * 增加秒数
 */
export const addSeconds = (date: Date, seconds: number): Date => {
  const result = cloneDate(date);
  return new Date(result.getTime() + seconds * 1000);
};

/**
 * 增加毫秒
 */
export const addMilliseconds = (date: Date, milliseconds: number): Date => {
  const result = cloneDate(date);
  return new Date(result.getTime() + milliseconds);
};

/**
 * 减去天数
 */
export const subtractDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};

/**
 * 减去月数
 */
export const subtractMonths = (date: Date, months: number): Date => {
  return addMonths(date, -months);
};

/**
 * 减去年数
 */
export const subtractYears = (date: Date, years: number): Date => {
  return addYears(date, -years);
};
