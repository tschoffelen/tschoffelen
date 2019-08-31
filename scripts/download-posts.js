const fs = require('fs')
const axios = require('axios')

axios
  .get('https://medium.com/@tschoffelen/latest?format=json&limit=10')
  .then(res => {
    let data = JSON.parse(res.data.replace('])}while(1);</x>', ''))
    data = Object.values(data.payload.references.Post).map(({ id, title, slug, createdAt, ...post }) => ({
      id,
      title,
      slug,
      createdAt,
      collection: post.homeCollectionId || null,
      subtitle: post.previewContent.subtitle,
      tags: post.virtuals.tags.map(tag => tag.name)
    }))

    fs.writeFileSync('./public/posts.json', JSON.stringify(data), 'utf8')

    console.log(`Downloaded ${data.length} posts`)
  })
