import React from "react";
import { graphql, Link } from "gatsby";
import { format } from "date-fns";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const renderPost = (post) => (
  <>
    {post.title}
    <span className="ssr">{`, written on `}</span>
    <span className="link-date">{post.date}</span>
  </>
);

const IndexPage = ({
  data: {
    allPostsJson: { nodes: mediumPosts },
    allMarkdownRemark: { nodes: blogPosts }
  }
}) => (
  <Layout className="homepage h-card">
    <SEO/>
    <div className="avatar">
      <div className="avatar-inner"/>
    </div>
    <div>
      <h2 className="p-name">Hi, I'm Thomas.</h2>

      <p className="p-note">
        I'm a co-founder of several tech startups, building tools to help small
        businesses and educators. I love consulting founders and engineers on
        everthing from starting their own company to designing complex
        applications.
      </p>
      <p>
        In my spare time I write about life, friendships, engineering and
        design.
      </p>

      <div className="links">
        <h3>Recent posts</h3>
        {[...mediumPosts, ...blogPosts]
          .map((post) => ({
            ...post,
            date: post.createdAt || post.frontmatter.date,
            title: post.title || post.frontmatter.title,
            external: !!post.link,
            link: post.link || `/posts${post.fields.slug}`
          }))
          .sort((a, b) => a.date < b.date ? 1 : -1)
          .slice(0, 6)
          .map(post => ({ ...post, date: format(new Date(post.date), "MMM d") }))
          .map(post => post.external ? (
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

      <div className="links">
        <h3>What I'm working on</h3>
        <a
          href="http://near.st/?utm_source=schof.co"
          className="p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          NearSt – providing shops a new generation of customers
        </a>
        <a
          href="https://streetartcities.com/?utm_source=schof.co"
          className="p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Street Art Cities – collecting street art across the world
        </a>
        <a
          href="http://infowijs.nl/?utm_source=schof.co"
          className="p-org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Infowijs – enabling schools to communicate better
        </a>
      </div>

      <div className="links">
        <h3>Find me online</h3>
        <a
          href="https://github.com/tschoffelen"
          className="u-url"
          rel="noopener noreferrer"
          target="_blank"
        >
          See my code on Github
        </a>
        <a
          href="https://twitter.com.com/tschoffelen"
          className="u-url"
          rel="noopener noreferrer"
          target="_blank"
        >
          Read my tweets
        </a>
        <a
          href="https://instagram.com/tschoffelen"
          className="u-url"
          rel="noopener noreferrer"
          target="_blank"
        >
          Follow me on Instagram
        </a>
        <a href="mailto:thomas@schof.co" className="u-email" rel="author">
          Send me an email
        </a>
        <Link to="/pgp">Grab my PGP key</Link>
      </div>

      <a
        style={{ display: "none" }}
        aria-hidden="true"
        href="https://schof.co"
        className="u-url u-uid"
      >
        Thomas Schoffelen
      </a>
    </div>
  </Layout>
);

export const query = graphql`
    query posts {
      allPostsJson (
        limit: 6
      ) {
        nodes {
          link
          title
          createdAt
        }
      }
      allMarkdownRemark (
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 6
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
`;

export default IndexPage;
