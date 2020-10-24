import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { ArrowDownCircle, ArrowUpCircle, Trash } from "react-feather";
import Zip from "jszip";
import yaml from "yaml";
import { saveAs } from "file-saver";

import SEO from "../../components/SEO";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

import "./index.scss";
import { Checkboxes, TextInput, TriggerEditor } from "../../components/inputs";

const defaultFunc = (first = false) => ({
  id: uuid(),
  name: first ? "hello-world" : "",
  triggers: first ? [
    {
      type: "httpGet",
      path: "/hello-world"
    }
  ] : [],
  collapsed: false
});

const createTriggerPreview = (events) => {
  return events.map((event) => {
    switch (event.type) {
      case "httpGet":
      case "httpPost":
      case "httpPut":
      case "httpDelete":
      case "httpAny":
        return `${event.type.substring(4).toUpperCase()} ${event.path}`;
      case "schedule":
        return `Schedule ${event.exp}`;
      case "s3ObjectCreated":
        return `S3 object created in ${event.bucket}`;
      case "eventBridgeBus":
        return `EventBridge`;
      case "eventBridgeSource":
        return `EventBridge ${event.source}`;
      default:
        return null;
    }
  }).filter((event) => !!event).join(", ");
};

const generateSls = (name, extensions, functions) => {
  const compiledFunctions = functions.map(func => {
    const name = func.name.toLowerCase().trim();
    return {
      name,
      sls: {
        [name]: {
          handler: `src/functions/${name}/handler.handler`,
          events: func.triggers.map((event) => {
            switch (event.type) {
              case "httpGet":
              case "httpPost":
              case "httpPut":
              case "httpDelete":
              case "httpAny":
                return {
                  http: {
                    path: event.path,
                    method: event.type.substring(4).toLowerCase()
                  }
                };
              case "scheduleRate":
                return {
                  schedule: `rate(${event.rate})`
                };
              case "scheduleCron":
                return {
                  schedule: `cron(${event.cron})`
                };
              case "s3ObjectCreated":
                return {
                  s3: {
                    bucket: event.bucket,
                    event: "s3:ObjectCreated:*",
                    existing: true
                  }
                };
              case "eventBridgeBus":
                return {
                  eventBridge: {
                    eventBus: event.bus || "default"
                  }
                };
              case "eventBridgeSource":
                return {
                  eventBridge: {
                    pattern: {
                      source: [event.source]
                    }
                  }
                };
              default:
                return null;
            }
          })
        }
      }
    };
  });
  const slsObject = {
    service: name,
    plugins: [
      "serverless-offline",
      ...extensions
    ],
    custom: {
      stage: `\${opt:stage, 'dev'}`,
      region: `\${opt:region, 'eu-west-1'}`
    },
    package: {
      individually: true
    },
    provider: {
      name: "aws",
      runtime: "nodejs10.x",
      timeout: 30,
      region: `\${self:custom.region}`,
      stage: `\${self:custom.stage}`,
      environment: {
        SERVICE: `\${self:service}`,
        STAGE: `\${self:custom.stage}`,
        REGION: `\${self:custom.region}`,
        NODE_ENV: `\${self:custom.stage}`
      },
      iamRoleStatements: []
    },
    functions: functions
      .map((func) => `\${file(./src/functions/${func.name.toLowerCase().trim()}/function.yml)}`)
  };

  extensions.forEach((ext) => {
    switch (ext) {
      case "serverless-prune-plugin":
        slsObject.custom.prune = {
          automatic: true,
          number: 20
        };
        break;
      case "serverless-esbuild":
        slsObject.custom.esbuild = {
          packager: "yarn"
        };
        break;
      default:
        break;
    }
  });

  const sls = yaml.stringify(slsObject, { indent: 2 }).replace(/\n(\w+):\n/gi, "\n\n$1:\n");
  console.log(sls, compiledFunctions);

  return { sls, compiledFunctions };
};

