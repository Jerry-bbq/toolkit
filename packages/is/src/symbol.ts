/**
 * 检查值是否为 Symbol
 */
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';
