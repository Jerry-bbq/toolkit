import type { AuthUrlOptions } from './types';

/**
 * 生成 UUID（兼容浏览器和 Node.js）
 */
const generateUUID = (): string => {
  // 优先使用 crypto.randomUUID()（Node.js 18+ 和现代浏览器支持）
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  // 降级方案：使用 Math.random() 生成 UUID v4 格式
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * 生成微信授权 URL
 * @param options - 授权选项
 * @returns 授权 URL
 * @throws {TypeError} 当 appId 或 redirectUri 为空时
 */
export const generateAuthUrl = (options: AuthUrlOptions): string => {
  const { appId, redirectUri, scope = 'snsapi_base', state } = options;

  if (!appId || typeof appId !== 'string') {
    throw new TypeError('appId 必须是非空字符串');
  }

  if (!redirectUri || typeof redirectUri !== 'string') {
    throw new TypeError('redirectUri 必须是非空字符串');
  }

  const baseUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  const params = new URLSearchParams({
    appid: appId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope,
    ...(state ? { state } : {}),
  });
  return `${baseUrl}?${params.toString()}#wechat_redirect`;
};

/**
 * 生成带随机 state 的授权 URL（推荐使用，防止 CSRF）
 * @param options - 授权选项（不包含 state）
 * @returns 包含 state 的授权 URL 和 state 值
 * @throws {TypeError} 当 appId 或 redirectUri 为空时
 */
export const generateAuthUrlWithState = (
  options: Omit<AuthUrlOptions, 'state'>
): { url: string; state: string } => {
  // 使用 UUID 生成更安全的随机 state（兼容浏览器和 Node.js）
  const state = generateUUID();
  const url = generateAuthUrl({ ...options, state });
  return { url, state };
};
