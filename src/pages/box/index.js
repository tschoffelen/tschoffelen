import React, { useState } from "react";
import { ArrowUpCircle, CheckCircle, XCircle } from "react-feather";

import Layout from "../../components/Layout";
import DragAndDrop from "../../components/DragAndDrop";
import SEO from "../../components/SEO";

import "./style.scss";

const boxUrl =
  "https://mrm5dm6of9.execute-api.eu-west-1.amazonaws.com/production/box/get-url?filename=";

const wait = async(timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const BoxPage = () => {
  const [text, setText] = useState(null);
  const [className, setClassName] = useState("");

  return (
    <Layout>
      <SEO meta={[{ name: "robots", value: "noindex nofollow" }]} />
      <DragAndDrop
        className={className}
        handleDrop={async(files) => {
          try {
            const file = files[0];

            setText(
              <>
                <ArrowUpCircle size={32} />
                <span>
                Uploading {file.name}...
              </span>
              </>,
            );

            const res = await fetch(`${boxUrl}${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`);
            const { key, url } = await res.json();

            await fetch(url, { method: "PUT", body: file });

            const box = `https://schof.co/${key}`;
            setClassName("success");
            setText(
              <>
                <CheckCircle size={32} />
                <span className="box-url">{box}</span>
              </>,
            );

            try {
              window.getSelection().removeAllRanges();
              await wait(100);
              const range = document.createRange();
              range.selectNode(document.querySelector(".box-area"));
              window.getSelection().addRange(range);
              document.execCommand("copy");
              await wait(200);
              window.getSelection().removeAllRanges();
            } catch (e) {
              console.log(e);
            }
          } catch (e) {
            if (e.message && e.message.includes("Is a directory")) {
              e.message = "Dude, that's a folder!";
            }
            setClassName("failed");
            setText(
              <>
                <XCircle size={32} />
                <span>
                  {e.message || "Unknown error"}
                </span>
              </>,
            );
          }
        }}
      >{text}</DragAndDrop>
    </Layout>
  );
};

export default BoxPage;
