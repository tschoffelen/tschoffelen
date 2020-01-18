module.exports = {
  siteMetadata: {
    title: `Thomas Schoffelen`,
    description: `Thomas Schoffelen is a tech entrepreneur and consultant, co-founder of NearSt and Infowijs, building tools to help small businesses and educators.`,
    author: `@tschoffelen`
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`
      }
    }
    // TODO: this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};