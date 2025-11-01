import { roundMoney } from './round';

/**
 * 金额相加（避免浮点数精度问题）
 * @param a - 第一个金额
 * @param b - 第二个金额
 * @param digits - 保留小数位数（默认 2）
 * @returns 相加后的金额
 */
export const addMoney = (a: number, b: number, digits = 2): number => {
  return roundMoney(a + b, digits);
};

/**
 * 金额相减（避免浮点数精度问题）
 * @param a - 被减数
 * @param b - 减数
 * @param digits - 保留小数位数（默认 2）
 * @returns 相减后的金额
 */
export const subtractMoney = (a: number, b: number, digits = 2): number => {
  return roundMoney(a - b, digits);
};

/**
 * 金额相乘（避免浮点数精度问题）
 * @param a - 第一个金额
 * @param b - 乘数
 * @param digits - 保留小数位数（默认 2）
 * @returns 相乘后的金额
 */
export const multiplyMoney = (a: number, b: number, digits = 2): number => {
  return roundMoney(a * b, digits);
};

/**
 * 金额相除（避免浮点数精度问题）
 * @param a - 被除数
 * @param b - 除数
 * @param digits - 保留小数位数（默认 2）
 * @returns 相除后的金额
 * @throws 如果除数为 0，抛出错误
 */
export const divideMoney = (a: number, b: number, digits = 2): number => {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return roundMoney(a / b, digits);
};

