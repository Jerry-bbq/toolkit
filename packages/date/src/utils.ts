/**
 * 验证日期是否有效
 */
export const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && !Number.isNaN(date.getTime());
};

/**
 * 克隆日期对象
 */
export const cloneDate = (date: Date): Date => {
  return new Date(date.getTime());
};

/**
 * 获取星期几（0 = 周日, 1 = 周一, ..., 6 = 周六）
 */
export const getDayOfWeek = (date: Date): number => {
  return date.getDay();
};

/**
 * 获取星期几的中文名称
 */
export const getDayName = (date: Date, locale: string = 'zh-CN'): string => {
  return date.toLocaleDateString(locale, { weekday: 'long' });
};

/**
 * 获取一年中的第几周（ISO 8601 标准）
 */
export const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

/**
 * 获取月份中的天数
 */
export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
