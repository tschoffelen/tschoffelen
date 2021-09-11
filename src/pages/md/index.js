import React, { useCallback, useEffect, useRef, useState } from "react";
import showdown from "showdown";
import shortid from "shortid";
import debounce from "lodash.debounce";

import Layout from "../../components/Layout";
import Seo from "../../components/Seo";

import "../../assets/styles/roam.scss";
import "./style.scss";

const boxUrl =
  "https://mrm5dm6of9.execute-api.eu-west-1.amazonaws.com/production/box/get-url?filename=";

const converter = new showdown.Converter();

const getHtml = (md) => {
  return `<!DOCTYPE html><html lang="en">
<head>
  <meta charSet="utf-8"/>
  <title>Note</title>
  <meta http-equiv="x-ua-compatible" content="ie=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  <link href="/_common.css" rel="stylesheet" type="text/css" />
  <link href="/_markdown.css" rel="stylesheet" type="text/css" />
  <link href="https://schof.co/f/gttr/prism-(1).css" rel="stylesheet" type="text/css" />
  <style>
    .markdown-body {
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 48px;
    }
  
    @media (max-width: 480px) {
      .markdown-body {
        padding: 16px;
      }
    }
  </style>
</head>
<body>
<article class="markdown-body">
  ${converter.makeHtml(md)}
</article>
<script src="https://schof.co/f/9x70/prism-(1).js"></script>
<!--



${md.replace(/<!--/g, '')}



-->
</body>
</html>`;
};

const MdPage = () => {
  const [content, setActualContent] = useState("");
  const iframe = useRef();

  const setContent = (value) => {
    setActualContent(value);
    window.localStorage.mdContent = value;
  };

  useEffect(() => {
    if (window && window.localStorage.mdContent) {
      setActualContent(window.localStorage.mdContent);
    }
  }, []);

  const updatePreview = useCallback(
    debounce((content) => {
      if (!iframe.current) {
        return;
      }
      iframe.current.contentWindow.document.body.innerHTML = getHtml(content);
    }, 300),
    []
  );

  useEffect(() => {
    updatePreview(content);
  }, [content, updatePreview]);

  const submit = async () => {
    const fn = shortid.generate();
    const res = await fetch(`${boxUrl}${fn}.html&contentType=text/html`);
    const { key, url } = await res.json();

    await fetch(url, {
      method: "PUT",
      body: getHtml(content),
      headers: {
        "Content-Type": "text/html",
      },
    });

    const box = `https://schof.co/${key}`;
    window.open(box);

    setContent("");
  };

  return (
    <Layout className="markdown-editor">
      <Seo
        title="Markdown"
        meta={[{ name: "robots", content: "noindex, nofollow" }]}
      />

      <div className="markdown__editor">
        <textarea
          autoFocus
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
        />
        <button onClick={submit}>Publish page</button>
      </div>

      <div className="markdown__preview">
        <iframe
          title="Markdown preview"
          key="preview"
          frameBorder="0"
          ref={iframe}
        />
      </div>
    </Layout>
  );
};

export default MdPage;
