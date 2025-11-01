import type { UserInfoResponse } from './types';

const API_BASE = 'https://api.weixin.qq.com/sns';

/**
 * 获取用户信息（需要 scope 为 snsapi_userinfo）
 * @param accessToken - Access Token
 * @param openid - 用户 OpenID
 * @param lang - 语言（默认：zh_CN）
 * @returns 用户信息
 * @throws 如果请求失败，抛出错误
 */
export const getUserInfo = async (
  accessToken: string,
  openid: string,
  lang = 'zh_CN'
): Promise<UserInfoResponse> => {
  const url = new URL(`${API_BASE}/userinfo`);
  url.searchParams.set('access_token', accessToken);
  url.searchParams.set('openid', openid);
  url.searchParams.set('lang', lang);

  const response = await fetch(url.toString());
  const data = (await response.json()) as UserInfoResponse & {
    errcode?: number;
    errmsg?: string;
  };

  if ('errcode' in data && data.errcode) {
    throw new Error(`获取用户信息失败: ${data.errmsg || '未知错误'}`);
  }

  return data as UserInfoResponse;
};
