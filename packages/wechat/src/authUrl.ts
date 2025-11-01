import type { AuthUrlOptions } from './types';

/**
 * 生成微信授权 URL
 * @param options - 授权选项
 * @returns 授权 URL
 */
export const generateAuthUrl = (options: AuthUrlOptions): string => {
  const { appId, redirectUri, scope = 'snsapi_base', state } = options;
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
 */
export const generateAuthUrlWithState = (
  options: Omit<AuthUrlOptions, 'state'>
): { url: string; state: string } => {
  // 生成随机 state（建议使用更安全的方式，如 crypto.randomUUID()）
  const state =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const url = generateAuthUrl({ ...options, state });
  return { url, state };
};
