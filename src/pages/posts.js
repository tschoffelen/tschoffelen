import React from "react";
import groupBy from "lodash.groupby";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Header from "../components/Header";
import { organizePosts, renderPost } from "../utils";

const PostsPage = ({
  data: {
    allPostsJson: { nodes: mediumPosts },
    allMarkdownRemark: { nodes: blogPosts }
  }
}) => (
  <Layout className="posts">
    <SEO title="Posts"/>
    <Header/>

    <h2>Recent posts</h2>

    {Object
      .entries(groupBy(organizePosts([...mediumPosts, ...blogPosts]), "month"))
      .map(([key, value]) => (
        <div className="links">
          <h3>{key}</h3>
          {value.map(post => renderPost(post))}
        </div>
      ))}
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
