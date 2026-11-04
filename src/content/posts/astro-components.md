---
title: "把页面拆小：认识 Astro 的组件化思路"
description: "从一张文章卡片出发，理解组件、Props 和插槽，让博客页面更容易维护。"
date: 2026-11-03
tags: ["Astro", "前端"]
---

> 示例技术笔记，可替换为你自己的学习记录。

## 从重复的页面开始

博客的每篇文章，都有标题、日期、简介和标签。如果每个页面都重新写一遍这些结构，修改样式时就容易漏掉某个角落。

组件让这些重复的结构有了明确的边界。比如，导航属于 `BaseLayout.astro`，文章摘要属于 `PostCard.astro`。

## 一个最小的 Astro 组件

Astro 组件的文件扩展名是 `.astro`。文件上方的代码块负责准备数据，下方负责描述页面结构。

```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<article>
  <h2>{title}</h2>
  <p>{description}</p>
</article>
```

这里的 `Props` 就是组件接受的数据。把数据和结构分开，使用组件时就能专注于内容。

## 用插槽容纳不同的内容

同样的页面外壳，可以容纳首页、关于页和文章页。在布局中放入 `<slot />`，使用布局的页面就可以传入自己的内容。

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="我的页面">
  <h1>你好，世界</h1>
  <p>这里是这个页面独有的内容。</p>
</BaseLayout>
```

## 让组件边界保持简单

一个有用的判断标准是：这段结构是否会被重复使用，或者是否拥有清楚的职责？

| 组件 | 职责 |
| --- | --- |
| BaseLayout | 页面外壳、导航、基础元信息 |
| PostCard | 一篇文章的摘要 |
| Search | 搜索入口和结果展示 |
| Icon | 统一的图标样式 |

不必把每一行 HTML 都变成组件。先从重复最多、最容易变化的部分开始，就能让项目逐渐清晰起来。
