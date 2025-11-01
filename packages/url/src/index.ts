/**
 * 将对象转换为查询字符串
 * @param obj - 要转换的对象
 * @returns 查询字符串，例如：'a=1&b=2&c=hello'
 */
export const toQuery = (obj: Record<string, unknown>): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) {
      if (Array.isArray(value)) {
        for (const item of value) {
          params.append(key, String(item));
        }
      } else {
        params.set(key, String(value));
      }
    }
  }
  return params.toString();
};

/**
 * 将查询字符串解析为对象
 * @param query - 查询字符串，例如：'a=1&b=2' 或 '?a=1&b=2'
 * @returns 解析后的对象
 */
export const fromQuery = (query: string): Record<string, string> => {
  const cleanQuery = query.startsWith('?') ? query.slice(1) : query;
  const params = new URLSearchParams(cleanQuery);
  const result: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
};

/**
 * 从查询字符串中获取单个参数值
 * @param query - 查询字符串
 * @param key - 参数名
 * @param defaultValue - 默认值（如果参数不存在）
 * @returns 参数值
 */
export const getQueryParam = (
  query: string,
  key: string,
  defaultValue?: string
): string | undefined => {
  const params = fromQuery(query);
  return params[key] ?? defaultValue;
};

/**
 * 从完整 URL 或查询字符串中获取查询参数
 * @param urlOrQuery - URL 或查询字符串
 * @param key - 参数名
 * @param defaultValue - 默认值（如果参数不存在）
 * @returns 参数值
 */
export const getUrlParam = (
  urlOrQuery: string,
  key: string,
  defaultValue?: string
): string | undefined => {
  // 如果是纯查询字符串（不包含协议），直接使用 getQueryParam
  if (!urlOrQuery.includes('://') && !urlOrQuery.startsWith('/')) {
    return getQueryParam(urlOrQuery, key, defaultValue);
  }
  try {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://example.com';
    const url = new URL(urlOrQuery, baseUrl);
    return url.searchParams.get(key) ?? defaultValue;
  } catch {
    return getQueryParam(urlOrQuery, key, defaultValue);
  }
};

/**
 * 构建完整的 URL，支持添加查询参数
 * @param base - 基础 URL 或路径
 * @param params - 查询参数对象（可选）
 * @returns 完整的 URL
 */
export const buildUrl = (base: string, params?: Record<string, unknown>): string => {
  if (!params || Object.keys(params).length === 0) {
    return base;
  }
  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}${toQuery(params)}`;
};

/**
 * 更新 URL 中的查询参数
 * @param url - 原始 URL
 * @param params - 要更新的参数对象
 * @param replace - 是否替换所有现有参数（默认 false，合并）
 * @returns 更新后的 URL
 */
export const updateQuery = (
  url: string,
  params: Record<string, unknown>,
  replace = false
): string => {
  try {
    const urlObj = new URL(url, 'http://example.com');
    if (replace) {
      urlObj.search = '';
    }
    const existingParams = fromQuery(urlObj.search);
    const mergedParams = replace ? params : { ...existingParams, ...params };
    urlObj.search = toQuery(mergedParams);

    // 如果是相对路径，返回路径部分
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return urlObj.pathname + urlObj.search + urlObj.hash;
    }
    return urlObj.toString();
  } catch {
    // 如果不是完整 URL，直接处理
    const [base, existingQuery] = url.split('?');
    const existingParams = existingQuery ? fromQuery(existingQuery) : {};
    const mergedParams = replace ? params : { ...existingParams, ...params };
    const query = toQuery(mergedParams);
    return query ? `${base}?${query}` : base;
  }
};

/**
 * 解析 URL 为各个组成部分
 * @param url - 要解析的 URL
 * @returns 解析后的 URL 对象
 */
export const parseUrl = (
  url: string
): {
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  searchParams: Record<string, string>;
  hash: string;
  origin: string;
} => {
  // 如果是完整 URL，直接解析
  if (url.includes('://')) {
    try {
      const urlObj = new URL(url);
      return {
        protocol: urlObj.protocol,
        host: urlObj.host,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        searchParams: fromQuery(urlObj.search),
        hash: urlObj.hash,
        origin: urlObj.origin,
      };
    } catch {
      // fallback 到手动解析
    }
  }
  // 对于相对路径，手动解析
  const [pathAndQuery, hash] = url.split('#');
  const [pathname, search] = pathAndQuery.split('?');

  return {
    protocol: '',
    host: '',
    hostname: '',
    port: '',
    pathname: pathname || '/',
    search: search ? `?${search}` : '',
    searchParams: search ? fromQuery(search) : {},
    hash: hash ? `#${hash}` : '',
    origin: '',
  };
};

/**
 * 验证字符串是否为有效的 URL
 * @param url - 要验证的字符串
 * @param protocols - 允许的协议列表（默认：['http:', 'https:']）
 * @returns 是否为有效 URL
 */
export const isValidUrl = (url: string, protocols: string[] = ['http:', 'https:']): boolean => {
  try {
    const urlObj = new URL(url);
    return protocols.includes(urlObj.protocol);
  } catch {
    return false;
  }
};

/**
 * 拼接 URL 路径，正确处理斜杠
 * @param base - 基础路径
 * @param paths - 要拼接的路径片段
 * @returns 拼接后的路径
 */
export const joinUrl = (base: string, ...paths: string[]): string => {
  const baseClean = base.replace(/\/+$/, '');
  const pathsClean = paths.map((p) => p.replace(/^\/+|\/+$/g, '')).filter(Boolean);
  return `${baseClean}/${pathsClean.join('/')}`;
};

/**
 * 移除 URL 中的查询参数和 hash
 * @param url - 原始 URL
 * @returns 清理后的 URL
 */
export const cleanUrl = (url: string): string => {
  // 如果是完整 URL
  if (url.includes('://')) {
    try {
      const urlObj = new URL(url);
      return urlObj.origin + urlObj.pathname;
    } catch {
      // fallback 到手动处理
    }
  }
  // 对于相对路径，只移除查询参数和 hash
  const [clean] = url.split('?');
  const [cleaner] = clean.split('#');
  return cleaner;
};

/**
 * 获取 URL 的基础路径（协议 + 主机）
 * @param url - 原始 URL
 * @returns 基础路径，例如：'https://example.com'
 */
export const getBaseUrl = (url: string): string => {
  // 如果是完整 URL
  if (url.includes('://')) {
    try {
      const urlObj = new URL(url);
      return urlObj.origin;
    } catch {
      return '';
    }
  }
  // 相对路径返回空字符串
  return '';
};
