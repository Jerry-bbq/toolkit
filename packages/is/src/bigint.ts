/**
 * 检查值是否为 BigInt
 */
export const isBigInt = (value: unknown): value is bigint => typeof value === 'bigint';
