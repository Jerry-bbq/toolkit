---
layout: home

hero:
  name: "@genlib/toolkit"
  text: "前端工具函数库"
  tagline: ESM 优先、CJS 兼容、按需导入、可树摇，内置类型、测试与 CI
  image:
    src: /logo.png
    alt: "@genlib/toolkit"
  actions:
    - theme: brand
      text: 快速开始
      link: /packages/core
    - theme: alt
      text: GitHub
      link: https://github.com/Jerry-bbq/toolkit

features:
  - icon: ⚡️
    title: ESM 优先 + CJS 兼容
    details: exports 精确映射，支持现代和传统模块系统
  - icon: 🌲
    title: 按需导入与树摇
    details: 'sideEffects: false、多入口/子路径导出，最小化打包体积'
  - icon: 📘
    title: TypeScript 严格类型
    details: 完整的类型支持，公共签名由 API Extractor 锁定
  - icon: 📦
    title: Monorepo 多子包
    details: 职责清晰、独立发版，按需安装
  - icon: ✅
    title: 覆盖率与基准
    details: Vitest + 覆盖率阈值、tinybench 性能测试
  - icon: 🔄
    title: CI/CD 全流程
    details: 构建/测试/静态检查/签名/基准全流程自动化
---

## 安装

建议使用 pnpm（也支持 npm/yarn）：

```bash
pnpm add @genlib/toolkit-core
# 按需选择其它子包
pnpm add @genlib/toolkit-{date,is,money,tree,url}
```

## 使用（按需导入）

### 命名导入（推荐，树摇友好）

```typescript
import { pick } from '@genlib/toolkit-core';
import { clamp } from '@genlib/toolkit-core/number';
import { camelCase } from '@genlib/toolkit-core/string';
```

### 子路径导入

```typescript
import { uniqBy } from '@genlib/toolkit-core/array';
import { debounce } from '@genlib/toolkit-core/func';
```

### 单包示例

```typescript
import { toQuery, buildUrl } from '@genlib/toolkit-url';
import { isString, isNumber } from '@genlib/toolkit-is';
import { formatMoney } from '@genlib/toolkit-money';
import { addDays, formatDate } from '@genlib/toolkit-date';
```

::: warning 注意
避免 `import * as core from '@genlib/toolkit-core'` 再使用命名空间访问，以免影响摇树效果。
:::

## 子包

<div class="package-grid">

### @genlib/toolkit-core
核心函数（array/object/string/number/func）

[查看文档 →](/packages/core)

### @genlib/toolkit-date
日期工具（无全局 polyfill，显式 API）

[查看文档 →](/packages/date)

### @genlib/toolkit-is
类型检测库（参考 is 库重写，TypeScript 实现）

[查看文档 →](/packages/is)

### @genlib/toolkit-money
金额/精度/格式化

[查看文档 →](/packages/money)

### @genlib/toolkit-tree
树与扁平转换/查找

[查看文档 →](/packages/tree)

### @genlib/toolkit-url
查询串与 URL 构建

[查看文档 →](/packages/url)

### @genlib/toolkit-wechat
微信网页授权登录（OAuth 2.0）

[查看文档 →](/packages/wechat)

</div>

<style>
.package-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.package-grid h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.package-grid p {
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
}
</style>
