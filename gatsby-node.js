const path = require("path")
const fs = require("fs")
const axios = require("axios")
const { createFilePath } = require("gatsby-source-filesystem")

const downloadPosts = async () => {
  const res = await axios.get(
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40tschoffelen"
  )

  const data = res.data.items
    .filter(({ categories }) => categories.length)
    .map(({ title, pubDate, link, guid }) => ({
      id: guid,
      title: title.replace("&amp;", "&"),
      link,
      createdAt: (new Date(pubDate)).toISOString(),
    }))

  fs.writeFileSync("./src/data/posts.json", JSON.stringify(data), "utf8")

  console.log(`Downloaded ${data.length} posts`)
}

exports.onPreBootstrap = downloadPosts

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Notes pages
  createPage({
    path: `/notes/`,
    matchPath: `/notes/*`,
    component: require.resolve(`./src/templates/note.js`)
  });

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
