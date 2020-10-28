export const generateTest = (func) => `const { handler } = require("./handler");

test("${func.name}", async () => {
  // add your tests here
  // const result = await handler();
});
`;
