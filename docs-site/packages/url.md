---
layout: doc
---

# @genlib/toolkit-url

查询串与 URL 构建工具（ESM 优先、可树摇）。

## 安装

```bash
pnpm add @genlib/toolkit-url
```

## API

### 查询字符串操作

#### `toQuery(obj: Record<string, unknown>): string`

将对象转换为查询字符串。

**参数：**
- `obj` - 要转换的对象

**返回：** 查询字符串，例如：`'a=1&b=2&c=hello'`

**示例：**
```typescript
import { toQuery } from '@genlib/toolkit-url';

toQuery({ a: 1, b: 'x y' }); // 'a=1&b=x+y'
toQuery({ tags: ['a', 'b', 'c'] }); // 'tags=a&tags=b&tags=c'
toQuery({ name: 'hello world', value: 'x&y=z' }); // 'name=hello+world&value=x%26y%3Dz'
```

#### `fromQuery(q: string): Record<string, string>`

将查询字符串解析为对象。

**参数：**
- `q` - 查询字符串，例如：`'a=1&b=2'` 或 `'?a=1&b=2'`

**返回：** 解析后的对象

**示例：**
```typescript
import { fromQuery } from '@genlib/toolkit-url';

fromQuery('a=1&b=hello'); // { a: '1', b: 'hello' }
fromQuery('?a=1&b=2'); // { a: '1', b: '2' }
fromQuery('name=hello+world&value=x%26y'); // { name: 'hello world', value: 'x&y' }
```

#### `getQueryParam(query: string, key: string, defaultValue?: string): string | undefined`

从查询字符串中获取单个参数值。

**参数：**
- `query` - 查询字符串
- `key` - 参数名
- `defaultValue` - 默认值（如果参数不存在）

**返回：** 参数值，如果不存在则返回 `undefined` 或 `defaultValue`

**示例：**
```typescript
import { getQueryParam } from '@genlib/toolkit-url';

getQueryParam('a=1&b=2', 'a'); // '1'
getQueryParam('a=1&b=2', 'c'); // undefined
getQueryParam('a=1&b=2', 'c', 'default'); // 'default'
```

#### `getUrlParam(urlOrQuery: string, key: string, defaultValue?: string): string | undefined`

从完整 URL 或查询字符串中获取查询参数。

**参数：**
- `urlOrQuery` - URL 或查询字符串
- `key` - 参数名
- `defaultValue` - 默认值（如果参数不存在）

**返回：** 参数值

**示例：**
```typescript
import { getUrlParam } from '@genlib/toolkit-url';

getUrlParam('https://example.com?a=1&b=2', 'a'); // '1'
getUrlParam('a=1&b=2', 'a'); // '1'
getUrlParam('https://example.com?a=1', 'b', 'default'); // 'default'
```

### URL 构建与更新

#### `buildUrl(base: string, params?: Record<string, unknown>): string`

构建完整的 URL，支持添加查询参数。

**参数：**
- `base` - 基础 URL 或路径
- `params` - 查询参数对象（可选）

**返回：** 完整的 URL

**示例：**
```typescript
import { buildUrl } from '@genlib/toolkit-url';

buildUrl('/api', { a: 1, b: 'hello' }); // '/api?a=1&b=hello'
buildUrl('https://example.com/api', { id: 123 }); // 'https://example.com/api?id=123'
buildUrl('/api?x=1', { a: 2 }); // '/api?x=1&a=2'
buildUrl('/api'); // '/api'
```

#### `updateQuery(url: string, params: Record<string, unknown>, replace?: boolean): string`

更新 URL 中的查询参数。

**参数：**
- `url` - 原始 URL
- `params` - 要更新的参数对象
- `replace` - 是否替换所有现有参数（默认 `false`，合并）

**返回：** 更新后的 URL

**示例：**
```typescript
import { updateQuery } from '@genlib/toolkit-url';

// 合并查询参数
updateQuery('/api?a=1&b=2', { c: 3 }); // '/api?a=1&b=2&c=3'
updateQuery('/api?a=1&b=2', { b: 3 }); // '/api?a=1&b=3'

// 替换所有查询参数
updateQuery('/api?a=1&b=2', { c: 3 }, true); // '/api?c=3'

// 处理完整 URL
updateQuery('https://example.com/api?a=1', { b: 2 });
```

### URL 解析

