import React from "react";
import { format } from "date-fns";
import { Link } from "gatsby";
import { stripHtml } from "string-strip-html";

const getExcerpt = ({ description, excerpt }) => {
  if (excerpt) {
    if (excerpt.includes(". ")) {
      excerpt = `${excerpt.split(". ")[0]}.`;
    }
    return excerpt;
  }
  return stripHtml(description || '').result.replace(
    /Continue reading on ([^»]+) »/,
    ""
  );
};

export const renderPost = ({
  title,
  created,
  category,
  link,
  external,
  ...node
}, onHomepage = false) =>
  external ? (
    <a href={link} key={link} rel="noopener noreferrer" target="_blank">
      {title}
      <span className="sr">{`, written on `}</span>
      <span className="link-date">{onHomepage ? (category || 'blog') : created}</span>
      <span className="sr dash"> - </span>
      <span className="link-description shortened">{getExcerpt(node)}</span>
    </a>
  ) : (
    <Link to={link} key={link}>
      {title}
      <span className="sr">{`, written on `}</span>
      <span className="link-date">{onHomepage ? (category || 'blog') : created}</span>
      {category && <span className="sr">{` in category ${category}.`}</span>}
      <span className="sr dash"> - </span>
      <span className="link-description shortened">{getExcerpt(node)}</span>
    </Link>
  );

export const organizePosts = (posts) => {
  const titles = posts
    .filter((post) => post.frontmatter)
    .map(
      (post) =>
        post.frontmatter.title +
        Math.floor(new Date(post.frontmatter.date).getFullYear() / 2)
    );

  return posts
    .map((post) => {
      const date = new Date(post.createdAt || post.frontmatter.date);
      return {
        ...post,
        date,
        title: post.title || post.frontmatter.title,
        external: !!post.link,
        excerpt: post.frontmatter?.description || post.excerpt,
        category: post.frontmatter?.category || post.category,
        link: post.link || post.fields.slug,
        created: format(date, "MMM d"),
        month: format(date, "MMM yyyy"),
        unique: Math.floor(date.getFullYear() / 2),
      };
    })
    .filter(
      (post) => post.frontmatter || !titles.includes(post.title + post.unique)
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};
