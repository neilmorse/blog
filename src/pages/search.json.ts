import type { APIRoute } from 'astro';
import { getPosts, postHref } from '../lib/posts';
export const GET: APIRoute = async () => new Response(JSON.stringify((await getPosts()).map(post => ({
  title: post.data.title, description: post.data.description, tags: post.data.tags, url: postHref(post), body: post.body ?? '',
}))), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
