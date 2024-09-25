import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import mySidebar from './sidebar'

// https://vitepress.dev/reference/site-config
const vpConfig = defineConfig({
  title: '组合数学攻略',
  description: '组合数学第五版练习题解析',
  base: '/Introductory-Combinatorics-5ed/',
  lang: 'zh-CN',
  // srcDir: 'docs',
  lastUpdated: true,
  markdown: {
    math: true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
      noteLabel: '为什么',
    },
  },
  cleanUrls: true,
  // rewrites: {
  //   'extras/notes/:page': 'notes/:page',
  // },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '本篇', link: '/exercises' },
      { text: '额外内容', link: '/extras' },
      { text: '交流', link: '/contribute' },
    ],
    search: { provider: 'local' },
    sidebar: mySidebar,
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/furtherun/Introductory-Combinatorics-5ed',
      },
    ],
    footer: {
      message: '本站基于 <a href="https://vitepress.dev/">VitePress</a> 搭建',
      copyright:
        'Copyright © 2024 <a href="https://github.com/furtherun">Furtherun</a> | <a href="https://github.com/furtherun/Introductory-Combinatorics-5ed?tab=MIT-1-ov-file">MIT License</a>',
    },
  },
  mermaid: {
    // https://emersonbottero.github.io/vitepress-plugin-mermaid/guide/getting-started.html
  },
  mermaidPlugin: {
    class: 'mermaid my-class',
  },

})

export default withMermaid(vpConfig)
