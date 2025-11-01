/**
 * 深度比较两个值是否相等（支持基本类型、数组、对象）
 * 使用严格相等（===）比较基本类型，递归比较对象和数组
 */
export const isEqual = (value: unknown, other: unknown): boolean => {
  // 严格相等
  if (value === other) {
    return true;
  }

  // 处理 null 和 undefined
  if (value == null || other == null) {
    return value === other;
  }

  // 处理 NaN
  if (Number.isNaN(value) && Number.isNaN(other)) {
    return true;
  }

  // 处理 Date
  if (value instanceof Date && other instanceof Date) {
    return value.getTime() === other.getTime();
  }

  // 处理 RegExp
  if (value instanceof RegExp && other instanceof RegExp) {
    return value.toString() === other.toString();
  }

  // 处理数组
  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (!isEqual(value[i], other[i])) {
        return false;
      }
    }
    return true;
  }

  // 处理对象
  if (
    typeof value === 'object' &&
    typeof other === 'object' &&
    value !== null &&
    other !== null &&
    !Array.isArray(value) &&
    !Array.isArray(other) &&
    !(value instanceof Date) &&
    !(other instanceof Date) &&
    !(value instanceof RegExp) &&
    !(other instanceof RegExp)
  ) {
    const keys1 = Object.keys(value);
    const keys2 = Object.keys(other);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (!keys2.includes(key)) {
        return false;
      }
      const val1 = (value as Record<string, unknown>)[key];
      const val2 = (other as Record<string, unknown>)[key];
      if (!isEqual(val1, val2)) {
        return false;
      }
    }
    return true;
  }

  return false;
};
