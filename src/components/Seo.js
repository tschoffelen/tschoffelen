import React from "react";
import Head from "next/head";

function Seo({ title, description, jsonLd, children }) {
  const siteMetadata = {
    title: "Thomas Schoffelen",
    description:
      "Thomas Schoffelen is a tech entrepreneur and consultant, co-founder of NearSt and Infowijs, building tools to help small businesses and educators.",
  };

  description = description || siteMetadata.description;
  title = title ? `${title} – ${siteMetadata.title}` : siteMetadata.title;

  return (
    <Head>
      <title>{title}</title>

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1.0"
      />

      <meta
        name="text"
        content={`




      
          Looking for my company info?
      
          Company name:              Thomas Schoffelen B.V.
          Contact email:             thomas@schof.co
          NL Chamber of Commerce:    67640516
          VAT number:                NL857104779B01
      




  `}
      />

      <meta name="description" content={description} />
      <meta name="author" content="Thomas Schoffelen" />
      <meta
        name="keywords"
        content="thomas schoffelen, thomas, schoffelen, consulting, engineer, entrepreneur, startups, young startup"
      />

      <meta
        name="google-site-verification"
        content="PfK2tt-swzI7S9DjGXMWXb6BEo09M6ATCR87bR5HqQE"
      />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://schof.co/social.png" />
      <meta name="twitter:site" content="tschoffelen" />
      <meta name="twitter:creator" content="@tschoffelen" />
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content="https://schof.co/" />
      <meta name="og:image" content="https://schof.co/social.png" />
      <meta name="fb:app_id" content="3816262195139481" />

      <link rel="icon" href="/favicon.ico" />

      <meta
        name="theme-color"
        content="#f4f4f5"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content="#212733"
        media="(prefers-color-scheme: dark)"
      />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="me" href="https://twitter.com/tschoffelen" />
      <link rel="me" href="https://instagram.com/tschoffelen" />
      <link rel="me" href="https://github.com/tschoffelen" />
      <link rel="me" href="https://social.coop/@tschoffelen" />
      <link rel="pgpkey" href="https://schof.co/pgp.txt" />
      <link rel="alternate" type="application/rss+xml" title="RSS Feed for Schof.co" href="https://schof.co/api/rss.xml" />
      <script type="application/ld+json">
        {JSON.stringify(
          jsonLd || {
            "@context": "http://schema.org",
            "@type": "Person",
            name: "Thomas Schoffelen",
            familyName: "Schoffelen",
            givenName: "Thomas",
            worksFor: [
              {
                "@type": "Role",
                roleName: "Head of Platform Innovation",
                startDate: "2016",
                worksFor: {
                  "@type": "Organization",
                  name: "NearSt",
                },
              },
              {
                "@type": "Role",
                roleName: "Founder",
                startDate: "2017",
                worksFor: {
                  "@type": "Organization",
                  name: "Thomas Schoffelen BV",
                  brand: "schof.co",
                  taxID: "67640516",
                  duns: "492180704",
                  email: "info@schof.co",
                  vatID: "NL857104779B01",
                },
              },
            ],
            url: "https://schof.co",
            jobTitle: "Head of Platform Innovation",
            gender: "male",
            image: "https://schof.co/avatar.jpg",
            sameAs: [
              "https://github.com/tschoffelen",
              "https://twitter.com/tschoffelen",
              "https://linkedin.com/in/tschoffelen",
            ],
          }
        )}
      </script>

      {children}
    </Head>
  );
}

export default Seo;
