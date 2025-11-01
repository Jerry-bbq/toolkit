/**
 * 检查值是否托管在指定的宿主对象上
 * 例如：isHosted(value, 'window.location')
 */
export const isHosted = (value: unknown, host: string): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  const parts = host.split('.');
  let obj: unknown = window;
  for (const part of parts) {
    if (obj == null || typeof obj !== 'object') {
      return false;
    }
    obj = (obj as Record<string, unknown>)[part];
  }
  return obj === value;
};
