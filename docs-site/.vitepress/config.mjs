import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '@genlib/toolkit',
  description: '前端工具函数库 API 文档',
  base: '/toolkit/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/packages/core' }
    ],
    sidebar: {
      '/packages/': [
        {
          text: '包文档',
                items: [
                  { text: 'Core', link: '/packages/core' },
                  { text: 'Date', link: '/packages/date' },
                  { text: 'Is', link: '/packages/is' },
                  { text: 'Money', link: '/packages/money' },
                  { text: 'Tree', link: '/packages/tree' },
                  { text: 'URL', link: '/packages/url' }
                ]
        }
      ],
      '/': [] // 首页不显示侧边栏
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jerry-bbq/toolkit' }
    ],
    outline: {
      level: [2, 3]
    }
  }
});
