import yaml from "yaml";
import Zip from "jszip";
import { saveAs } from "file-saver";

import { generateSls } from "./generateSls";
import { generateReadme } from "./generateReadme";
import { generateGitignore } from "./generateGitignore";
import { generateTest } from "./generateTest";
import { generateHandler } from "./generateHandler";
import { generateInfra } from "./generateInfra";

export const exportZip = async (options) => {
  options.name = options.name.toLowerCase().trim();
  const { sls, compiledFunctions, packageJson } = generateSls(options);

  const zip = new Zip();
  zip.file("README.md", generateReadme(options.name));
  zip.file(".gitignore", generateGitignore());

  const src = zip.folder("src");
  const funcs = src.folder("functions");

  generateInfra(zip, options, sls, packageJson, compiledFunctions);

  Object.values(compiledFunctions).forEach((func) => {
    let dir = funcs;
    const pathParts = func.path.split("/");
    for (const pathPart of pathParts) {
      dir = dir.folder(pathPart);
    }
    dir.file("function.yml", yaml.stringify(func.sls, { indent: 2 }));
    dir.file("handler.js", generateHandler(func, options.extensions));
    if (options.extensions.includes("jest")) {
      dir.file("test.js", generateTest(func, options.extensions));
    }
  });

  zip.file(
    "serverless.yml",
    yaml.stringify(sls, { indent: 2 }).replace(/\n(\w+):\n/gi, "\n\n$1:\n")
  );
  zip.file("package.json", JSON.stringify(packageJson, null, 2));

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${options.name}.zip`);
};
