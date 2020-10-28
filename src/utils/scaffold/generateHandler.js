export const generateHandler = (func, extensions) => {
  const sentry = extensions.includes("sentry");
  const output = sentry ? `
const sentry = require("../../lib/sentry");

module.exports.handler = sentry(async (event) => {`
    : "module.exports.handler = async (event) => {";
  return `${output}
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "hello world!"
    })
  };
}${sentry ? ")" : ""};
`;
};