const ScaffoldPage = () => {
  const [name, setName] = useState("");
  const [extensions, setExtensions] = useState([]);
  const [functions, setFunctions] = useState(() => [defaultFunc(true)]);

  const exportZip = () => {
    const realName = name.toLowerCase().trim();
    const zip = new Zip();
    const { sls, compiledFunctions } = generateSls(realName, extensions, functions);
    const titleName = realName
      .split(/([\s_-]+)/gi)
      .map((part) => part[0].toUpperCase() + part.substring(1).toLowerCase()).join(" ");
    zip.file("serverless.yml", sls);
    zip.file("README.md", `# ${titleName}

A serverless project.

### Running locally

\`\`\`
yarn
yarn start
\`\`\`

### Running tests

\`\`\`
yarn test
\`\`\`
`);
    zip.file("package.json", `{
  "name": "${realName}",
  "version": "1.0.0",
  "license": "proprietary",
  "private": true,
  "scripts": {
    "start": "serverless offline",
    "deploy": "serverless deploy",
    "test": "jest"
  },
  "dependencies": {
  },
  "devDependencies": {
    "serverless": "^2.8.0",
    "serverless-offline": "^6.8.0",` +
      (extensions.includes("serverless-prune-plugin") ? `\n    "serverless-prune-plugin": "^1.4.1",` : "") +
      (extensions.includes("serverless-esbuild") ? `\n    "serverless-esbuild": "^1.4.0",` : "") +
      `
    "jest": "^26.6.1"
  }
}
`);
    zip.file(".gitignore", `node_modules
*.log
.serverless
.build
.idea
/build
coverage
.DS_Store
.env
.env.*
`);
    const src = zip.folder("src");
    src.folder("lib");
    const funcs = src.folder("functions");
    Object.values(compiledFunctions).forEach((func) => {
      const dir = funcs.folder(func.name);
      dir.file("function.yml", yaml.stringify(func.sls, { indent: 2 }));
      dir.file("test.js", `const { handler } = require("./handler.js");

it("${func.name}", () => {
  // add your tests here
});
`);
      dir.file("handler.js", `module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "hello world!"
    })
  };
};
`);
    });

    zip.generateAsync({ type: "blob" }).then((content) => saveAs(content, `${realName}.zip`));
  };

  const addFunction = () => {
    setFunctions([
      ...functions.map((func) => {
        func.collapsed = true;
        return func;
      }),
      defaultFunc()
    ]);
  };

  const updateFunction = (id, key, val) => {
    setFunctions(functions.map((func) => {
      if (key === "collapsed" && !val && func.id !== id) {
        func[key] = true;
      }
      if (func.id === id) {
        func[key] = val;
      }
      return func;
    }));
  };

  const removeFunction = (id) => {
    setFunctions(functions.filter((func) => func.id !== id));
  };

  return (
    <Layout>
      <SEO title="Serverless Scaffold"/>

      <Header/>
      <div className="scaffold">
        <h1>Serverless Scaffold</h1>
        <p>
          This little tool will create a zip file as a starting point for
          your next Serverless Node.js project.
        </p>

        <h3>Project basics</h3>
        <TextInput
          title="Project name"
          value={name}
          onChange={setName}
          pattern="[\w-]{2,36}"/>

        <Checkboxes
          title="Plugins"
          value={extensions}
          onChange={setExtensions}
          options={[
            "serverless-prune-plugin",
            "serverless-esbuild"
          ]}/>

        <h3>Functions</h3>
        <div className="functions">
          {functions.map(func => (
            <div key={func.id} className="well">
              <h4>
                <span>{func.name || "Untitled function"}</span>
                {func.collapsed ? (
                  <span>
                      <ArrowUpCircle
                        onClick={() => updateFunction(func.id, "collapsed", !func.collapsed)}
                        color='#777'
                        size={18}/>
                    </span>
                ) : (
                  <span>
                    <Trash
                      onClick={() => removeFunction(func.id)}
                      color='#f92672'
                      size={18}/>
                    <ArrowDownCircle
                      onClick={() => updateFunction(func.id, "collapsed", !func.collapsed)}
                      color='#333'
                      size={18}/>
                  </span>
                )}
              </h4>
              {func.collapsed ? (
                <div className="summary">
                  {createTriggerPreview(func.triggers)}
                </div>
              ) : (
                <>
                  <TextInput
                    title="Function name"
                    value={func.name}
                    onChange={(v) => updateFunction(func.id, "name", v)}
                    pattern="[\w-]{2,36}"/>
                  <TriggerEditor
                    name={func.name}
                    value={func.triggers}
                    onChange={(v) => updateFunction(func.id, "triggers", v)}/>
                </>
              )}
            </div>
          ))}
        </div>
        <button onClick={addFunction}>Add function</button>
        <h3>Export</h3>
        <button onClick={exportZip}>Export scaffolding</button>
      </div>
    </Layout>
  );
};

export default ScaffoldPage;
