/**
 * 检查值是否为 arguments 对象
 */
export const isArguments = (value: unknown): value is IArguments => {
  if (value == null || typeof value !== 'object') {
    return false;
  }
  return (
    Object.prototype.toString.call(value) === '[object Arguments]' ||
    (typeof (value as Record<string, unknown>).callee === 'function' &&
      typeof (value as Record<string, unknown>).length === 'number')
  );
};

/**
 * 检查 arguments 对象是否为空
 */
export const isArgumentsEmpty = (value: unknown): boolean => {
  if (!isArguments(value)) {
    return false;
  }
  return value.length === 0;
};
