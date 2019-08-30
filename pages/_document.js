import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

const GA_TRACKING_ID = 'UA-99611142-1'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='en-US'>
        <Head>
          <script>{`/*






          Copyright 2019 Thomas Schoffelen.
          All rights reserved.


          Looking for my company info?

          Company name:              Thomas Schoffelen B.V.
          Contact email:             thomas@schof.co
          NL Chamber of Commerce:    67640516
          VAT number:                NL857104779B01






*/`}</script>
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
                  'https://twitter.com/tschoffelen',
                  'https://linkedin.com/in/tschoffelen'
                ]
              })
            }}/>
        </Head>
        <body className="homepage day">
          <Main/>
          <NextScript/>
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function (e, t, n, i, s, a, c) {
  e[n] = e[n] || function () {(e[n].q = e[n].q || []).push(arguments)}
  a = t.createElement(i)
  c = t.getElementsByTagName(i)[0]
  a.async = true
  a.src = s
  c.parentNode.insertBefore(a, c)
})(window, document, 'galite', 'script', 'https://cdn.jsdelivr.net/npm/ga-lite@2/dist/ga-lite.min.js')
galite('create', '${GA_TRACKING_ID}', 'auto')
galite('send', 'pageview')
              `
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
