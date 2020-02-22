import React from "react";
import { graphql } from "gatsby";

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
      <SEO title={post.frontmatter.title} description={post.excerpt}/>

      <Header/>
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
          <strong>
            {post.frontmatter.date}
          </strong>
          {useFountain ? (
            <>
              <strong>
                {" • "}
                formatted using
              </strong>
              {" "}
              <a
                target="_blank"
                className="blog-post-attribution"
                href="https://fountain.io/">
                Fountain
              </a>
            </>
          ) : null}
        </p>
        <section
          className={useFountain ? "fountain-body" : ""}
          dangerouslySetInnerHTML={{ __html: html }}/>
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
        date(formatString: "MMMM D, YYYY")
        fountain
      }
    }
  }
`;
