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
    `gatsby-plugin-offline`,
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
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://schof.co`,
        stripQueryString: true
      }
    }
  ]
};
