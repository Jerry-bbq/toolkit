/**
 * 生成数字范围数组
 */
export const range = (start: number, end: number, step: number = 1): number[] => {
  const result: number[] = [];
  if (step === 0) return result;
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
};
