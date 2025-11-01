import type { UserInfoResponse, WeChatErrorResponse } from './types';
import { WeChatError } from './types';

const API_BASE = 'https://api.weixin.qq.com/sns';

/**
 * 检查 API 响应是否包含错误
 */
const checkWeChatError = (data: unknown): data is WeChatErrorResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'errcode' in data &&
    typeof (data as { errcode: unknown }).errcode === 'number' &&
    (data as { errcode: number }).errcode !== 0
  );
};

/**
 * 获取用户信息（需要 scope 为 snsapi_userinfo）
 * @param accessToken - Access Token
 * @param openid - 用户 OpenID
 * @param lang - 语言（默认：zh_CN），可选值：zh_CN（简体中文）、zh_TW（繁体中文）、en（英文）
 * @returns 用户信息
 * @throws {TypeError} 当参数无效时
 * @throws {WeChatError} 当微信 API 返回错误时
 * @throws {Error} 当网络请求失败时
 */
export const getUserInfo = async (
  accessToken: string,
  openid: string,
  lang: 'zh_CN' | 'zh_TW' | 'en' = 'zh_CN'
): Promise<UserInfoResponse> => {
  if (!accessToken || typeof accessToken !== 'string') {
    throw new TypeError('accessToken 必须是非空字符串');
  }

  if (!openid || typeof openid !== 'string') {
    throw new TypeError('openid 必须是非空字符串');
  }

  if (lang && !['zh_CN', 'zh_TW', 'en'].includes(lang)) {
    throw new TypeError('lang 必须是 "zh_CN"、"zh_TW" 或 "en" 之一');
  }

  const url = new URL(`${API_BASE}/userinfo`);
  url.searchParams.set('access_token', accessToken);
  url.searchParams.set('openid', openid);
  url.searchParams.set('lang', lang);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP 错误: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as UserInfoResponse | WeChatErrorResponse;

    if (checkWeChatError(data)) {
      throw WeChatError.fromResponse(data);
    }

    // 验证响应数据完整性
    if (
      !('openid' in data) ||
      !('nickname' in data) ||
      typeof data.openid !== 'string' ||
      typeof data.nickname !== 'string'
    ) {
      throw new Error('微信 API 返回的数据格式不正确');
    }

    return data as UserInfoResponse;
  } catch (error) {
    if (error instanceof WeChatError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw error;
    }

    throw new Error(`获取用户信息失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
};
