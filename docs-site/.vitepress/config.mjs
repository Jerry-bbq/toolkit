import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '@genlib/toolkit',
  description: '企业级前端工具函数库 API 文档',
  base: '/toolkit/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Core', link: '/packages/core' },
      { text: 'Date', link: '/packages/date' },
      { text: 'Money', link: '/packages/money' },
      { text: 'Tree', link: '/packages/tree' },
      { text: 'URL', link: '/packages/url' }
    ],
    sidebar: {
      '/packages/': [
        {
          text: '包文档',
          items: [
            { text: 'Core', link: '/packages/core' },
            { text: 'Date', link: '/packages/date' },
            { text: 'Money', link: '/packages/money' },
            { text: 'Tree', link: '/packages/tree' },
            { text: 'URL', link: '/packages/url' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jerry-bbq/toolkit' }
    ]
  }
});
