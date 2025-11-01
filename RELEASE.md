# 发布指南

本文档详细说明如何将 `@genlib/toolkit` 系列包发布到 npm。

## 📋 目录

- [发布前准备](#发布前准备)
- [发布流程](#发布流程)
- [手动发布](#手动发布)
- [自动发布（推荐）](#自动发布推荐)
- [版本号规则](#版本号规则)
- [发布后验证](#发布后验证)
- [常见问题](#常见问题)

## 发布前准备

### 1. 确保 npm 账号和权限

#### 使用 Scoped Package (`@genlib/*`)

如果你使用 `@genlib` scope，需要：

1. **创建 npm Organization**
   - 访问 [npm 官网](https://www.npmjs.com/)
   - 创建名为 `genlib` 的 Organization
   - 邀请团队成员（如需要）

2. **创建 Access Token**
   ```bash
   # 登录 npm
   npm login
   
   # 创建 Token（选择 Automation 类型，用于 CI/CD）
   # 访问：https://www.npmjs.com/settings/<username>/tokens
   # 或使用命令行（需要 npm-cli-login）
   ```

#### 使用个人 Scope

如果不想创建 Organization，可以修改所有包的 `package.json` 中的 `name`：

```json
{
  "name": "@yourusername/toolkit-core",
  // ...
}
```

### 2. 配置 GitHub Secrets

在 GitHub 仓库设置中添加 NPM Token：

1. 访问仓库：`Settings` > `Secrets and variables` > `Actions`
2. 点击 `New repository secret`
3. 添加：
   - **Name**: `NPM_TOKEN`
   - **Value**: 你的 npm Access Token（Automation 类型）

### 3. 验证构建

发布前确保所有包可以正常构建：

```bash
# 清理并重新构建
pnpm run build

# 运行测试
pnpm run test

# 检查 lint
pnpm run lint
```

## 发布流程

项目使用 [Changesets](https://github.com/changesets/changesets) 管理版本和变更日志。

### Changesets 工作流程

1. **开发阶段**：创建 changeset 描述变更
2. **版本阶段**：合并 changeset，自动更新版本号和生成 CHANGELOG
3. **发布阶段**：自动构建并发布到 npm

## 手动发布

### 步骤 1: 创建 Changeset

当你完成功能开发或修复后，创建 changeset：

```bash
pnpm changeset
```

这会交互式地引导你：

1. **选择要发布变更的包**
   ```
   ? Which packages would you like to include?
   ❯◉ @genlib/toolkit-core
    ◯ @genlib/toolkit-date
    ◯ @genlib/toolkit-is
    # ... 其他包
   ```

2. **选择版本类型**
   ```
   ? What kind of change is this for @genlib/toolkit-core?
   ❯ patch  # 修复 bug，向后兼容
     minor  # 新功能，向后兼容
     major  # 破坏性变更
   ```

3. **输入变更描述**
   ```
   ? Please enter a summary for this change
   Add throttle and memoize functions to func module
   ```

完成后，会在 `.changeset/` 目录下生成一个 markdown 文件，例如：

```
.changeset/witty-dogs-sneeze.md
```

### 步骤 2: 提交 Changeset

```bash
git add .changeset
git commit -m "chore: add changeset for toolkit-core"
git push
```

### 步骤 3: 版本更新和发布

当 changeset 合并到 main 分支后，执行发布：

```bash
# 这会：
# 1. 读取所有 changeset
# 2. 更新版本号
# 3. 生成 CHANGELOG
# 4. 构建所有包
# 5. 发布到 npm
pnpm run release
```

**详细流程：**

```bash
# 步骤 3.1: 更新版本号（会根据 changeset 自动决定版本）
pnpm changeset version

# 步骤 3.2: 构建所有包
pnpm -r build

# 步骤 3.3: 发布到 npm
pnpm changeset publish
```

### 步骤 4: 提交版本更新

```bash
git add .
git commit -m "chore: release v1.0.1"
git push
git push --tags  # 推送版本标签
```

## 自动发布（推荐）

项目已配置 GitHub Actions 自动发布流程。

### 工作流程

1. **创建并提交 Changeset**
   ```bash
   pnpm changeset
   git add .changeset
   git commit -m "chore: add changeset"
   git push
   ```

2. **自动创建版本 PR**
   - GitHub Actions 检测到 changeset
   - 自动创建名为 "Version Packages" 的 PR
   - 包含版本更新和 CHANGELOG

3. **合并 PR 自动发布**
   - 合并版本 PR 到 main 分支
   - 自动触发发布 workflow
   - 自动构建并发布到 npm
   - 自动创建 Git Tag

### 查看自动发布状态

- GitHub Actions: `https://github.com/Jerry-bbq/toolkit/actions`
- 查看 `Release` workflow 的执行状态

## 版本号规则

遵循 [语义化版本控制](https://semver.org/lang/zh-CN/)：

- **MAJOR** (`1.0.0` → `2.0.0`): 破坏性变更
  - 移除或重命名 API
  - 修改函数签名
  - 删除导出

- **MINOR** (`1.0.0` → `1.1.0`): 向后兼容的新功能
  - 新增函数
  - 新增导出
  - 新增类型定义

- **PATCH** (`1.0.0` → `1.0.1`): 向后兼容的修复
  - Bug 修复
  - 性能优化
  - 文档更新

### 示例

```bash
# 修复 bug
pnpm changeset
# 选择: patch

# 新增功能
pnpm changeset
# 选择: minor

# 破坏性变更
pnpm changeset
# 选择: major
```

## 发布后验证

### 1. 检查 npm 包

访问 npm 包页面：

- [@genlib/toolkit-core](https://www.npmjs.com/package/@genlib/toolkit-core)
- [@genlib/toolkit-date](https://www.npmjs.com/package/@genlib/toolkit-date)
- [@genlib/toolkit-is](https://www.npmjs.com/package/@genlib/toolkit-is)
- [@genlib/toolkit-money](https://www.npmjs.com/package/@genlib/toolkit-money)
- [@genlib/toolkit-tree](https://www.npmjs.com/package/@genlib/toolkit-tree)
- [@genlib/toolkit-url](https://www.npmjs.com/package/@genlib/toolkit-url)
- [@genlib/toolkit-wechat](https://www.npmjs.com/package/@genlib/toolkit-wechat)

### 2. 测试安装

```bash
# 创建一个临时目录测试
mkdir test-install && cd test-install
npm init -y

# 安装包
npm install @genlib/toolkit-core@latest

# 测试导入
node -e "const { pick } = require('@genlib/toolkit-core'); console.log(pick({a:1, b:2}, ['a']))"
```

### 3. 验证类型定义

```bash
# 创建测试文件
cat > test.ts << EOF
import { pick } from '@genlib/toolkit-core';
const result = pick({ a: 1, b: 2 }, ['a']);
EOF

# 检查类型（需要全局安装 typescript）
npx tsc --noEmit test.ts
```

### 4. 检查 Git Tags

```bash
git tag --list
# 应该看到类似 v1.0.0, v1.0.1 等标签
```

## 常见问题

### Q1: 发布失败 "403 Forbidden"

**原因**：npm token 权限不足或未设置

**解决**：
1. 检查 GitHub Secrets 中是否有 `NPM_TOKEN`
2. 确认 npm token 有 `publish` 权限
3. 确认 organization 权限设置正确

### Q2: "Package name already exists"

**原因**：包名已被占用或版本已存在

**解决**：
1. 检查版本号是否正确递增
2. 如果是首次发布，确认包名未被占用
3. 使用 `npm view @genlib/toolkit-core versions` 查看已发布版本

### Q3: Changeset 没有触发自动发布

**原因**：可能是 workflow 配置问题

**解决**：
1. 检查 `.github/workflows/release.yml` 是否存在
2. 确认 changeset 文件在 `.changeset/` 目录下
3. 查看 GitHub Actions 日志

### Q4: 如何发布单个包？

Changesets 会自动检测哪些包有变更。如果只想发布一个包：

```bash
# 只创建该包的 changeset
pnpm changeset
# 只选择要发布的包
```

### Q5: 如何回滚版本？

如果发布后发现问题，可以：

1. **发布新版本修复**（推荐）
   ```bash
   pnpm changeset
   # 选择 patch，描述修复内容
   ```

2. **下架版本**（不推荐）
   ```bash
   npm unpublish @genlib/toolkit-core@1.0.0
   # 注意：72 小时内只能下架，且需要联系 npm 支持
   ```

### Q6: 如何更新依赖的版本？

如果包之间有依赖关系，Changesets 会自动处理：

```json
// package.json
{
  "dependencies": {
    "@genlib/toolkit-core": "workspace:*"
  }
}
```

发布时会自动更新为实际版本号。

### Q7: 发布前需要测试什么？

建议检查清单：

- [ ] 所有测试通过 (`pnpm test`)
- [ ] Lint 通过 (`pnpm lint`)
- [ ] 构建成功 (`pnpm build`)
- [ ] README 文档完整
- [ ] CHANGELOG 正确（自动生成）
- [ ] 版本号合理（符合语义化版本）

### Q8: 如何发布 Beta 版本？

```bash
# 创建 changeset
pnpm changeset

# 手动更新版本为 beta
# 编辑 .changeset/*.md，或直接修改 package.json

# 发布 beta
pnpm changeset publish --tag beta

# 用户安装
npm install @genlib/toolkit-core@beta
```

## 发布检查清单

发布前确认：

- [ ] npm 账号已登录 (`npm whoami`)
- [ ] GitHub Secrets 已配置 `NPM_TOKEN`
- [ ] 所有测试通过
- [ ] 构建成功
- [ ] Changeset 已创建
- [ ] 版本号符合语义化版本规则
- [ ] README 文档完整
- [ ] 代码已提交到 Git

## 相关资源

- [Changesets 文档](https://github.com/changesets/changesets)
- [语义化版本控制](https://semver.org/)
- [npm 发布文档](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

## 联系方式

如有问题，请：

- 提交 [GitHub Issue](https://github.com/Jerry-bbq/toolkit/issues)
- 查看 [GitHub Actions 日志](https://github.com/Jerry-bbq/toolkit/actions)

---

**最后更新**: 2024-12

