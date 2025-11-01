---
layout: doc
---

# @genlib/toolkit-wechat

微信网页授权登录工具（OAuth 2.0），支持生成授权 URL、获取 access_token、刷新 token、获取用户信息等功能。

## 安装

```bash
pnpm add @genlib/toolkit-wechat
```

## API

### 授权 URL 生成

#### `generateAuthUrl(options: AuthUrlOptions): string`

生成微信授权 URL。

**参数：**
- `options.appId` - 微信 AppID
- `options.redirectUri` - 授权回调地址（需要 URL 编码）
- `options.scope` - 授权范围，可选值：`'snsapi_base'`（默认，静默授权）或 `'snsapi_userinfo'`（需用户确认）
- `options.state` - 可选，用于防止 CSRF 攻击的随机字符串

**示例：**
```ts
import { generateAuthUrl } from '@genlib/toolkit-wechat';

const url = generateAuthUrl({
  appId: 'your-appid',
  redirectUri: 'https://example.com/callback',
  scope: 'snsapi_userinfo',
  state: 'random-state-string',
});
```

#### `generateAuthUrlWithState(options: Omit<AuthUrlOptions, 'state'>): { url: string; state: string }`

生成带随机 state 的授权 URL（推荐使用，防止 CSRF）。

**参数：**
- `options.appId` - 微信 AppID
- `options.redirectUri` - 授权回调地址
- `options.scope` - 授权范围

**返回值：**
- `url` - 授权 URL
- `state` - 生成的随机 state 字符串（需要保存用于验证）

**示例：**
```ts
import { generateAuthUrlWithState } from '@genlib/toolkit-wechat';

const { url, state } = generateAuthUrlWithState({
  appId: 'your-appid',
  redirectUri: 'https://example.com/callback',
  scope: 'snsapi_userinfo',
});

// 保存 state 到 session，用于验证回调
sessionStorage.setItem('wechat_state', state);
window.location.href = url;
```

### Token 操作

#### `getAccessToken(appId: string, appSecret: string, code: string): Promise<AccessTokenResponse>`

使用授权码换取 access_token。

**参数：**
- `appId` - 微信 AppID
- `appSecret` - 微信 AppSecret（⚠️ 必须保存在服务器端）
- `code` - 授权码（从回调 URL 中获取）

**返回值：**
```ts
interface AccessTokenResponse {
  access_token: string;      // 访问令牌
  expires_in: number;         // 过期时间（秒）
  refresh_token: string;      // 刷新令牌
  openid: string;            // 用户唯一标识
  scope: string;             // 授权范围
}
```

**示例：**
```ts
import { getAccessToken } from '@genlib/toolkit-wechat';

// ⚠️ 必须在服务器端执行，不要暴露 appSecret
const tokenData = await getAccessToken(
  process.env.WECHAT_APP_ID!,
  process.env.WECHAT_APP_SECRET!,
  code
);

console.log(tokenData.access_token);
console.log(tokenData.openid);
```

#### `refreshAccessToken(appId: string, refreshToken: string): Promise<RefreshTokenResponse>`

刷新 access_token（当 token 过期时使用）。

**参数：**
- `appId` - 微信 AppID
- `refreshToken` - 刷新令牌

**示例：**
```ts
import { refreshAccessToken } from '@genlib/toolkit-wechat';

const newToken = await refreshAccessToken(
  'your-appid',
  oldTokenData.refresh_token
);
```

#### `verifyAccessToken(accessToken: string, openid: string): Promise<boolean>`

验证 access_token 是否有效。

**参数：**
- `accessToken` - 访问令牌
- `openid` - 用户 OpenID

**返回值：** `true` 表示有效，`false` 表示无效或已过期

**示例：**
```ts
import { verifyAccessToken } from '@genlib/toolkit-wechat';

const isValid = await verifyAccessToken(accessToken, openid);
if (!isValid) {
  // Token 已过期，需要刷新
  const newToken = await refreshAccessToken(appId, refreshToken);
}
```

### 用户信息

#### `getUserInfo(accessToken: string, openid: string, lang?: string): Promise<UserInfoResponse>`

