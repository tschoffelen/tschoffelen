import { extract } from "@extractus/feed-extractor";

import { getExcerpt } from "@/lib/blog";

export const getMediumPosts = async() => {
  const result = await extract("https://medium.com/feed/@tschoffelen");

  return result.entries.map((item) => ({
    category: "Blog",
    title: item.title.replace("&amp;", "&"),
    date: new Date(item.published).toISOString(),
    url: `${item.link.split("?")[0]}?utm_source=schof`,
    relativeUrl: null,
    slug: item.id,
    excerpt: getExcerpt({ description: item.description })
  }));
};
