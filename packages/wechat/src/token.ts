import type {
  AccessTokenResponse,
  RefreshTokenResponse,
  VerifyTokenResponse,
  WeChatErrorResponse,
} from './types';
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
 * 使用 code 换取 access_token
 * @param appId - 微信 AppID
 * @param appSecret - 微信 AppSecret
 * @param code - 授权码
 * @returns Access Token 信息
 * @throws {TypeError} 当参数无效时
 * @throws {WeChatError} 当微信 API 返回错误时
 * @throws {Error} 当网络请求失败时
 */
export const getAccessToken = async (
  appId: string,
  appSecret: string,
  code: string
): Promise<AccessTokenResponse> => {
  if (!appId || typeof appId !== 'string') {
    throw new TypeError('appId 必须是非空字符串');
  }

  if (!appSecret || typeof appSecret !== 'string') {
    throw new TypeError('appSecret 必须是非空字符串');
  }

  if (!code || typeof code !== 'string') {
    throw new TypeError('code 必须是非空字符串');
  }

  const url = new URL(`${API_BASE}/oauth2/access_token`);
  url.searchParams.set('appid', appId);
  url.searchParams.set('secret', appSecret);
  url.searchParams.set('code', code);
  url.searchParams.set('grant_type', 'authorization_code');

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP 错误: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as AccessTokenResponse | WeChatErrorResponse;

    if (checkWeChatError(data)) {
      throw WeChatError.fromResponse(data);
    }

    // 验证响应数据完整性
    if (
      !('access_token' in data) ||
      !('openid' in data) ||
      typeof data.access_token !== 'string' ||
      typeof data.openid !== 'string'
    ) {
      throw new Error('微信 API 返回的数据格式不正确');
    }

    return data as AccessTokenResponse;
  } catch (error) {
    if (error instanceof WeChatError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw error;
    }

    throw new Error(`获取 access_token 失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
};

/**
 * 刷新 access_token
 * @param appId - 微信 AppID
 * @param refreshToken - 刷新令牌
 * @returns 新的 Access Token 信息
 * @throws {TypeError} 当参数无效时
 * @throws {WeChatError} 当微信 API 返回错误时
 * @throws {Error} 当网络请求失败时
 */
export const refreshAccessToken = async (
  appId: string,
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  if (!appId || typeof appId !== 'string') {
    throw new TypeError('appId 必须是非空字符串');
  }

  if (!refreshToken || typeof refreshToken !== 'string') {
    throw new TypeError('refreshToken 必须是非空字符串');
  }

  const url = new URL(`${API_BASE}/oauth2/refresh_token`);
  url.searchParams.set('appid', appId);
  url.searchParams.set('refresh_token', refreshToken);
  url.searchParams.set('grant_type', 'refresh_token');

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP 错误: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as RefreshTokenResponse | WeChatErrorResponse;

    if (checkWeChatError(data)) {
      throw WeChatError.fromResponse(data);
    }

    // 验证响应数据完整性
    if (
      !('access_token' in data) ||
      !('openid' in data) ||
      typeof data.access_token !== 'string' ||
      typeof data.openid !== 'string'
    ) {
      throw new Error('微信 API 返回的数据格式不正确');
    }

    return data as RefreshTokenResponse;
  } catch (error) {
    if (error instanceof WeChatError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw error;
    }

    throw new Error(`刷新 access_token 失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
};

/**
 * 验证 access_token 是否有效
 * @param accessToken - Access Token
 * @param openid - 用户 OpenID
 * @returns 是否有效
 * @throws {TypeError} 当参数无效时
 */
export const verifyAccessToken = async (
  accessToken: string,
  openid: string
): Promise<boolean> => {
  if (!accessToken || typeof accessToken !== 'string') {
    throw new TypeError('accessToken 必须是非空字符串');
  }

  if (!openid || typeof openid !== 'string') {
    throw new TypeError('openid 必须是非空字符串');
  }

  const url = new URL(`${API_BASE}/auth`);
  url.searchParams.set('access_token', accessToken);
  url.searchParams.set('openid', openid);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as VerifyTokenResponse;
    return data.errcode === 0 || !data.errcode;
  } catch {
    return false;
  }
};
