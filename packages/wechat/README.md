# @genlib/toolkit-wechat

微信网页授权登录工具（OAuth 2.0），支持生成授权 URL、获取 access_token、刷新 token、获取用户信息等功能。

## 安装

```bash
pnpm add @genlib/toolkit-wechat
```

## API

### 授权 URL 生成

- **`generateAuthUrl(options: AuthUrlOptions): string`** - 生成微信授权 URL
- **`generateAuthUrlWithState(options: Omit<AuthUrlOptions, 'state'>): { url: string; state: string }`** - 生成带随机 state 的授权 URL（推荐，防止 CSRF）

### Token 操作

- **`getAccessToken(appId: string, appSecret: string, code: string): Promise<AccessTokenResponse>`** - 使用 code 换取 access_token
- **`refreshAccessToken(appId: string, refreshToken: string): Promise<RefreshTokenResponse>`** - 刷新 access_token
- **`verifyAccessToken(accessToken: string, openid: string): Promise<boolean>`** - 验证 access_token 是否有效

### 用户信息

- **`getUserInfo(accessToken: string, openid: string, lang?: string): Promise<UserInfoResponse>`** - 获取用户信息（需要 scope 为 `snsapi_userinfo`）

## 类型定义

```ts
interface AuthUrlOptions {
  appId: string;
  redirectUri: string;
  scope?: 'snsapi_base' | 'snsapi_userinfo';
  state?: string;
}

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  openid: string;
  scope: string;
}

interface UserInfoResponse {
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
```

## 示例

### 完整授权流程

```ts
import {
  generateAuthUrlWithState,
  getAccessToken,
  getUserInfo,
  refreshAccessToken,
  verifyAccessToken,
} from '@genlib/toolkit-wechat';

// 1. 生成授权 URL（推荐使用 generateAuthUrlWithState）
const { url, state } = generateAuthUrlWithState({
  appId: 'your-appid',
  redirectUri: 'https://example.com/callback',
  scope: 'snsapi_userinfo', // 或 'snsapi_base'（静默授权）
});

// 存储 state 到 session，用于验证回调
sessionStorage.setItem('wechat_state', state);

// 2. 跳转到授权页面
window.location.href = url;

// 3. 在回调页面处理授权码
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const returnedState = urlParams.get('state');

// 验证 state（防止 CSRF 攻击）
const storedState = sessionStorage.getItem('wechat_state');
if (returnedState !== storedState) {
  throw new Error('State 不匹配，可能存在 CSRF 攻击');
}

// 4. 使用 code 换取 access_token（服务器端操作）
const tokenData = await getAccessToken('your-appid', 'your-secret', code!);
console.log(tokenData.access_token);
console.log(tokenData.openid);

// 5. 获取用户信息（需要 snsapi_userinfo scope）
const userInfo = await getUserInfo(tokenData.access_token, tokenData.openid);
console.log(userInfo.nickname);
console.log(userInfo.headimgurl);

// 6. 验证 token 是否有效
const isValid = await verifyAccessToken(tokenData.access_token, tokenData.openid);
console.log('Token 有效:', isValid);

// 7. 刷新 token（当 access_token 过期时）
const newToken = await refreshAccessToken('your-appid', tokenData.refresh_token);
console.log('新的 access_token:', newToken.access_token);
```

### 基础授权（仅获取 openid）

```ts
import { generateAuthUrl, getAccessToken } from '@genlib/toolkit-wechat';

// 使用 snsapi_base（静默授权，不弹授权页面）
const url = generateAuthUrl({
  appId: 'your-appid',
  redirectUri: 'https://example.com/callback',
  scope: 'snsapi_base',
});

// 跳转后，在回调中获取 code 并换取 token
// token 中仅包含 openid，不包含用户详细信息
```

### 服务器端使用（Node.js/Next.js API Route）

```ts
// app/api/wechat/callback/route.ts
import { getAccessToken, getUserInfo } from '@genlib/toolkit-wechat';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return Response.json({ error: '缺少 code 参数' }, { status: 400 });
  }

  try {
    // 获取 access_token（appSecret 不要暴露在前端）
    const tokenData = await getAccessToken(
      process.env.WECHAT_APP_ID!,
      process.env.WECHAT_APP_SECRET!,
      code
    );

    // 如果需要用户信息，scope 必须是 snsapi_userinfo
    const userInfo = await getUserInfo(
      tokenData.access_token,
      tokenData.openid
    );

    // 这里可以保存用户信息到数据库，并生成 JWT token 等
    return Response.json({ userInfo });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    );
  }
}
```

## 注意事项

1. **安全提示**
   - `appSecret` 必须保存在服务器端，不要暴露在前端代码中
   - 使用 `generateAuthUrlWithState` 生成 state 参数，防止 CSRF 攻击
   - `access_token` 有时效性（约 2 小时），需要及时刷新

2. **授权 scope 说明**
   - `snsapi_base`：静默授权，用户无感知，仅获取 openid
   - `snsapi_userinfo`：需要用户确认，可获取昵称、头像等详细信息

3. **域名配置**
   - 在[微信公众平台](https://mp.weixin.qq.com)配置授权回调域名
   - 仅允许配置的域名进行授权，不支持 IP 地址

4. **错误处理**
   - 所有 API 函数在微信接口返回错误时会抛出异常
   - 建议使用 try-catch 捕获错误并处理

5. **环境要求**
   - 需要 Node.js >= 18（使用原生 `fetch` API）
   - 在浏览器中使用时，需要支持 `fetch` API

## 微信 API 文档

- [网页授权获取用户基本信息](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

