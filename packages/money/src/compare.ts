/**
 * 比较两个金额
 * @param a - 第一个金额
 * @param b - 第二个金额
 * @returns 比较结果：-1 表示 a < b，0 表示 a === b，1 表示 a > b
 */
export const compareMoney = (a: number, b: number): number => {
  // 使用最小货币单位进行比较，避免浮点数精度问题
  const diff = Math.round(a * 100) - Math.round(b * 100);
  if (diff < 0) return -1;
  if (diff > 0) return 1;
  return 0;
};

/**
 * 判断两个金额是否相等
 * @param a - 第一个金额
 * @param b - 第二个金额
 * @returns 是否相等
 */
export const isMoneyEqual = (a: number, b: number): boolean => {
  return compareMoney(a, b) === 0;
};

/**
 * 判断第一个金额是否大于第二个金额
 * @param a - 第一个金额
 * @param b - 第二个金额
 * @returns 是否大于
 */
export const isMoneyGreater = (a: number, b: number): boolean => {
  return compareMoney(a, b) > 0;
};

/**
 * 判断第一个金额是否小于第二个金额
 * @param a - 第一个金额
 * @param b - 第二个金额
 * @returns 是否小于
 */
export const isMoneyLess = (a: number, b: number): boolean => {
  return compareMoney(a, b) < 0;
};

/**
 * 判断第一个金额是否大于等于第二个金额
 * @param a - 第一个金额
 * @param b - 第二个金额
 * @returns 是否大于等于
 */
export const isMoneyGreaterOrEqual = (a: number, b: number): boolean => {
  return compareMoney(a, b) >= 0;
};

/**
 * 判断第一个金额是否小于等于第二个金额
 * @param a - 第一个金额
 * @param b - 第二个金额
 * @returns 是否小于等于
 */
export const isMoneyLessOrEqual = (a: number, b: number): boolean => {
  return compareMoney(a, b) <= 0;
};

