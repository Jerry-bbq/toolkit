/**
 * 金额舍入（四舍五入）
 * 使用更精确的方法避免浮点数精度问题
 * @param amount - 金额
 * @param digits - 保留小数位数（默认 2）
 * @returns 舍入后的金额
 */
export const roundMoney = (amount: number, digits = 2): number => {
  const multiplier = 10 ** digits;
  // 处理负数时，需要减去 EPSILON 才能正确舍入
  const epsilon = amount >= 0 ? Number.EPSILON : -Number.EPSILON;
  return Math.round((amount + epsilon) * multiplier) / multiplier;
};

/**
 * 金额截断（向下取整）
 * @param amount - 金额
 * @param digits - 保留小数位数（默认 2）
 * @returns 截断后的金额
 */
export const truncateMoney = (amount: number, digits = 2): number => {
  const multiplier = 10 ** digits;
  return Math.trunc(amount * multiplier) / multiplier;
};

/**
 * 金额格式化到指定小数位（返回字符串）
 * @param amount - 金额
 * @param digits - 保留小数位数（默认 2）
 * @returns 格式化后的金额字符串
 */
export const toFixedMoney = (amount: number, digits = 2): string => {
  return amount.toFixed(digits);
};
