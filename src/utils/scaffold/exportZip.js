import yaml from "yaml";
import Zip from "jszip";
import { saveAs } from "file-saver";

import { generateSls } from "./generateSls";
import { generateReadme } from "./generateReadme";
import { generateGitignore } from "./generateGitignore";
import { generateSentry } from "./generateSentry";
import { generateTest } from "./generateTest";
import { generateHandler } from "./generateHandler";

export const exportZip = async (options) => {
  options.name = options.name.toLowerCase().trim();
  const zip = new Zip();
  const { sls, compiledFunctions, packageJson } = generateSls(options);

  zip.file("serverless.yml", sls);
  zip.file("README.md", generateReadme(options.name));
  zip.file("package.json", packageJson);
  zip.file(".gitignore", generateGitignore());
  const src = zip.folder("src");
  const lib = src.folder("lib");
  if (options.extensions.includes("sentry")) {
    lib.file("sentry.js", generateSentry());
  }
  const funcs = src.folder("functions");
  Object.values(compiledFunctions).forEach((func) => {
    const dir = funcs.folder(func.name);
    dir.file("function.yml", yaml.stringify(func.sls, { indent: 2 }));
    dir.file("test.js", generateTest(func, options.extensions));
    dir.file("handler.js", generateHandler(func, options.extensions));
  });

  const content = await zip.generateAsync({ type: "blob" })
  saveAs(content, `${options.name}.zip`);
};
