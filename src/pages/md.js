import React, { useState } from "react";
import showdown from "showdown";
import shortid from "shortid";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Header from "../components/Header";

import "../assets/styles/roam.scss";

const boxUrl =
  "https://mrm5dm6of9.execute-api.eu-west-1.amazonaws.com/production/box/get-url?filename=";

const MdPage = () => {
  const [content, setContent] = useState("");
  const submit = async () => {
    const fn = shortid.generate();
    const res = await fetch(`${boxUrl}${fn}.html&contentType=text/html`);
    const { key, url } = await res.json();

    const converter = new showdown.Converter();
    const html = `<!DOCTYPE html><html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <title>Note</title>
      <meta http-equiv="x-ua-compatible" content="ie=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <link href="/_common.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <main>
        <article className="blog-post md">
          ${converter.makeHtml(content)}
        </article>
      </main>
    </body>
    </html>`;

    await fetch(url, {
      method: "PUT",
      body: html,
      headers: {
        "Content-Type": "text/html",
      },
    });

    const box = `https://schof.co/${key}`;
    window.open(box);
  };

  return (
    <Layout className="markdown-editor">
      <Seo
        title="Markdown"
        meta={[{ name: "robots", content: "noindex, nofollow" }]}
      />

      <Header />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
      />

      <button onClick={submit}>Submit</button>
    </Layout>
  );
};

export default MdPage;
