import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Header from "../components/Header";

const BlogPostTemplate = ({ data: { markdownRemark: post } }) => (
  <Layout>
    <SEO
      title={post.frontmatter.title}
      description={post.excerpt}
    />

    <Header/>
    <article className="blog-post">
      <h2>
        {post.frontmatter.title}
      </h2>
      <p className="blog-post-date">
        {post.frontmatter.date}
      </p>
      <section dangerouslySetInnerHTML={{ __html: post.html }}/>
    </article>
  </Layout>
);

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
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`;
