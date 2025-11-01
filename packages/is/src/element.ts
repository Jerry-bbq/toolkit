/**
 * 检查值是否为 DOM 元素
 * 仅在浏览器环境中有效
 */
export const isElement = (value: unknown): value is Element => {
  if (typeof window === 'undefined') {
    return false;
  }
  return (
    value != null &&
    typeof value === 'object' &&
    typeof (value as Record<string, unknown>).nodeType === 'number' &&
    (value as Record<string, unknown>).nodeType === 1 &&
    typeof (value as Record<string, unknown>).nodeName === 'string'
  );
};
