import { describe, expect, it, vi } from 'vitest';
import {
  generateAuthUrl,
  generateAuthUrlWithState,
  getAccessToken,
  refreshAccessToken,
  verifyAccessToken,
  getUserInfo,
  WeChatError,
  WeChatErrorCode,
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
  it('should generate URL with UUID state', () => {
    const result = generateAuthUrlWithState({
      appId: 'test-appid',
      redirectUri: 'https://example.com/callback',
    });
    expect(result.url).toContain('state=');
    expect(result.state).toBeTruthy();
    // UUID v4 格式：xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx（36 个字符）
    expect(result.state).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('should include state in generated URL', () => {
    const result = generateAuthUrlWithState({
      appId: 'test-appid',
      redirectUri: 'https://example.com/callback',
    });
    expect(result.url).toContain(`state=${encodeURIComponent(result.state)}`);
  });

  it('should throw TypeError for invalid appId', () => {
    expect(() => {
      generateAuthUrlWithState({
        appId: '',
        redirectUri: 'https://example.com/callback',
      });
    }).toThrow(TypeError);
  });

  it('should throw TypeError for invalid redirectUri', () => {
    expect(() => {
      generateAuthUrlWithState({
        appId: 'test-appid',
        redirectUri: '',
      });
    }).toThrow(TypeError);
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
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getAccessToken('appid', 'secret', 'code');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('oauth2/access_token')
    );
    expect(result.access_token).toBe('test-token');
    expect(result.openid).toBe('test-openid');
  });

  it('should throw WeChatError on API error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ errcode: 40029, errmsg: 'invalid code' }),
    });

    await expect(getAccessToken('appid', 'secret', 'code')).rejects.toThrow(WeChatError);
    try {
      await getAccessToken('appid', 'secret', 'code');
    } catch (error) {
      expect(error).toBeInstanceOf(WeChatError);
      if (error instanceof WeChatError) {
        expect(error.errcode).toBe(40029);
        expect(error.errmsg).toBe('invalid code');
        expect(error.is(WeChatErrorCode.INVALID_OAUTH_CODE)).toBe(true);
      }
    }
  });

  it('should throw TypeError for invalid parameters', async () => {
    await expect(getAccessToken('', 'secret', 'code')).rejects.toThrow(TypeError);
    await expect(getAccessToken('appid', '', 'code')).rejects.toThrow(TypeError);
    await expect(getAccessToken('appid', 'secret', '')).rejects.toThrow(TypeError);
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
      ok: true,
      json: async () => mockResponse,
    });

    const result = await refreshAccessToken('appid', 'refresh-token');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('oauth2/refresh_token')
    );
    expect(result.access_token).toBe('new-token');
  });

  it('should throw TypeError for invalid parameters', async () => {
    await expect(refreshAccessToken('', 'refresh-token')).rejects.toThrow(TypeError);
    await expect(refreshAccessToken('appid', '')).rejects.toThrow(TypeError);
  });
});

describe('verifyAccessToken', () => {
  it('should return true for valid token', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ errcode: 0 }),
    });

    const result = await verifyAccessToken('token', 'openid');
    expect(result).toBe(true);
  });

  it('should return false for invalid token', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ errcode: 40003, errmsg: 'invalid access_token' }),
    });

    const result = await verifyAccessToken('token', 'openid');
    expect(result).toBe(false);
  });

  it('should throw TypeError for invalid parameters', async () => {
    await expect(verifyAccessToken('', 'openid')).rejects.toThrow(TypeError);
    await expect(verifyAccessToken('token', '')).rejects.toThrow(TypeError);
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
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getUserInfo('token', 'openid');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('userinfo')
    );
    expect(result.nickname).toBe('测试用户');
  });

  it('should throw WeChatError on API error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ errcode: 40003, errmsg: 'invalid access_token' }),
    });

    await expect(getUserInfo('token', 'openid')).rejects.toThrow(WeChatError);
  });

  it('should throw TypeError for invalid parameters', async () => {
    await expect(getUserInfo('', 'openid')).rejects.toThrow(TypeError);
    await expect(getUserInfo('token', '')).rejects.toThrow(TypeError);
    await expect(getUserInfo('token', 'openid', 'invalid' as 'zh_CN')).rejects.toThrow(TypeError);
  });
});

