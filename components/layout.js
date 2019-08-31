import React from 'react'
import Head from 'next/head'

export default ({ children, title = 'Thomas Schoffelen' }) => (
  <div>
    <Head>
      <meta charSet='utf-8'/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"/>
      <title>{title}</title>
      <meta name="description" content="Thomas Schoffelen is a tech entrepreneur and consultant, co-founder of NearSt and Infowijs, building tools to help small businesses and educators."/>
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

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Person',
            'name': 'Thomas Schoffelen',
            'familyName': 'Schoffelen',
            'givenName': 'Thomas',
            'worksFor': [{
              '@type': 'Role',
              'roleName': 'Head of Platform Innovation',
              'startDate': '2016',
              'worksFor': {
                '@type': 'Organization',
                'name': 'NearSt'
              }
            }, {
              '@type': 'Role',
              'roleName': 'Founder',
              'startDate': '2017',
              'worksFor': {
                '@type': 'Organization',
                'name': 'Thomas Schoffelen BV',
                'brand': 'schof.co',
                'taxID': '67640516',
                'duns': '492180704',
                'email': 'info@schof.co',
                'vatID': 'NL857104779B01'
              }
            }],
            'url': 'https://schof.co',
            'jobTitle': 'Head of Platform Innovation',
            'gender': 'male',
            'image': 'https://schof.co/avatar.png',
            'sameAs': [
              'https://github.com/tschoffelen',
              'https://twitter.com/tschoffelen',
              'https://linkedin.com/in/tschoffelen'
            ]
          })
        }}/>
    </Head>
    <header>
      <h1 className="logo" title="Thomas Schoffelen">
        <a id="logo" href="/" title="Thomas Schoffelen">TS</a>
      </h1>
    </header>

    {children}
  </div>
)
