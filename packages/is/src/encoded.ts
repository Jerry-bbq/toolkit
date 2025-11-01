/**
 * 检查字符串是否为有效的 Base64 编码
 */
export const isBase64 = (value: unknown): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  if (value.length === 0) {
    return false;
  }
  // Base64 正则表达式
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  if (!base64Regex.test(value)) {
    return false;
  }
  // 检查是否可以被正确解码
  try {
    const decoded = atob(value);
    return btoa(decoded) === value;
  } catch {
    return false;
  }
};

/**
 * 检查字符串是否为有效的十六进制编码
 */
export const isHex = (value: unknown): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  // 十六进制正则表达式（允许大小写）
  return /^[0-9A-Fa-f]+$/.test(value);
};
