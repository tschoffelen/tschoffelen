import { Feed } from "feed";
import { getPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET() {
  let sitemap =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';

  const posts = await getPosts();
  posts
    .filter(({ unlisted, relativeUrl }) => !unlisted && relativeUrl)
    .forEach((post) => {
      sitemap += `
      <url>
          <loc>${post.url}</loc>
          <lastmod>${new Date(post.date)
            .toISOString()
            .substring(0, 10)}</lastmod>
      </url>
      `;
    });

  const headers = new Headers();
  headers.set("Content-Type", "application/xml");

  return new NextResponse(sitemap + "</urlset>", {
    headers,
  });
}
