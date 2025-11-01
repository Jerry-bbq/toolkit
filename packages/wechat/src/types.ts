/**
 * 授权 URL 选项
 */
export interface AuthUrlOptions {
  appId: string;
  redirectUri: string;
  scope?: 'snsapi_base' | 'snsapi_userinfo';
  state?: string;
}

/**
 * Access Token 响应
 */
export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  openid: string;
  scope: string;
}

/**
 * 刷新 Token 响应
 */
export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  openid: string;
  scope: string;
}

/**
 * 用户信息响应
 */
export interface UserInfoResponse {
  openid: string;
  nickname: string;
  sex: number;
  province: string;
  city: string;
  country: string;
  headimgurl: string;
  privilege: string[];
  unionid?: string;
}

/**
 * 验证 Token 响应
 */
export interface VerifyTokenResponse {
  errcode?: number;
  errmsg?: string;
}
