import fs from "fs";
import { Feed } from "feed";
import { join } from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkPrism from "remark-prism";
import remarkRehype from "remark-rehype";
import excerptHtml from "excerpt-html";
import remarkParse from "remark-parse";
import rehypeRaw from "rehype-raw";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import gatsbyRemarkFountain from "gatsby-remark-fountain";

import { getMediumPosts } from "@/lib/medium";

const postsDirectory = join(process.cwd(), "content");

const remarkFountain = () => {
  return (tree) => gatsbyRemarkFountain({ markdownAST: tree });
};

export const getPostSlugs = () => {
  const posts = fs.readdirSync(postsDirectory);
  return posts.map((slug) => slug.split('.')[0]).filter((slug) => slug !== 'index');
};

export const getPosts = async () => {
  const posts = getPostSlugs();

  const output = await Promise.all(posts.map(getPostBySlug));
  output.push(...await getMediumPosts());

  return output.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
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

export const getPostBySlug = async (slug) => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = await matter(fileContents);

  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkPrism, { transformInlineCode: false })
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(remarkFountain)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(content)
  );

  return {
    ...data,
    slug: realSlug,
    category: data.category || "Blog",
    url: `https://schof.co/${realSlug}`,
    relativeUrl: `/${realSlug}`,
    date: new Date(data.date).toISOString(),
    excerpt: getExcerpt({ html, description: html }),
    content,
    html,
  };
};

export const getFeed = async () => {
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
  posts.forEach((post) => {
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

  return feed;
};
