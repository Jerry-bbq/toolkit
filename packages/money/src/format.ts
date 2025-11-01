import { getCurrencySymbol } from './currency';

/**
 * 格式化金额，使用 Intl.NumberFormat
 * @param amount - 金额
 * @param currency - 货币代码（默认 'CNY'）
 * @param locale - 区域设置（默认 'zh-CN'）
 * @returns 格式化后的金额字符串
 */
export const formatMoney = (
  amount: number,
  currency: string = 'CNY',
  locale: string = 'zh-CN'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * 格式化金额，带货币符号
 * @param amount - 金额
 * @param currency - 货币代码（默认 'CNY'）
 * @param locale - 区域设置（默认 'zh-CN'）
 * @returns 格式化后的金额字符串（例如：'¥12.34'）
 */
export const formatMoneyWithSymbol = (
  amount: number,
  currency: string = 'CNY',
  locale: string = 'zh-CN'
): string => {
  const symbol = getCurrencySymbol(currency);
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${symbol}${formatted}`;
};
