# @genlib/toolkit (Monorepo)

前端工具函数库（浏览器 + Node），ESM 优先、CJS 兼容、按需导入、可树摇，内置类型、测试与 CI。

## 特性
- ESM 优先 + CJS 兼容，`exports` 精确映射
- 按需导入与树摇：`"sideEffects": false`、多入口/子路径导出
- TypeScript 严格类型，公共签名由 API Extractor 锁定
- Monorepo 多子包，职责清晰、独立发版
- 覆盖率与基准：Vitest + 覆盖率阈值、tinybench
- CI：构建/测试/静态检查/签名/基准全流程

## 子包
- `@genlib/toolkit-core`：核心函数（array/object/string/number/func）
- `@genlib/toolkit-date`：日期工具（无全局 polyfill，显式 API）
- `@genlib/toolkit-money`：金额/精度/格式化
- `@genlib/toolkit-tree`：树与扁平转换/查找
- `@genlib/toolkit-url`：查询串与 URL 构建

## 安装
建议使用 pnpm（也支持 npm/yarn）：
```bash
pnpm add @genlib/toolkit-core
# 按需选择其它子包
pnpm add @genlib/toolkit-{date,money,tree,url}
```

## 使用（按需导入）
- 命名导入（推荐，树摇友好）：
```ts
import { pick } from '@genlib/toolkit-core';
import { clamp } from '@genlib/toolkit-core/number';
```

- 子路径导入：
```ts
import { uniqBy } from '@genlib/toolkit-core/array';
```

- 单包示例：
```ts
import { toQuery, buildUrl } from '@genlib/toolkit-url';
```

注意：避免 `import * as core from '@genlib/toolkit-core'` 再使用命名空间访问，以免影响摇树效果。

## 运行环境
- Node：>= 18
- 浏览器：现代 ESM 环境
- 不做全局 polyfill；如需兼容旧环境，请在应用侧自行处理。

## 项目脚本
- 构建：`pnpm run build`
- 测试：`pnpm run test`（已设覆盖率阈值）
- Lint：`pnpm run lint`（Biome 检查）
- 格式化：`pnpm run format`（Biome 格式化）
- 基准：`pnpm run bench`

## 目录结构
```
toolkit/
  packages/
    core/
    date/
    money/
    tree/
    url/
  .github/workflows/ci.yml
  turbo.json
  pnpm-workspace.yaml
```

## 版本与发布
- 使用 Changesets 进行语义化版本与变更日志管理。
- 首发已准备 changeset，发布时执行：
```bash
pnpm changeset version
pnpm -r build
pnpm changeset publish
```

## CI
GitHub Actions 在推送与 PR 时执行：构建、测试、Lint、API Extractor、基准（核心包）。

## 质量与安全
- 纯函数、不可变；有副作用的实现以显式命名区分
- 防原型污染、正则灾难等常见风险
- API 变更需通过 API Extractor 审核

## 贡献
欢迎提交 PR/Issue：
- 新增函数请附带类型定义、测试与文档片段
- 样式与命名遵循现有约定（动词命名、不可变输入）

## 路线图
- 扩充 `core` 常用函数集（get/set/merge 等已提供）
- `date` 时区/区间增强 API
- `money` 进位/舍入策略与货币规则扩展
- `tree` 更丰富的遍历与变换
- 文档站与示例仓库

## 📚 API 文档

### 本地开发文档站点
```bash
pnpm run docs:site
```
启动本地开发服务器，访问 http://localhost:5173 查看文档。

### 构建文档站点
```bash
pnpm run docs:build
```
构建后的文档位于 `docs-site/.vitepress/dist/` 目录。

### 预览构建后的文档
```bash
pnpm run docs:preview
```
预览构建后的文档，用于验证构建结果。

### 快速参考（各包 README）
- [@genlib/toolkit-core](./packages/core/README.md) - 核心工具函数
- [@genlib/toolkit-date](./packages/date/README.md) - 日期工具
- [@genlib/toolkit-money](./packages/money/README.md) - 金额工具
- [@genlib/toolkit-tree](./packages/tree/README.md) - 树结构工具
- [@genlib/toolkit-url](./packages/url/README.md) - URL 工具

### 部署文档站点
文档通过 GitHub Actions 自动部署到 GitHub Pages（参考 `.github/workflows/docs.yml`）。
