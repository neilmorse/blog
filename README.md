# Neil 的数字花园 · Fuwari

基于 [Fuwari 官方主题](https://github.com/saicaca/fuwari) 的 Astro 中文技术博客。

- 博客：https://neilmorse.github.io/blog/
- 仓库：https://github.com/neilmorse/blog
- 主题来源：`saicaca/fuwari`，上游提交 `6d39b0dec41282e7852e23e032998a5789abee28`。
- 保留 Fuwari 的默认布局、主题色调节、深浅模式、页面过渡、分类标签、目录、代码块、Pagefind 搜索和 RSS。
- 主题源代码的 MIT 许可见 `LICENSE`。文章暂未设置额外的 CC 授权。

## 本地运行

使用 Node.js 24 和 pnpm 12.16.1。

```sh
pnpm install
pnpm dev
```

访问终端显示的地址，例如 `http://localhost:4321/blog/`。

```sh
pnpm check       # Astro / TypeScript 检查
pnpm build       # 静态构建，并生成 Pagefind 搜索索引
pnpm preview     # 预览生产构建，测试真实搜索
```

Fuwari 的开发模式不会生成 Pagefind 索引，搜索需用构建后的预览或线上网站测试。

本机若已安装全局 libvips，Sharp 可能尝试从源码编译。可用 `SHARP_IGNORE_GLOBAL_LIBVIPS=1 pnpm install` 选择预编译依赖；CI 已设置该环境变量。

## 写文章

```sh
pnpm new-post my-first-post
```

编辑生成的 `src/content/posts/my-first-post.md`：

```yaml
---
title: "我的第一篇文章"
published: 2026-11-04
description: "文章简介"
image: ""
tags: ["Astro", "前端"]
category: "技术笔记"
draft: false
lang: ""
---

## 从这里开始

写下正文。
```

- Fuwari 使用 `published` 表示日期，替换了之前的 `date` 字段。
- `draft: true` 可在本地开发时预览草稿；生产构建不会发布草稿。
- 已迁移的三篇公开文章是示例内容，可修改或删除；另有一篇隐藏草稿。
- 封面可以用相对于 Markdown 文件的图片路径，如 `./cover.jpg`。
- 首页按日期排序，分类和标签由文章自动生成，正文从二级标题开始。
- Markdown 扩展语法参考 [Fuwari 官方说明](https://github.com/saicaca/fuwari#-markdown-extended-syntax)。

## 个性化配置

| 文件 | 用途 |
| --- | --- |
| `src/config.ts` | 名称、简介、语言、主题色、横幅、头像、导航和社交链接 |
| `src/content/spec/about.md` | 关于页正文 |
| `src/content/posts/` | 文章 |
| `public/images/neil-avatar.svg` | 当前 N 字母头像，可替换为自己的图片 |
| `astro.config.mjs` | 域名、部署路径和 Astro 插件 |

当前为简体中文，使用 Fuwari 默认蓝色主题，横幅默认关闭。需要横幅时在 `src/config.ts` 中启用 `banner.enable` 并设置图片。页脚保留 Astro / Fuwari 致谢。

## GitHub Pages

此目录是独立 Git 仓库，远程仓库为 `neilmorse/blog`。不要上传上级工作区中的个人文件。

```js
site: "https://neilmorse.github.io",
base: "/blog/",
```

推送到 `main` 时，`.github/workflows/deploy.yml` 会检查、构建并自动部署。仓库的 **Settings → Pages → Source** 使用 **GitHub Actions**，无需额外配置个人 Token。

```sh
git add .
git commit -m "Add a new post"
git push
```

部署进度可在仓库 **Actions** 中查看。更换仓库名或域名时，需要同步修改 `astro.config.mjs`，以及内容中手写的 `/blog/` 链接。
