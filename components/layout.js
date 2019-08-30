import React from 'react'
import Head from 'next/head'

export default ({ children, title = 'Thomas Schoffelen' }) => (
  <div>
    <Head>
      <meta charSet='utf-8'/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"/>
      <title>{title}</title>
      <meta name="description" content="I create simple solutions for day-to-day problems in business and communication. I build apps, design interfaces, draft technical documentation and occasionally write articles."/>
      <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32"/>

      <link href='https://rsms.me/inter/inter.css' rel='stylesheet'/>
      <link href='/styles.css?v=2' rel='stylesheet'/>

      <meta name="google-site-verification" content="PfK2tt-swzI7S9DjGXMWXb6BEo09M6ATCR87bR5HqQE"/>
      <meta name="theme-color" content="#000000"/>
      <link rel="manifest" href="/manifest.json"/>

      <link rel="canonical" href="https://schof.co"/>

      <link rel="me" href="https://twitter.com/tschoffelen"/>
      <link rel="me" href="https://instagram.com/tschoffelen"/>
      <link rel="me" href="https://github.com/tschoffelen"/>
      <link rel="pgpkey" href="/pgp.txt"/>
    </Head>
    <header>
      <h1 className="logo" title="Thomas Schoffelen">
        <a id="logo" href="/" title="Thomas Schoffelen">TS</a>
      </h1>
    </header>

    {children}
  </div>
)
