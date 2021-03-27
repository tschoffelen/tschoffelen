import React from "react";
import { graphql } from "gatsby";
import format from "date-fns/format";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Header from "../components/Header";

import fountain from "../utils/fountain";

const BlogPostTemplate = ({ data: { markdownRemark: post } }) => {
  let html = post.html;
  let useFountain = post.frontmatter.fountain;
  if (useFountain) {
    html = fountain(post.rawMarkdownBody).html.script;
  }

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        jsonLd={[{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.frontmatter.title,
          "datePublished": post.frontmatter.date,
          "about": post.frontmatter.category,
          "author": {
            "@context": "http://schema.org",
            "@type": "Person",
            "name": "Thomas Schoffelen",
            "familyName": "Schoffelen",
            "givenName": "Thomas",
            "url": "https://schof.co",
            "image": "https://schof.co/avatar.jpg",
            "sameAs": [
              "https://github.com/tschoffelen",
              "https://twitter.com/tschoffelen",
              "https://linkedin.com/in/tschoffelen",
            ],
          },
        },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Posts",
              "item": "https://schof.co/posts/",
            }, {
              "@type": "ListItem",
              "position": 2,
              "name": post.frontmatter.category || post.frontmatter.title,
            }],
          }]} />

      <Header />
      <article className="blog-post">
        <h2>{post.frontmatter.title}</h2>
        <p className="blog-post-date">
          {post.frontmatter.category ? (
            <span>
              <span className="blog-post-category">
                {post.frontmatter.category}
              </span>{" "}
            </span>
          ) : null}
          <strong>{format(new Date(post.frontmatter.date), "MMMM d, yyyy")}</strong>
          {useFountain ? (
            <span className="hide-phone">
              <strong>
                {" • "}
                formatted using
              </strong>{" "}
              <a
                target="_blank"
                className="blog-post-attribution"
                rel="noopener noreferrer"
                href="https://fountain.io/"
              >
                Fountain
              </a>
            </span>
          ) : null}
        </p>
        <section
          className={useFountain ? "fountain-body" : ""}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      rawMarkdownBody
      frontmatter {
        title
        category
        date
        fountain
      }
    }
  }
`;
