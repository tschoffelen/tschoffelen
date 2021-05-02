export const generateHandler = (func, extensions) => {
  const sentry = extensions.includes("sentry");
  const esm = extensions.includes("webpack") || extensions.includes("esbuild");
  const rel = `../${func.path
    .split("/")
    .map(() => "../")
    .join("")}`;

  return (
    (sentry
      ? `${
          esm
            ? `import sentry from "${rel}lib/sentry";`
            : `const sentry = require("${rel}lib/sentry");`
        }\n`
      : "") +
    (esm
      ? `import { success } from "${rel}lib/output";`
      : `const { success } = require("${rel}lib/output");`) +
    `\n\n${esm ? "export const " : "module.exports."}handler = ${
      sentry ? "sentry(" : ""
    }async (event) => { 
  return success({
    status: "hello world!"
  })
}${sentry ? ")" : ""};
`
  );
};
