<template>
  <div class="home">
    <div class="hero">
      <h1 class="title">@genlib/toolkit</h1>
      <p class="description">前端工具函数库（浏览器 + Node），ESM 优先、CJS 兼容、按需导入、可树摇。</p>
      <div class="actions">
        <a class="action-button primary" href="/toolkit/packages/core">快速开始</a>
        <a class="action-button secondary" href="https://github.com/Jerry-bbq/toolkit" target="_blank">GitHub</a>
      </div>
    </div>

    <div class="features">
      <div class="feature">
        <h3>✅ ESM 优先 + CJS 兼容</h3>
        <p><code>exports</code> 精确映射</p>
      </div>
      <div class="feature">
        <h3>✅ 按需导入与树摇</h3>
        <p><code>"sideEffects": false</code>、多入口/子路径导出</p>
      </div>
      <div class="feature">
        <h3>✅ TypeScript 严格类型</h3>
        <p>公共签名由 API Extractor 锁定</p>
      </div>
      <div class="feature">
        <h3>✅ Monorepo 多子包</h3>
        <p>职责清晰、独立发版</p>
      </div>
    </div>

    <div class="installation">
      <h2>安装</h2>
      <div class="language-bash">
        <pre><code>pnpm add @genlib/toolkit-core
# 或安装其他子包
pnpm add @genlib/toolkit-{date,money,tree,url}</code></pre>
      </div>
    </div>

    <div class="quick-start">
      <h2>快速开始</h2>
      <div class="language-typescript">
        <pre><code>import { pick, clamp } from '@genlib/toolkit-core';
import { toQuery } from '@genlib/toolkit-url';
import { findById } from '@genlib/toolkit-tree';

// 使用
const obj = { a: 1, b: 2, c: 3 };
const selected = pick(obj, ['a', 'c']); // { a: 1, c: 3 }</code></pre>
      </div>
    </div>

    <div class="packages">
      <h2>子包</h2>
      <div class="package-list">
        <a href="/toolkit/packages/core" class="package-card">
          <h3>Core</h3>
          <p>核心工具函数</p>
        </a>
        <a href="/toolkit/packages/date" class="package-card">
          <h3>Date</h3>
          <p>日期工具</p>
        </a>
        <a href="/toolkit/packages/money" class="package-card">
          <h3>Money</h3>
          <p>金额工具</p>
        </a>
        <a href="/toolkit/packages/tree" class="package-card">
          <h3>Tree</h3>
          <p>树结构工具</p>
        </a>
        <a href="/toolkit/packages/url" class="package-card">
          <h3>URL</h3>
          <p>URL 工具</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.action-button.primary {
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.action-button.primary:hover {
  background-color: var(--vp-button-brand-hover-bg);
}

.action-button.secondary {
  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  border: 1px solid var(--vp-button-alt-border);
}

.action-button.secondary:hover {
  background-color: var(--vp-button-alt-hover-bg);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
}

.feature {
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: var(--vp-c-bg-soft);
}

.feature h3 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.feature p {
  color: var(--vp-c-text-2);
  margin: 0;
}

.installation,
.quick-start,
.packages {
  margin: 4rem 0;
}

.installation h2,
.quick-start h2,
.packages h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.language-bash,
.language-typescript {
  background-color: var(--vp-c-bg-alt);
  border-radius: 0.5rem;
  padding: 1.5rem;
  overflow-x: auto;
}

.package-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.package-card {
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid var(--vp-c-border);
}

.package-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.package-card h3 {
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand);
}

.package-card p {
  color: var(--vp-c-text-2);
  margin: 0;
}
</style>