获取用户信息（需要 scope 为 `snsapi_userinfo`）。

**参数：**
- `accessToken` - 访问令牌
- `openid` - 用户 OpenID
- `lang` - 语言，默认为 `'zh_CN'`

**返回值：**
```ts
interface UserInfoResponse {
  openid: string;           // 用户唯一标识
  nickname: string;          // 用户昵称
  sex: number;              // 性别（0：未知，1：男，2：女）
  province: string;         // 省份
  city: string;             // 城市
  country: string;          // 国家
  headimgurl: string;        // 头像 URL
  privilege: string[];       // 用户特权信息
  unionid?: string;         // 用户统一标识（需要在开放平台绑定）
}
```

**示例：**
```ts
import { getUserInfo } from '@genlib/toolkit-wechat';

const userInfo = await getUserInfo(accessToken, openid);
console.log(userInfo.nickname);
console.log(userInfo.headimgurl);
```

## 完整示例

### 前端：生成授权 URL 并跳转

```ts
import { generateAuthUrlWithState } from '@genlib/toolkit-wechat';

function handleWeChatLogin() {
  const { url, state } = generateAuthUrlWithState({
    appId: 'your-appid',
    redirectUri: 'https://example.com/auth/callback',
    scope: 'snsapi_userinfo',
  });

  // 保存 state 到 session
  sessionStorage.setItem('wechat_state', state);

  // 跳转到微信授权页面
  window.location.href = url;
}
```

### 回调页面：验证 state 并发送 code 到服务器

```ts
// 回调页面：/auth/callback
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const returnedState = urlParams.get('state');

// 验证 state（防止 CSRF）
const storedState = sessionStorage.getItem('wechat_state');
if (returnedState !== storedState) {
  alert('授权失败：State 不匹配');
  return;
}

// 发送 code 到服务器端换取 token
const response = await fetch('/api/wechat/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ code }),
});

const { userInfo, token } = await response.json();
// 保存用户信息和 token，完成登录
```

### 服务器端：处理授权并返回用户信息

```ts
// Next.js API Route: /api/wechat/auth
import { getAccessToken, getUserInfo } from '@genlib/toolkit-wechat';

export async function POST(request: Request) {
  const { code } = await request.json();

  try {
    // 1. 使用 code 换取 access_token
    const tokenData = await getAccessToken(
      process.env.WECHAT_APP_ID!,
      process.env.WECHAT_APP_SECRET!,
      code
    );

    // 2. 获取用户信息
    const userInfo = await getUserInfo(
      tokenData.access_token,
      tokenData.openid
    );

    // 3. 保存用户信息到数据库，生成 JWT token 等
    // ...

    return Response.json({
      userInfo,
      token: 'your-jwt-token',
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    );
  }
}
```

## 注意事项

### 1. 安全提示

- **⚠️ appSecret 必须保存在服务器端**，不要暴露在前端代码中
- 使用 `generateAuthUrlWithState` 生成 state 参数，防止 CSRF 攻击
- `access_token` 有时效性（约 2 小时），需要及时刷新或重新获取

### 2. 授权 scope 说明

- **`snsapi_base`**：静默授权，用户无感知，仅获取 openid，适合仅需要用户标识的场景
- **`snsapi_userinfo`**：需要用户确认，可获取昵称、头像等详细信息，适合需要用户资料的场景

### 3. 域名配置

- 在[微信公众平台](https://mp.weixin.qq.com)配置授权回调域名
- 仅允许配置的域名进行授权，不支持 IP 地址
- 测试号也需要配置回调域名

### 4. 错误处理

所有 API 函数在微信接口返回错误时会抛出异常，建议使用 try-catch 捕获：

```ts
try {
  const tokenData = await getAccessToken(appId, appSecret, code);
} catch (error) {
  console.error('获取 token 失败:', error.message);
  // 处理错误
}
```

### 5. 环境要求

- Node.js >= 18（使用原生 `fetch` API）
- 在浏览器中使用时，需要支持 `fetch` API（现代浏览器均支持）

## 相关文档

- [微信官方文档：网页授权获取用户基本信息](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

