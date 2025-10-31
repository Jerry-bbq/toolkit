# @genlib/toolkit

企业级前端工具函数库（浏览器 + Node），ESM 优先、CJS 兼容、按需导入、可树摇。

## 特性

- ✅ ESM 优先 + CJS 兼容，`exports` 精确映射
- ✅ 按需导入与树摇：`"sideEffects": false`、多入口/子路径导出
- ✅ TypeScript 严格类型，公共签名由 API Extractor 锁定
- ✅ Monorepo 多子包，职责清晰、独立发版

## 安装

```bash
pnpm add @genlib/toolkit-core
# 或安装其他子包
pnpm add @genlib/toolkit-{date,money,tree,url}
```

## 快速开始

\`\`\`ts
import { pick, clamp } from '@genlib/toolkit-core';
import { toQuery } from '@genlib/toolkit-url';
import { findById } from '@genlib/toolkit-tree';

// 使用
const obj = { a: 1, b: 2, c: 3 };
const selected = pick(obj, ['a', 'c']); // { a: 1, c: 3 }
\`\`\`

## 子包

- [Core](./packages/core.md) - 核心工具函数
- [Date](./packages/date.md) - 日期工具
- [Money](./packages/money.md) - 金额工具
- [Tree](./packages/tree.md) - 树结构工具
- [URL](./packages/url.md) - URL 工具
