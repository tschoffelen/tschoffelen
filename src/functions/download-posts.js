const axios = require("axios");
const AWS = require("aws-sdk");

const TableName = process.env.TABLE_NAME;
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async () => {
  // Download Medium posts

  const res = await axios.get(
    "https://api.rss2json.com/v1/api.json?rss_url=" +
      "https%3A%2F%2Fmedium.com%2Ffeed%2F%40tschoffelen"
  );
  const data = res.data.items.filter(({ categories }) => categories.length);

  for (const { title, pubDate, link, guid, description } of data) {
    const { Item } = await dynamo
      .get({
        TableName,
        Key: {
          pk: guid,
          sk: "medium",
        },
      })
      .promise();

    if (!Item) {
      console.log(`Already exists: ${title}`);
      continue;
    }

    console.log(`Adding new: ${title}`);
    await dynamo
      .put({
        TableName,
        Item: {
          pk: guid,
          sk: "medium",
          type: "post",
          id: guid,
          title: title.replace("&amp;", "&"),
          link,
          description,
          createdAt: new Date(pubDate).toISOString(),
        },
      })
      .promise();
  }

  // Download NearSt blog posts

  // let feed = await parser.parseURL(
  //   "https://blog.near.st/author/thomas/rss.xml"
  // );
  // for (const { title, date, link, guid, content } of feed.items) {
  //   await dynamo
  //     .put({
  //       TableName,
  //       Item: {
  //         pk: guid,
  //         sk: "nearst",
  //         type: "post",
  //         id: guid,
  //         title: title.replace("&amp;", "&"),
  //         link,
  //         description: content,
  //         createdAt: new Date(date).toISOString(),
  //       },
  //     })
  //     .promise();
  // }

  return "ok";
};
