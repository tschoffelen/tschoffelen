import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={
        title
          ? `${title} – ${site.siteMetadata.title}`
          : site.siteMetadata.title
      }
      meta={[
        {
          name: `viewport`,
          content: `width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1.0`,
        },
        {
          name: `google-site-verification`,
          content: `PfK2tt-swzI7S9DjGXMWXb6BEo09M6ATCR87bR5HqQE`,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <script>{`/*










          Looking for my company info?

          Company name:              Thomas Schoffelen B.V.
          Contact email:             thomas@schof.co
          NL Chamber of Commerce:    67640516
          VAT number:                NL857104779B01










*/`}</script>
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="canonical" href="https://schof.co" />
      <link rel="me" href="https://twitter.com/tschoffelen" />
      <link rel="me" href="https://instagram.com/tschoffelen" />
      <link rel="me" href="https://github.com/tschoffelen" />
      <link rel="pgpkey" href="/pgp.txt" />
      <script type="application/ld+json">{`
{
  "@context": "http://schema.org",
  "@type": "Person",
  "name": "Thomas Schoffelen",
  "familyName": "Schoffelen",
  "givenName": "Thomas",
  "worksFor": [{
    "@type": "Role",
    "roleName": "Head of Platform Innovation",
    "startDate": "2016",
    "worksFor": {
      "@type": "Organization",
      "name": "NearSt"
    }
  }, {
    "@type": "Role",
    "roleName": "Founder",
    "startDate": "2017",
    "worksFor": {
      "@type": "Organization",
      "name": "Thomas Schoffelen BV",
      "brand": "schof.co",
      "taxID": "67640516",
      "duns": "492180704",
      "email": "info@schof.co",
      "vatID": "NL857104779B01"
    }
  }],
  "url": "https://schof.co",
  "jobTitle": "Head of Platform Innovation",
  "gender": "male",
  "image": "https://schof.co/avatar.png",
  "sameAs": [
    "https://github.com/tschoffelen",
    "https://twitter.com/tschoffelen",
    "https://linkedin.com/in/tschoffelen"
  ]
}
`}</script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
