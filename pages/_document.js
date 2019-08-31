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
        </Head>
        <body className="homepage day">
          <Main/>
          <NextScript/>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
          <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TRACKING_ID}');` }}/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
