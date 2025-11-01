/**
 * 检查值是否为数字
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !Number.isNaN(value);

/**
 * 检查值是否为整数
 */
export const isInteger = (value: unknown): value is number =>
  isNumber(value) && Number.isInteger(value);

/**
 * 检查值是否为小数（非整数）
 */
export const isDecimal = (value: unknown): value is number =>
  isNumber(value) && !Number.isInteger(value);

/**
 * 检查值是否为无穷大
 */
export const isInfinite = (value: unknown): value is number =>
  typeof value === 'number' && !Number.isNaN(value) && !Number.isFinite(value);

/**
 * 检查值是否为 NaN
 */
export const isNaN = (value: unknown): boolean => Number.isNaN(value);

/**
 * 检查数字是否为偶数
 */
export const isEven = (value: unknown): boolean => isInteger(value) && value % 2 === 0;

/**
 * 检查数字是否为奇数
 */
export const isOdd = (value: unknown): boolean => isInteger(value) && value % 2 !== 0;

/**
 * 检查数字是否能被 n 整除
 */
export const isDivisibleBy = (value: unknown, n: number): boolean => {
  if (!isNumber(value) || !isNumber(n) || n === 0) {
    return false;
  }
  return value % n === 0;
};

/**
 * 检查值是否大于等于其他值
 */
export const isGreaterThanOrEqual = (value: unknown, other: unknown): boolean => {
  if (typeof value !== 'number' || typeof other !== 'number') {
    return false;
  }
  return value >= other;
};

/**
 * 检查值是否大于其他值
 */
export const isGreaterThan = (value: unknown, other: unknown): boolean => {
  if (typeof value !== 'number' || typeof other !== 'number') {
    return false;
  }
  return value > other;
};

/**
 * 检查值是否小于等于其他值
 */
export const isLessThanOrEqual = (value: unknown, other: unknown): boolean => {
  if (typeof value !== 'number' || typeof other !== 'number') {
    return false;
  }
  return value <= other;
};

/**
 * 检查值是否小于其他值
 */
export const isLessThan = (value: unknown, other: unknown): boolean => {
  if (typeof value !== 'number' || typeof other !== 'number') {
    return false;
  }
  return value < other;
};

/**
 * 检查值是否为数组中的最大值
 */
export const isMaximum = (value: unknown, others: unknown[]): boolean => {
  if (!isNumber(value)) {
    return false;
  }
  return others.every((other) => {
    if (typeof other !== 'number') {
      return false;
    }
    return value >= other;
  });
};

/**
 * 检查值是否为数组中的最小值
 */
export const isMinimum = (value: unknown, others: unknown[]): boolean => {
  if (!isNumber(value)) {
    return false;
  }
  return others.every((other) => {
    if (typeof other !== 'number') {
      return false;
    }
    return value <= other;
  });
};

/**
 * 检查值是否在指定范围内 [start, finish]
 */
export const isWithin = (value: unknown, start: number, finish: number): boolean => {
  if (!isNumber(value)) {
    return false;
  }
  return value >= start && value <= finish;
};
