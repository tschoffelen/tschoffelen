const AWS = require("aws-sdk");

const TableName = process.env.BINS_TABLE_NAME;
const dynamo = new AWS.DynamoDB.DocumentClient();

const error = (message) => {
  return {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ error: message }),
  };
};

exports.handler = async ({ pathParameters: { binId }, httpMethod, body }) => {
  if (!binId) {
    return error("Not a valid bin ID.");
  }

  if (httpMethod === "POST") {
    if (!body) {
      return error("Invalid post body.");
    }

    // Create/update a bin
    await dynamo
      .put({
        TableName,
        Item: {
          pk: binId,
          sk: "bin",
          type: "bin",
          content: JSON.parse(body),
        },
      })
      .promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body,
    };
  }

  let { Item: bin } = await dynamo
    .get({ TableName, Key: { pk: binId, sk: "bin" } })
    .promise();

  if (!bin) {
    bin = { content: { title: "Untitled bin", items: [] } };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bin.content),
  };
};
