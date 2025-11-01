/**
 * 验证金额是否有效
 * @param amount - 金额
 * @returns 是否有效
 */
export const isValidAmount = (amount: unknown): amount is number => {
  if (typeof amount !== 'number') {
    return false;
  }
  if (Number.isNaN(amount)) {
    return false;
  }
  if (!Number.isFinite(amount)) {
    return false;
  }
  return amount >= 0;
};

