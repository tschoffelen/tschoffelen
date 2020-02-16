import React from "react";
import groupBy from "lodash.groupby";
import { graphql, Link } from "gatsby";
import { format } from "date-fns";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Header from "../components/Header";

const renderPost = ({ title, date, category }) => (
  <span>
    {title}
    <span className="ssr">{`, written on `}</span>
    <span className="link-date">{date}</span>
    {category && (<span className="ssr">{` in category ${category}.`}</span>)}
  </span>
);

const PostsPage = ({
  data: {
    allPostsJson: { nodes: mediumPosts },
    allMarkdownRemark: { nodes: blogPosts }
  }
}) => (
  <Layout className="posts">
    <SEO title="Posts"/>

    <Header/>

    <h2>Posts archive</h2>

    {
      Object.entries(groupBy([...mediumPosts, ...blogPosts]
        .map((post) => ({
          ...post,
          date: post.createdAt || post.frontmatter.date,
          title: post.title || post.frontmatter.title,
          external: !!post.link,
          category: post.frontmatter && post.frontmatter.category,
          link: post.link || `/posts${post.fields.slug}`
        }))
        .sort((a, b) => a.date < b.date ? 1 : -1)
        .map(post => ({
          ...post,
          month: format(new Date(post.date), "MMM yyyy"),
          date: format(new Date(post.date), "MMM d")
        })), "month"))
        .map(([key, value]) => (
            <div className="links">
            <h3>{key}</h3>
              {value.map(post => post.external ? (
                <a
                  href={post.link}
                  key={post.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {renderPost(post)}
                </a>
              ) : (
                <Link to={post.link} key={post.link}>
                  {renderPost(post)}
                </Link>
              ))}
            </div>
        ))
    }
  </Layout>
);

export const query = graphql`
    query allPosts {
      allPostsJson (
        limit: 100
      ) {
        nodes {
          link
          title
          createdAt
        }
      }
      allMarkdownRemark (
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 100
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            date
            category
          }
        }
      }
    }
`;

export default PostsPage;
