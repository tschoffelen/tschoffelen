import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { organizePosts, renderPost } from "../utils";

const IndexPage = ({
  data: {
    allPostsJson: { nodes: mediumPosts },
    allMarkdownRemark: { nodes: blogPosts },
  },
}) => {
  const calendlyUrl = "https://calendly.com/tschof/consulting?primary_color=355fc5";

  return (
    <Layout className="homepage h-card">
      <SEO />

      <div className="avatar">
        <div className="avatar-inner" />
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
          user experience design.
        </p>

        <div className="links">
          <h3>
            <Link to="/posts">Recent posts</Link>
          </h3>
          {organizePosts([...mediumPosts, ...blogPosts])
            .slice(0, 5)
            .map(post => renderPost(post))}
        </div>

        <div className="links">
          <h3>What I'm working on</h3>
          <a
            href="http://near.st/?utm_source=schof.co"
            className="p-org"
            rel="noopener noreferrer"
            target="_blank"
          >
            NearSt – making in-store inventory visible online
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
            Infowijs – allowing schools to communicate effectively
          </a>
        </div>

        <div className="links">
          <h3>Get in touch</h3>
          <a
            href={calendlyUrl}
            className="u-url"
            rel="noopener noreferrer"
            target="_blank"
            onClick={(e) => {
              if (typeof window !== "undefined") {
                e.preventDefault && e.preventDefault();
                window.Calendly.initPopupWidget({ url: calendlyUrl });
                return false;
              }
            }}
          >
            Schedule a consulting session
          </a>
          <a
            href="https://github.com/tschoffelen"
            className="u-url"
            rel="noopener noreferrer"
            target="_blank"
          >
            See my code on Github
          </a>
          <a
            href="https://twitter.com/tschoffelen"
            className="u-url"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read my tweets
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

        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query posts {
    allPostsJson(limit: 8) {
      nodes {
        link
        title
        createdAt
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
        }
      }
    }
  }
`;

export default IndexPage;
