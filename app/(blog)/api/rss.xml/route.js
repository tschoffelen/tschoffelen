import { Feed } from "feed";
import { getPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET() {
  const feed = new Feed({
    title: "Thomas Schoffelen",
    id: "https://schof.co/",
    link: "https://schof.co/",
    language: "en",
    favicon: "https://schof.co/favicon.ico",
    description: "Thomas Schoffelen's personal blog.",
    generator: "SCHOF.CO",
    feedLinks: {
      rss: "https://schof.co/api/rss.xml",
    },
    author: {
      name: "Thomas Schoffelen",
      email: "thomas+rss@schof.co",
      link: "https://schof.co",
    },
  });

  const posts = await getPosts();
  posts
    .filter(({ unlisted }) => !unlisted)
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        id: post.url,
        link: post.url,
        date: new Date(post.date),
        description: post.excerpt,
        content: post.html || post.description,
        author: [
          {
            name: "Thomas Schoffelen",
            email: "thomas+rss@schof.co",
            link: "https://schof.co",
          },
        ],
      });
    });

  const headers = new Headers();
  headers.set("Content-Type", "application/rss+xml");

  return new NextResponse(feed.rss2(), {
    headers,
  });
}
