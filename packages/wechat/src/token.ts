import type { AccessTokenResponse, RefreshTokenResponse, VerifyTokenResponse } from './types';

const API_BASE = 'https://api.weixin.qq.com/sns';

/**
 * 使用 code 换取 access_token
 * @param appId - 微信 AppID
 * @param appSecret - 微信 AppSecret
 * @param code - 授权码
 * @returns Access Token 信息
 * @throws 如果请求失败，抛出错误
 */
export const getAccessToken = async (
  appId: string,
  appSecret: string,
  code: string
): Promise<AccessTokenResponse> => {
  const url = new URL(`${API_BASE}/oauth2/access_token`);
  url.searchParams.set('appid', appId);
  url.searchParams.set('secret', appSecret);
  url.searchParams.set('code', code);
  url.searchParams.set('grant_type', 'authorization_code');

  const response = await fetch(url.toString());
  const data = (await response.json()) as AccessTokenResponse & {
    errcode?: number;
    errmsg?: string;
  };

  if ('errcode' in data && data.errcode) {
    throw new Error(`获取 access_token 失败: ${data.errmsg || '未知错误'}`);
  }

  return data as AccessTokenResponse;
};

/**
 * 刷新 access_token
 * @param appId - 微信 AppID
 * @param refreshToken - 刷新令牌
 * @returns 新的 Access Token 信息
 * @throws 如果请求失败，抛出错误
 */
export const refreshAccessToken = async (
  appId: string,
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  const url = new URL(`${API_BASE}/oauth2/refresh_token`);
  url.searchParams.set('appid', appId);
  url.searchParams.set('refresh_token', refreshToken);
  url.searchParams.set('grant_type', 'refresh_token');

  const response = await fetch(url.toString());
  const data = (await response.json()) as RefreshTokenResponse & {
    errcode?: number;
    errmsg?: string;
  };

  if ('errcode' in data && data.errcode) {
    throw new Error(`刷新 access_token 失败: ${data.errmsg || '未知错误'}`);
  }

  return data as RefreshTokenResponse;
};

/**
 * 验证 access_token 是否有效
 * @param accessToken - Access Token
 * @param openid - 用户 OpenID
 * @returns 是否有效
 */
export const verifyAccessToken = async (accessToken: string, openid: string): Promise<boolean> => {
  const url = new URL(`${API_BASE}/auth`);
  url.searchParams.set('access_token', accessToken);
  url.searchParams.set('openid', openid);

  try {
    const response = await fetch(url.toString());
    const data = (await response.json()) as VerifyTokenResponse;
    return data.errcode === 0 || !data.errcode;
  } catch {
    return false;
  }
};
