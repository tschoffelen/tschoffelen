const axios = require("axios");
const AWS = require("aws-sdk");
const TableName = process.env.TABLE_NAME;
const dynamo = new AWS.DynamoDB.DocumentClient();

const url =
  "https://api.rss2json.com/v1/api.json?rss_url=" +
  "https%3A%2F%2Fmedium.com%2Ffeed%2F%40tschoffelen";

module.exports.handler = async () => {
  const res = await axios.get(url);
  const data = res.data.items.filter(({ categories }) => categories.length);

  for (const { title, pubDate, link, guid, description } of data) {
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

  return "ok";
};
