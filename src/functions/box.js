const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");
const s3 = new AWS.S3({ useAccelerateEndpoint: true });

exports.handler = async ({ queryStringParameters }) => {
  const { filename, contentType } = queryStringParameters;
  const id = nanoid(6);
  const key = `f/${id}`;

  const url = s3.getSignedUrl("putObject", {
    Bucket: process.env.BOX_BUCKET,
    Key: key,
    Expires: 300,
    ContentType: contentType,
    ContentDisposition: `attachment; filename=${filename}`,
    ACL: "public-read",
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key,
      url,
      publicUrl: `https://schof.click/${id}`,
    }),
  };
};
