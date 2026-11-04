import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPosts() {
  return (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id));
}

export function href(path = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function postHref(post: CollectionEntry<'posts'>) {
  return href(`posts/${post.id.split('/').map(encodeURIComponent).join('/')}/`);
}

export function tagHref(tag: string) {
  return href(`tags/${encodeURIComponent(tag)}/`);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai',
  }).format(date).replaceAll('/', '.');
}

export function readingTime(body = '') {
  const chinese = (body.match(/[\u3400-\u9fff]/g) ?? []).length;
  const words = (body.replace(/[\u3400-\u9fff]/g, '').match(/[A-Za-z0-9]+/g) ?? []).length;
  return Math.max(1, Math.ceil(chinese / 300 + words / 200));
}
