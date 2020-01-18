import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const IndexPage = ({ data: { allPostsJson: { nodes } } }) => (
  <Layout>
    <SEO/>
    <div className="h-card">
      <h2 className="p-name">{`Hi, I'm Thomas.`}</h2>

      <p className="p-note">
        I'm a co-founder of several tech startups, building tools to help small
        businesses and educators. I love consulting founders and engineers on
        everthing from getting started with their own company to designing
        complex applications.
      </p>
      <p>
        In my spare time I write about life, friendship, engineering and design.
      </p>

      <div className="links">
        <h3>Recent posts</h3>
        {nodes.map((post) => (
          <a href={post.link} key={post.link} rel="noopener noreferrer" target="_blank">
            {`${post.createdAt} – ${post.title}`}
          </a>
        ))}
      </div>

      <div className="links">
        <h3>What I'm working on</h3>
        <a
          href="http://near.st/?utm_source=schof.co"
          className="p-org"
          rel="noopener noreferrer"
          target="_blank">
          NearSt: providing shops a new generation of customers
        </a>
        <a
          href="http://infowijs.nl/?utm_source=schof.co"
          className="p-org"
          rel="noopener noreferrer"
          target="_blank">
          Infowijs: enabling schools to communicate better
        </a>
        <a
          href="https://streetartcities.com/?utm_source=schof.co"
          className="p-org"
          rel="noopener noreferrer"
          target="_blank">
          Street Art Cities: documenting street art across the world
        </a>
      </div>

      <div className="links">
        <h3>Find me online</h3>
        <a href="https://github.com/tschoffelen" className="u-url" rel="noopener noreferrer" target="_blank">
          See my code on Github
        </a>
        <a
          href="https://twitter.com.com/tschoffelen"
          className="u-url"
          rel="noopener noreferrer"
          target="_blank">
          Read my tweets
        </a>
        <a
          href="https://instagram.com/tschoffelen"
          className="u-url"
          rel="noopener noreferrer"
          target="_blank">
          Follow me on Instagram
        </a>
        <a href="mailto:thomas@schof.co" className="u-email" rel="author">
          Send me an email
        </a>
        <Link to="/pgp">Grab my PGP key</Link>
      </div>

      <img style={{ display: "none" }} alt="Avatar" aria-hidden="true" className="u-photo" src="/avatar.png"/>
      <a style={{ display: "none" }} aria-hidden="true" href="https://schof.co" className="u-url u-uid">
        Thomas Schoffelen
      </a>
    </div>
  </Layout>
);

export const query = graphql`
  query posts {
    allPostsJson(limit: 6) {
      nodes {
        link
        title
        createdAt
      }
    }
  }
`;

export default IndexPage;