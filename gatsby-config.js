module.exports = {
  siteMetadata: {
    title: "Thomas Schoffelen",
    description:
      "Thomas Schoffelen is a tech entrepreneur and consultant, co-founder of NearSt and Infowijs, building tools to help small businesses and educators.",
    author: "@tschoffelen",
    siteUrl: "https://schof.co/",
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-remove-generator",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 980,
              quality: 90,
              linkImagesToOriginal: false,
              backgroundColor: "transparent",
              disableBgImageOnAlpha: true,
            },
          },
          "gatsby-remark-fountain",
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-exclude",
      options: {
        paths: ["/**/_utils/**"],
      },
    },
    {
      resolve: "gatsby-plugin-create-client-paths",
      options: { prefixes: ["/notes/*"] },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Thomas Schoffelen",
        short_name: "Thomas",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#212733",
        display: "minimal-ui",
        icon: "src/assets/icon.svg",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./content/",
      },
    },
    {
      resolve: "gatsby-source-dynamodb",
      options: {
        typeName: "dynamodb",
        region: "eu-west-1",
        params: {
          TableName: "schofco-website",
        },
      },
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: "https://schof.co",
        stripQueryString: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-99611142-1",
      },
    },
    {
      resolve: "gatsby-plugin-feed",
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
            serialize: ({
              query: { site, allMarkdownRemark, allDynamodb },
            }) => [
              ...allMarkdownRemark.edges.map((edge) => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }],
              })),
              ...allDynamodb.nodes.map((edge) => ({
                title: edge.title,
                description: edge.description || edge.title,
                date: edge.createdAt,
                url: edge.link,
                guid: edge.link,
              })),
            ],
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
                allDynamodb(
                  filter: {type: {eq: "post"}}
                ) {
                  nodes {
                    title
                    link
                    createdAt
                    description
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Thomas Schoffelen",
          },
        ],
      },
    },
  ],
};
