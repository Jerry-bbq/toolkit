/**
 * 将主货币单位转换为最小货币单位（例如：元 → 分，美元 → 美分）
 * @param amount - 主货币单位金额
 * @param digits - 小数位数（默认 2，即 1 元 = 100 分）
 * @returns 最小货币单位金额
 */
export const toMinor = (amount: number, digits = 2): number => {
  const multiplier = 10 ** digits;
  return Math.round(amount * multiplier);
};

/**
 * 将最小货币单位转换为主货币单位（例如：分 → 元，美分 → 美元）
 * @param minor - 最小货币单位金额
 * @param digits - 小数位数（默认 2，即 100 分 = 1 元）
 * @returns 主货币单位金额
 */
export const fromMinor = (minor: number, digits = 2): number => {
  const divisor = 10 ** digits;
  return minor / divisor;
};