#### `parseUrl(url: string): object`

解析 URL 为各个组成部分。

**参数：**
- `url` - 要解析的 URL

**返回：** 解析后的 URL 对象，包含以下属性：
- `protocol` - 协议（例如：`'https:'`）
- `host` - 主机（包含端口）
- `hostname` - 主机名
- `port` - 端口
- `pathname` - 路径
- `search` - 查询字符串（包含 `?`）
- `searchParams` - 查询参数对象
- `hash` - 锚点（包含 `#`）
- `origin` - 源（协议 + 主机）

**示例：**
```typescript
import { parseUrl } from '@genlib/toolkit-url';

const parsed = parseUrl('https://example.com:8080/path?a=1&b=2#hash');
// {
//   protocol: 'https:',
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   port: '8080',
//   pathname: '/path',
//   search: '?a=1&b=2',
//   searchParams: { a: '1', b: '2' },
//   hash: '#hash',
//   origin: 'https://example.com:8080'
// }

// 相对路径
parseUrl('/path/to?query=1#hash');
```

#### `isValidUrl(url: string, protocols?: string[]): boolean`

验证字符串是否为有效的 URL。

**参数：**
- `url` - 要验证的字符串
- `protocols` - 允许的协议列表（默认：`['http:', 'https:']`）

**返回：** 是否为有效 URL

**示例：**
```typescript
import { isValidUrl } from '@genlib/toolkit-url';

isValidUrl('https://example.com'); // true
isValidUrl('http://example.com'); // true
isValidUrl('not-a-url'); // false
isValidUrl('ftp://example.com', ['ftp:']); // true
isValidUrl('https://example.com', ['http:']); // false
```

### URL 路径操作

#### `joinUrl(base: string, ...paths: string[]): string`

拼接 URL 路径，正确处理斜杠。

**参数：**
- `base` - 基础路径
- `paths` - 要拼接的路径片段（可变参数）

**返回：** 拼接后的路径

**示例：**
```typescript
import { joinUrl } from '@genlib/toolkit-url';

joinUrl('https://example.com', 'api', 'users'); // 'https://example.com/api/users'
joinUrl('https://example.com/', '/api/', '/users/'); // 'https://example.com/api/users'
joinUrl('/base', 'a', 'b', 'c'); // '/base/a/b/c'
```

#### `cleanUrl(url: string): string`

移除 URL 中的查询参数和 hash。

**参数：**
- `url` - 原始 URL

**返回：** 清理后的 URL

**示例：**
```typescript
import { cleanUrl } from '@genlib/toolkit-url';

cleanUrl('https://example.com/path?a=1&b=2#hash'); // 'https://example.com/path'
cleanUrl('/path?a=1#hash'); // '/path'
cleanUrl('/path'); // '/path'
```

#### `getBaseUrl(url: string): string`

获取 URL 的基础路径（协议 + 主机）。

**参数：**
- `url` - 原始 URL

**返回：** 基础路径，例如：`'https://example.com'`。如果是相对路径，返回空字符串。

**示例：**
```typescript
import { getBaseUrl } from '@genlib/toolkit-url';

getBaseUrl('https://example.com:8080/path?a=1'); // 'https://example.com:8080'
getBaseUrl('http://example.com/api'); // 'http://example.com'
getBaseUrl('/path/to'); // ''
```

## 完整示例

```typescript
import {
  toQuery,
  fromQuery,
  buildUrl,
  updateQuery,
  parseUrl,
  isValidUrl,
  joinUrl,
  cleanUrl,
  getBaseUrl,
} from '@genlib/toolkit-url';

// 构建 API 请求 URL
const apiUrl = buildUrl('https://api.example.com/v1', {
  page: 1,
  limit: 20,
  sort: 'created_at',
});
// 'https://api.example.com/v1?page=1&limit=20&sort=created_at'

// 更新分页参数
const nextPageUrl = updateQuery(apiUrl, { page: 2 });
// 'https://api.example.com/v1?page=2&limit=20&sort=created_at'

// 解析 URL
const parsed = parseUrl(nextPageUrl);
console.log(parsed.searchParams.page); // '2'

// 验证用户输入的 URL
if (isValidUrl(userInput)) {
  const base = getBaseUrl(userInput);
  const clean = cleanUrl(userInput);
  // 处理安全的 URL
}
```
