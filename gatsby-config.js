module.exports = {
  siteMetadata: {
    title: `Thomas Schoffelen`,
    description: `Thomas Schoffelen is a tech entrepreneur and consultant, co-founder of NearSt and Infowijs, building tools to help small businesses and educators.`,
    author: `@tschoffelen`,
    siteUrl: `https://schof.co/`
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-remove-generator`,
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Thomas Schoffelen`,
        short_name: `Thomas`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0c0d0e`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/`
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://schof.co`,
        stripQueryString: true
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-99611142-1`
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark, allPostsJson } }) => ([
              ...allMarkdownRemark.edges.map(edge => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + "/posts" + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + "/posts" + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }]
              })),
              ...allPostsJson.nodes.map(edge => ({
                title: edge.title,
                description: edge.title,
                date: edge.createdAt,
                url: edge.link,
                guid: edge.link
              }))
            ]),
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
                allPostsJson (
                  limit: 6
                ) {
                  nodes {
                    link
                    title
                    createdAt
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Thomas Schoffelen"
          }
        ]
      }
    }
  ]
};
