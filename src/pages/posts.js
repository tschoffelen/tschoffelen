import React from "react";
import groupBy from "lodash.groupby";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Header from "../components/Header";
import { organizePosts, renderPost } from "../utils";

const PostsPage = ({
  data: {
    allDynamodb: { nodes: mediumPosts },
    allMarkdownRemark: { nodes: blogPosts },
  },
}) => (
  <Layout className="posts">
    <Seo title="Posts" />
    <Header />

    <h2>Recent posts</h2>

    {Object.entries(
      groupBy(organizePosts([...mediumPosts, ...blogPosts]), "month")
    ).map(([key, value]) => (
      <div className="links">
        <h3>{key}</h3>
        {value.map((post) => renderPost(post))}
      </div>
    ))}
  </Layout>
);

export const query = graphql`
  query allPosts {
    allDynamodb(
      filter: { type: { eq: "post" } }
      sort: { fields: [createdAt], order: DESC }
      limit: 100
    ) {
      nodes {
        title
        link
        createdAt
        description
      }
    }
    allMarkdownRemark(
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
        excerpt
      }
    }
  }
`;

export default PostsPage;
