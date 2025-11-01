# @genlib/toolkit-url

查询串与 URL 构建工具（ESM 优先、可树摇）。

## 安装
```bash
pnpm add @genlib/toolkit-url
```

## API

### 查询字符串操作

- **`toQuery(obj: Record<string, unknown>): string`** - 将对象转换为查询字符串
- **`fromQuery(q: string): Record<string, string>`** - 将查询字符串解析为对象
- **`getQueryParam(query: string, key: string, defaultValue?: string): string | undefined`** - 从查询字符串中获取单个参数值
- **`getUrlParam(urlOrQuery: string, key: string, defaultValue?: string): string | undefined`** - 从完整 URL 或查询字符串中获取查询参数

### URL 构建与更新

- **`buildUrl(base: string, params?: Record<string, unknown>): string`** - 构建完整的 URL，支持添加查询参数
- **`updateQuery(url: string, params: Record<string, unknown>, replace?: boolean): string`** - 更新 URL 中的查询参数

### URL 解析

- **`parseUrl(url: string): object`** - 解析 URL 为各个组成部分（protocol, host, pathname, search, hash 等）
- **`isValidUrl(url: string, protocols?: string[]): boolean`** - 验证字符串是否为有效的 URL

### URL 路径操作

- **`joinUrl(base: string, ...paths: string[]): string`** - 拼接 URL 路径，正确处理斜杠
- **`cleanUrl(url: string): string`** - 移除 URL 中的查询参数和 hash
- **`getBaseUrl(url: string): string`** - 获取 URL 的基础路径（协议 + 主机）

## 示例

### 查询字符串操作

```ts
import { toQuery, fromQuery, getQueryParam, getUrlParam } from '@genlib/toolkit-url';

// 对象转查询字符串
toQuery({ a: 1, b: 'x y' }); // 'a=1&b=x+y'
toQuery({ tags: ['a', 'b'] }); // 'tags=a&tags=b'

// 查询字符串转对象
fromQuery('a=1&b=x+y'); // { a: '1', b: 'x y' }
fromQuery('?a=1&b=2'); // { a: '1', b: '2' }

// 获取单个参数
getQueryParam('a=1&b=2', 'a'); // '1'
getQueryParam('a=1&b=2', 'c', 'default'); // 'default'

// 从完整 URL 获取参数
getUrlParam('https://example.com?a=1&b=2', 'a'); // '1'
```

### URL 构建与更新

```ts
import { buildUrl, updateQuery } from '@genlib/toolkit-url';

// 构建 URL
buildUrl('/api', { a: 1, b: 'hello' }); // '/api?a=1&b=hello'
buildUrl('https://example.com/api', { id: 123 }); // 'https://example.com/api?id=123'

// 更新查询参数（合并）
updateQuery('/api?a=1&b=2', { c: 3 }); // '/api?a=1&b=2&c=3'
updateQuery('/api?a=1&b=2', { b: 3 }); // '/api?a=1&b=3'

// 替换所有查询参数
updateQuery('/api?a=1&b=2', { c: 3 }, true); // '/api?c=3'
```

### URL 解析

```ts
import { parseUrl, isValidUrl } from '@genlib/toolkit-url';

// 解析 URL
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

// 验证 URL
isValidUrl('https://example.com'); // true
isValidUrl('not-a-url'); // false
isValidUrl('ftp://example.com', ['ftp:']); // true
```

### URL 路径操作

```ts
import { joinUrl, cleanUrl, getBaseUrl } from '@genlib/toolkit-url';

// 拼接路径
joinUrl('https://example.com', 'api', 'users'); // 'https://example.com/api/users'
joinUrl('/base', 'a', 'b', 'c'); // '/base/a/b/c'

// 清理 URL
cleanUrl('https://example.com/path?a=1&b=2#hash'); // 'https://example.com/path'
cleanUrl('/path?a=1#hash'); // '/path'

// 获取基础 URL
getBaseUrl('https://example.com:8080/path?a=1'); // 'https://example.com:8080'
getBaseUrl('/path/to'); // ''
```
