import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { ArrowDownCircle, ArrowUpCircle, Trash } from "react-feather";

import SEO from "../../components/SEO";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

import "./index.scss";
import { Checkboxes, TextInput, TriggerEditor } from "../../components/inputs";
import { createTriggerPreview } from "./_utils/createTriggerPreview";
import { exportZip } from "./_utils/exportZip";

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

const ScaffoldPage = () => {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [cert, setCert] = useState("");
  const [sentryDsn, setSentryDsn] = useState("");
  const [extensions, setExtensions] = useState(["jest", "webpack"]);
  const [functions, setFunctions] = useState(() => [defaultFunc(true)]);

  const submit = () => {
    if (!name) {
      alert("Enter a project name.");
      return;
    }

    return exportZip({
      extensions,
      functions,
      name,
      domain,
      cert,
      sentryDsn
    });
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
          title="Extensions"
          value={extensions}
          onChange={setExtensions}
          options={[
            {
              id: "jest",
              title: "Unit tests – Jest"
            },
            {
              id: "webpack",
              title: "Webpack – serverless-webpack-plugin",
              disabled: extensions.includes('serverless-esbuild')
            },
            {
              id: "dynamodb",
              title: "Database storage – DynamoDB table"
            },
            {
              id: "cognito",
              title: "Authentication – Cognito user pool"
            },
            {
              id: "serverless-esbuild",
              title: "ESbuild – serverless-esbuild",
              disabled: extensions.includes('webpack')
            },
            {
              id: "serverless-domain-manager",
              title: "Custom domain – serverless-domain-manager"
            },
            {
              id: "sentry",
              title: "Sentry – @sentry/serverless"
            },
            {
              id: "serverless-prune-plugin",
              title: "Prune old versions – serverless-prune-plugin"
            },
            {
              id: "serverless-dotenv-plugin",
              title: "Load .env into serverless – serverless-dotenv-plugin"
            }
          ]}/>

        {extensions.includes("serverless-domain-manager") && (
          <>
            <TextInput
              title="Domain name for your API"
              value={domain}
              onChange={setDomain}
              placeholder="api.myapp.com"/>
            <TextInput
              title="Certificate name (needs to exist in us-east-1)"
              value={cert}
              onChange={setCert}
              placeholder="*.myapp.com"/>
          </>
        )}
        {extensions.includes("sentry") && (
          <>
            <TextInput
              title="Sentry DSN"
              value={sentryDsn}
              onChange={setSentryDsn}
              placeholder="https://xxx@xxx.ingest.sentry.io/xxx"/>
          </>
        )}

        <h3>Functions</h3>
        <div className="functions">
          {functions.map(func => (
            <div key={func.id} className="well">
              <h4>
                <span aria-hidden="true" onClick={() => updateFunction(func.id, "collapsed", !func.collapsed)}>
                  {func.name || "Untitled function"}
                </span>
                {func.collapsed ? (
                  <span>
                      <ArrowDownCircle
                        onClick={() => updateFunction(func.id, "collapsed", !func.collapsed)}
                        color='#777'
                        size={18}/>
                    </span>
                ) : (
                  <span>
                    <Trash
                      aria-hidden="true"
                      onClick={() => removeFunction(func.id)}
                      color='#f92672'
                      size={18}/>
                    <ArrowUpCircle
                      aria-hidden="true"
                      onClick={() => updateFunction(func.id, "collapsed", !func.collapsed)}
                      color='#333'
                      size={18}/>
                  </span>
                )}
              </h4>
              {func.collapsed ? (
                <div
                  className="summary"
                  aria-hidden="true"
                  onClick={() => updateFunction(func.id, "collapsed", !func.collapsed)}>
                  {createTriggerPreview(func.triggers)}
                </div>
              ) : (
                <>
                  <TextInput
                    title="Function name"
                    value={func.name}
                    onChange={(v) => updateFunction(func.id, "name", v)}
                    pattern="[\w\/-]{2,36}"/>
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
        <button onClick={submit}>Export scaffolding</button>
      </div>
    </Layout>
  );
};

export default ScaffoldPage;
