import { cache } from "react";
import excerptHtml from "excerpt-html";

import { db, seed } from "@/lib/db";
import fountain from "gatsby-remark-fountain/src/fountain";

const fields = [
  "id",
  "title",
  "category",
  "content",
  "excerpt",
  "html",
  "attributes",
  "createdAt",
];

const formatPost = (post) => {
  return {
    ...post,
    ...(post.attributes || {}),
    // html: (post.attributes?.fountain ? fountain(post.content).html.script : post.html) || '',
    slug: post.id,
    url: post.attributes?.url || `https://schof.co/${post.id}`,
    relativeUrl: post.attributes?.url ? null : `/${post.id}`,
    date: new Date(post.attributes?.date || post.createdAt).toISOString(),
  };
};

export const getExcerpt = ({ description, excerpt }) => {
  if (excerpt) {
    if (excerpt.includes(". ")) {
      excerpt = `${excerpt.split(". ")[0]}.`;
    }
    return excerpt;
  }
  return excerptHtml(description || "").replace(
    /Continue reading on ([^»]+) »/,
    ""
  );
};

export const getPosts = cache(async () => {
  let posts;
  try {
    posts = await db.selectFrom("posts").select(fields).execute();
  } catch (e) {
    if (e.message === `relation "posts" does not exist`) {
      await seed();
      return getPosts();
    } else {
      throw e;
    }
  }

  return posts
    .filter((post) => {
      if (!post.attributes?.url) return true;

      const normalizedDate = new Date(post.attributes?.date || post.createdAt)
        .toISOString()
        .substring(0, 6);

      return !posts.some(
        (p) =>
          p.title === post.title &&
          p.id !== post.id &&
          p.html &&
          normalizedDate ===
            new Date(p.attributes?.date || p.createdAt)
              .toISOString()
              .substring(0, 6)
      );
    })
    .map(formatPost)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
});

export const getSinglePost = cache(async (id) => {
  const post = await db
    .selectFrom("posts")
    .select(fields)
    .where("id", "=", id)
    .executeTakeFirst();

  if (!post) {
    return null;
  }

  return formatPost(post);
});
