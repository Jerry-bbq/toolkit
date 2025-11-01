/**
 * 货币符号映射
 */
const CURRENCY_SYMBOLS: Record<string, string> = {
  CNY: '¥',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  KRW: '₩',
  AUD: 'A$',
  CAD: 'C$',
  HKD: 'HK$',
  SGD: 'S$',
  INR: '₹',
  RUB: '₽',
  BRL: 'R$',
  MXN: '$',
  ZAR: 'R',
};

/**
 * 货币名称映射
 */
const CURRENCY_NAMES: Record<string, string> = {
  CNY: '人民币',
  USD: '美元',
  EUR: '欧元',
  GBP: '英镑',
  JPY: '日元',
  KRW: '韩元',
  AUD: '澳元',
  CAD: '加元',
  HKD: '港元',
  SGD: '新加坡元',
  INR: '印度卢比',
  RUB: '俄罗斯卢布',
  BRL: '巴西雷亚尔',
  MXN: '墨西哥比索',
  ZAR: '南非兰特',
};

/**
 * 获取货币符号
 * @param currency - 货币代码（例如：'CNY', 'USD'）
 * @returns 货币符号
 */
export const getCurrencySymbol = (currency: string): string => {
  return CURRENCY_SYMBOLS[currency.toUpperCase()] || currency.toUpperCase();
};

/**
 * 获取货币名称
 * @param currency - 货币代码（例如：'CNY', 'USD'）
 * @returns 货币名称
 */
export const getCurrencyName = (currency: string): string => {
  return CURRENCY_NAMES[currency.toUpperCase()] || currency.toUpperCase();
};

