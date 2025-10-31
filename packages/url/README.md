# @genlib/toolkit-url

查询串与 URL 构建工具（ESM 优先、可树摇）。

## 安装
```bash
pnpm add @genlib/toolkit-url
```

## API
- `toQuery(obj: Record<string, unknown>): string`
- `fromQuery(q: string): Record<string,string>`
- `buildUrl(base: string, params?: Record<string, unknown>): string`

## 示例
```ts
import { toQuery, fromQuery, buildUrl } from '@genlib/toolkit-url';

toQuery({ a: 1, b: 'x y' }); // 'a=1&b=x%20y'
fromQuery('a=1&b=x%20y');    // { a: '1', b: 'x y' }
buildUrl('/api', { a: 1 });  // '/api?a=1'
```
