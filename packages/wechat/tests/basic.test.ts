import { describe, expect, it, vi } from 'vitest';
import {
  generateAuthUrl,
  generateAuthUrlWithState,
  getAccessToken,
  refreshAccessToken,
  verifyAccessToken,
  getUserInfo,
} from '../src/index';

describe('generateAuthUrl', () => {
  it('should generate auth URL with default scope', () => {
    const url = generateAuthUrl({
      appId: 'test-appid',
      redirectUri: 'https://example.com/callback',
    });
    expect(url).toContain('appid=test-appid');
    expect(url).toContain('redirect_uri=https%3A%2F%2Fexample.com%2Fcallback');
    expect(url).toContain('scope=snsapi_base');
    expect(url).toContain('#wechat_redirect');
  });

  it('should generate auth URL with snsapi_userinfo scope', () => {
    const url = generateAuthUrl({
      appId: 'test-appid',
      redirectUri: 'https://example.com/callback',
      scope: 'snsapi_userinfo',
    });
    expect(url).toContain('scope=snsapi_userinfo');
  });

  it('should include state in URL', () => {
    const url = generateAuthUrl({
      appId: 'test-appid',
      redirectUri: 'https://example.com/callback',
      state: 'test-state',
    });
    expect(url).toContain('state=test-state');
  });
});

describe('generateAuthUrlWithState', () => {
  it('should generate URL with random state', () => {
    const result = generateAuthUrlWithState({
      appId: 'test-appid',
      redirectUri: 'https://example.com/callback',
    });
    expect(result.url).toContain('state=');
    expect(result.state).toBeTruthy();
    expect(result.state.length).toBeGreaterThan(0);
  });

  it('should include state in generated URL', () => {
    const result = generateAuthUrlWithState({
      appId: 'test-appid',
      redirectUri: 'https://example.com/callback',
    });
    expect(result.url).toContain(`state=${result.state}`);
  });
});

describe('getAccessToken', () => {
  it('should call correct API endpoint', async () => {
    const mockResponse = {
      access_token: 'test-token',
      expires_in: 7200,
      refresh_token: 'test-refresh',
      openid: 'test-openid',
      scope: 'snsapi_base',
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mockResponse,
    });

    const result = await getAccessToken('appid', 'secret', 'code');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('oauth2/access_token')
    );
    expect(result.access_token).toBe('test-token');
    expect(result.openid).toBe('test-openid');
  });

  it('should throw error on API error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ errcode: 40029, errmsg: 'invalid code' }),
    });

    await expect(getAccessToken('appid', 'secret', 'code')).rejects.toThrow();
  });
});

describe('refreshAccessToken', () => {
  it('should call correct API endpoint', async () => {
    const mockResponse = {
      access_token: 'new-token',
      expires_in: 7200,
      refresh_token: 'new-refresh',
      openid: 'test-openid',
      scope: 'snsapi_base',
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mockResponse,
    });

    const result = await refreshAccessToken('appid', 'refresh-token');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('oauth2/refresh_token')
    );
    expect(result.access_token).toBe('new-token');
  });
});

describe('verifyAccessToken', () => {
  it('should return true for valid token', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ errcode: 0 }),
    });

    const result = await verifyAccessToken('token', 'openid');
    expect(result).toBe(true);
  });

  it('should return false for invalid token', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ errcode: 40003, errmsg: 'invalid access_token' }),
    });

    const result = await verifyAccessToken('token', 'openid');
    expect(result).toBe(false);
  });
});

describe('getUserInfo', () => {
  it('should call correct API endpoint', async () => {
    const mockResponse = {
      openid: 'test-openid',
      nickname: '测试用户',
      sex: 1,
      province: '北京',
      city: '北京',
      country: '中国',
      headimgurl: 'https://example.com/avatar.jpg',
      privilege: [],
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mockResponse,
    });

    const result = await getUserInfo('token', 'openid');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('userinfo')
    );
    expect(result.nickname).toBe('测试用户');
  });

  it('should throw error on API error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ errcode: 40003, errmsg: 'invalid access_token' }),
    });

    await expect(getUserInfo('token', 'openid')).rejects.toThrow();
  });
});

