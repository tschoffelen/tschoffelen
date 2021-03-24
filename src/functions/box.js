const AWS = require("aws-sdk");
const s3 = new AWS.S3({ useAccelerateEndpoint: true });

const illegalRe = /[\/?<>\\:*|"]/g;
const controlRe = /[\x00-\x1f\x80-\x9f]/g;
const reservedRe = /^\.+$/;
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
const windowsTrailingRe = /[. ]+$/;

const sanitize = (input) => input
  .replace(illegalRe, "-")
  .replace(controlRe, "-")
  .replace(reservedRe, "-")
  .replace(windowsReservedRe, "-")
  .replace(windowsTrailingRe, "-");

const randomString = () =>
  Math.random()
    .toString(36)
    .substring(2, 6);

exports.handler = async({ queryStringParameters }) => {
  const { filename, contentType } = queryStringParameters;
  const key = `f/${randomString()}/${sanitize(filename)}`;

  const url = s3.getSignedUrl("putObject", {
    Bucket: process.env.BOX_BUCKET,
    Key: key,
    Expires: 60,
    ContentType: contentType,
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
    }),
  };
};
