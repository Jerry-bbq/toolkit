/**
 * 检查值的类型是否匹配
 * 支持的类型：'string' | 'number' | 'boolean' | 'function' | 'object' | 'undefined' | 'symbol' | 'bigint'
 */
export const isType = (value: unknown, type: string): boolean => typeof value === type;
