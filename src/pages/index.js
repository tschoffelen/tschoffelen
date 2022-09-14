import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { organizePosts, renderPost } from "../utils";

const IndexPage = ({
  data: {
    allDynamodb: { nodes: mediumPosts },
    allMarkdownRemark: { nodes: blogPosts },
  },
}) => {
  return (
    <div className="h-card">
      <Seo />
      <div className="hero">
        <main className="homepage">
          <div className="avatar">
            <div className="avatar-inner" />
          </div>

          <div>
            <h2 className="p-name">Hi, I'm Thomas.</h2>

            <p className="p-note">
              I build startups and tools to help businesses and educators.
            </p>
            <p>
              Alongside my work at{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.near.st/?utm_source=schof.co"
              >
                NearSt
              </a>
              , I consult founders and engineers on everything from
              setting up their first business to designing modern technology platforms.
            </p>
          </div>
        </main>
      </div>
      <Layout className="homepage-links">
          <div className="links">
            <h3>
              <Link to="/posts">Recent posts</Link>
            </h3>
            {organizePosts([...mediumPosts, ...blogPosts])
              .slice(0, 3)
              .map((post) => renderPost(post, true))}
          </div>

          <div className="links">
            <h3>What I'm working on</h3>
            <a
              href="https://near.st/?utm_source=schof.co"
              className="p-org"
              rel="noopener noreferrer"
              target="_blank"
            >
              NearSt
              <span className="sr"> - </span>
              <span className="link-description">
                Making products visible online to get more in-store customers.
              </span>
            </a>
            <a
              href="https://includable.com/?utm_source=schof.co"
              className="p-org"
              rel="noopener noreferrer"
              target="_blank"
            >
              Includable
              <span className="sr"> - </span>
              <span className="link-description">
                Helping your first company take flight.
              </span>
            </a>
            <a
              href="https://streetartcities.com/?utm_source=schof.co"
              className="p-org"
              rel="noopener noreferrer"
              target="_blank"
            >
              Street Art Cities
              <span className="sr"> - </span>
              <span className="link-description">
                The world's largest street art community platform.
              </span>
            </a>
            <a
              href="https://infowijs.nl/?utm_source=schof.co"
              className="p-org"
              rel="noopener noreferrer"
              target="_blank"
            >
              Infowijs
              <span className="sr"> - </span>
              <span className="link-description">
                Communication tools used by 100s of Dutch schools.
              </span>
            </a>
          </div>

          <div className="links">
            <h3>Get in touch</h3>
            <a
              href='https://includable.com/consultancy'
              className="u-url"
              rel="noopener noreferrer"
              target="_blank"
            >
              Schedule a consulting session
            </a>
            <a
              href="https://twitter.com/tschoffelen"
              className="u-url"
              rel="noopener noreferrer"
              target="_blank"
            >
              Follow me on Twitter
            </a>
            <a
              href="https://github.com/tschoffelen"
              className="u-url"
              rel="noopener noreferrer"
              target="_blank"
            >
              Follow me on Github
            </a>
            <a href="mailto:thomas@schof.co" className="u-email" rel="author">
              Send me an email
            </a>
          </div>

          <a
            style={{ display: "none" }}
            aria-hidden="true"
            href="https://schof.co"
            className="u-url u-uid"
          >
            Thomas Schoffelen
          </a>
      </Layout>
    </div>
  );
};

export const query = graphql`
  query posts {
    allDynamodb(
      filter: { type: { eq: "post" } }
      sort: { fields: [createdAt], order: DESC }
      limit: 8
    ) {
      nodes {
        title
        link
        createdAt
        description
        category
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 8
      filter: { frontmatter: { unlisted: { ne: true } } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date
          category
          description
        }
        excerpt
      }
    }
  }
`;

export default IndexPage;
