# Neil 的数字花园

使用 Astro 和原生 `.astro` 组件构建的中文静态博客，部署目标为 **https://neilmorse.github.io/blog/**。

## 本地运行

需要 Node.js 22.23.4 或更新版本（推荐 Node.js 24）与 pnpm 12.16.1。

```sh
pnpm install
pnpm dev
```

打开终端打印的地址，例如 `http://127.0.0.1:4321/blog/`。

```sh
pnpm check    # Astro / TypeScript 检查
pnpm build    # 先检查，再生成 dist 静态文件
pnpm preview  # 预览生产构建
```

## 写文章

在 `src/content/posts/` 新建一个 `.md` 文件。文件名会成为文章 URL，例如 `my-first-post.md` 对应 `/blog/posts/my-first-post/`。

```yaml
---
title: "我的第一篇文章"
description: "用一两句话介绍这篇文章。"
date: 2026-11-04
tags: ["技术", "随笔"]
featured: false
draft: false
---

## 从这里开始

写下你的正文。
```

- `draft: true` 的文章不会生成页面，也不会出现在搜索、RSS、归档和标签中。
- `featured: true` 会将文章设为首页精选；多篇精选时使用最新的一篇。
- 目录从正文的二、三级标题自动生成，阅读时长自动估算。
- 现有三篇公开文章均为示例，已在正文注明，可随时替换或删除。
- `draft-example.md` 是不公开的草稿示例。
- 图片放在 `public/images/`，当前项目路径下使用 `![说明](/blog/images/example.png)` 引用。调整部署路径时，也需要更新 Markdown 中手写的站内绝对链接。

## 个性化

| 文件 | 内容 |
| --- | --- |
| `src/config.ts` | 博客名、作者、简介、GitHub 链接 |
| `src/pages/index.astro` | 首页介绍、侧栏、装饰插画 |
| `src/pages/about.astro` | 关于页 |
| `src/layouts/BaseLayout.astro` | 导航、页脚和 SEO |
| `src/styles/global.css` | 配色、布局、响应式、深浅主题 |
| `astro.config.mjs` | 部署域名与 base 路径 |

搜索支持标题、摘要、标签和正文；按 `/` 或 `Ctrl/⌘ + K` 打开，按 `Esc` 关闭。主题选择保存在当前浏览器中。

## GitHub Pages 部署

**将此目录的内容作为 `neilmorse/blog` 仓库的根目录**（不要把整个上级工作区上传；上级目录还有其他个人文件）。

1. 在 GitHub 创建公开仓库 `neilmorse/blog`，默认分支用 `main`。
2. 上传本目录的源文件，包括 `.github/workflows/deploy.yml` 和 `pnpm-lock.yaml`。不要上传 `node_modules/`、`.astro/` 或 `dist/`。
3. 进入仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
4. 推送到 `main`，或从 **Actions → Deploy blog to GitHub Pages → Run workflow** 手动触发部署。
5. 等待 Actions 的 build 和 deploy 完成后，访问 **https://neilmorse.github.io/blog/**。

后续只需提交 Markdown 文章，GitHub Actions 就会重新构建并部署。不需要配置个人 Token 或付费服务器；工作流使用 GitHub 自动提供的 `GITHUB_TOKEN`。

当前部署配置：

```js
site: 'https://neilmorse.github.io',
base: '/blog/',
```

组件与 RSS 中的链接均通过公共函数处理 `base`。若改用 `neilmorse.github.io` 同名仓库，设 `base: '/'`；若使用自定义域名，还需设置 `site`、`base: '/'`、DNS 和 `public/CNAME`。

## 结构

```text
.github/workflows/deploy.yml  自动构建与部署
public/                      静态资源
src/
  components/                Icon、PostCard、Search
  content/posts/             Markdown 文章
  layouts/                   公共布局
  lib/posts.ts               文章查询、日期和路径工具
  pages/                     页面、RSS、搜索索引、robots
  styles/                    站点样式
  config.ts                  站点资料
  content.config.ts          文章数据校验
```

官方参考：[Astro GitHub Pages 部署](https://docs.astro.build/en/guides/deploy/github/)、[Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)。
