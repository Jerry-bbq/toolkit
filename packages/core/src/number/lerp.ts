/**
 * 线性插值
 */
export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};

/**
 * 归一化值到 0-1 范围
 */
export const normalize = (value: number, min: number, max: number): number => {
  if (min === max) return 0;
  return (value - min) / (max - min);
};
