import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPosts, href, postHref } from '../lib/posts';
import { site } from '../config';
export const GET: APIRoute = async (context) => rss({
  title: site.title,
  description: site.description,
  site: new URL(href(), context.site!),
  items: (await getPosts()).map(post => ({ title: post.data.title, description: post.data.description, pubDate: post.data.date, link: postHref(post), categories: post.data.tags })),
  customData: '<language>zh-cn</language>',
});
