const fs = require('fs')
const axios = require('axios')
const moment = require('moment')

axios
  .get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40tschoffelen')
  .then(res => {
    data = res.data.items.map(({ title, pubDate, link, guid }) => ({
      id: guid,
      title,
      link,
      createdAt: moment(pubDate).format('YYYY/MM/DD')
    }))

    fs.writeFileSync('./public/posts.json', JSON.stringify(data), 'utf8')

    console.log(`Downloaded ${data.length} posts`)
  })
