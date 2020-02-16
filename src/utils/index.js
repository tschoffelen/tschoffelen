import React from "react"
import { format } from "date-fns"
import { Link } from "gatsby"

export const renderPost = ({ title, created, category, link, external }) =>
  external ? (
    <a href={link} key={link} rel="noopener noreferrer" target="_blank">
      {title}
      <span className="sr">{`, written on `}</span>
      <span className="link-date">{created}</span>
    </a>
  ) : (
    <Link to={link} key={link}>
      {title}
      <span className="sr">{`, written on `}</span>
      <span className="link-date">{created}</span>
      {category && <span className="sr">{` in category ${category}.`}</span>}
    </Link>
  )

export const organizePosts = posts =>
  posts
    .map(post => {
      const date = new Date(post.createdAt || post.frontmatter.date)
      return {
        ...post,
        date,
        title: post.title || post.frontmatter.title,
        external: !!post.link,
        category: post.frontmatter && post.frontmatter.category,
        link: post.link || post.fields.slug,
        created: format(date, "MMM d"),
        month: format(date, "MMM yyyy"),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))