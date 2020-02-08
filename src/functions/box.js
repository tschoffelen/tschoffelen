const AWS = require("aws-sdk");
const s3 = new AWS.S3({ useAccelerateEndpoint: true });

const randomString = () => Math.random().toString(36).substring(2, 5);

exports.handler = async ({ queryStringParameters }) => {
  const { filename, contentType } = queryStringParameters;
  const key = `f/${randomString()}/${filename}`;

  const url = s3.getSignedUrl("putObject", {
    Bucket: process.env.BOX_BUCKET,
    Key: key,
    Expires: 60,
    ContentType: contentType,
    ACL: "public-read"
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      key,
      url
    })
  };
};
