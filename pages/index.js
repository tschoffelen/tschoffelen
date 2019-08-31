import React from 'react'
import Link from 'next/link'
import moment from 'moment'

import Layout from '../components/layout'

import posts from '../public/posts.json'

const Index = () => (
  <Layout>
    <div className="content-inner h-card">
      <h2 className="p-name">{`Hi, I'm Thomas.`}</h2>

      <p className="p-note">
        I'm a co-founder of several tech startups, building tools to help small businesses and educators.
        I love consulting founders and engineers on everthing from getting started with their own company to
        designing complex applications.
      </p>
      <p>
        In my spare time I write about life, friendship, engineering and design.
      </p>

      <div className="links">
        <h3>Recent posts</h3>
        {posts.slice(0, 6).map((post) => (
          <a href={`https://medium.com/p/${post.id}`} key={post.id} target="_blank">
            {`${moment(post.createdAt).format('YYYY/MM')} – ${post.title}`}
          </a>
        ))}
      </div>

      <div className="links">
        <h3>What I'm working on</h3>
        <a
          href="http://near.st/?utm_source=schof.co"
          className="p-org"
          rel="noopener"
          target="_blank">
          NearSt: providing shops a new generation of customers
        </a>
        <a
          href="http://infowijs.nl/?utm_source=schof.co"
          className="p-org"
          rel="noopener"
          target="_blank">
          Infowijs: enabling schools to communicate better
        </a>
        <a
          href="https://streetartcities.com/?utm_source=schof.co"
          className="p-org"
          rel="noopener"
          target="_blank">
          Street Art Cities: documenting street art across the world
        </a>
      </div>

      <div className="links">
        <h3>Find me online</h3>
        <a href="https://github.com/tschoffelen" className="u-url" rel="noopener" target="_blank">
          See my code on Github
        </a>
        <a href="https://instagram.com/tschoffelen" className="u-url" rel="noopener" target="_blank">
          Follow me on Instagram
        </a>
        <a href="mailto:thomas@schof.co" className="u-email" rel="author">
          Send me an email
        </a>
        <Link href="/pgp">
          <a>Grab my PGP key</a>
        </Link>
      </div>

      <img style={{ display: 'none' }} aria-hidden="true" className="u-photo" src="/avatar.png"/>
      <a style={{ display: 'none' }} aria-hidden="true" href="https://schof.co" className="u-url u-uid">
        Thomas Schoffelen
      </a>
    </div>
  </Layout>
)

export default Index
