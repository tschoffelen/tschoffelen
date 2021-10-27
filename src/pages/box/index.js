import React, { useState } from "react";
import { ArrowUpCircle, CheckCircle, XCircle } from "react-feather";

import Layout from "../../components/Layout";
import DragAndDrop from "../../components/DragAndDrop";
import Seo from "../../components/Seo";

import "./style.scss";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { Link } from "gatsby";

const boxUrl =
  "https://mrm5dm6of9.execute-api.eu-west-1.amazonaws.com/production/box/get-url?filename=";

const wait = async (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const BoxPage = () => {
  const [text, setText] = useState(null);
  const [className, setClassName] = useState("");
  const [dismissedBinNotice, setDismissedBinNotice] = useLocalStorage("dismissed_bin_notice", "0");

  return (
    <Layout>
      <Seo meta={[{ name: "robots", content: "noindex, nofollow" }]} />
      <DragAndDrop
        className={`box-area ${className}`}
        handleDrop={async (files) => {
          try {
            const file = files[0];

            setText(
              <>
                <ArrowUpCircle size={32} />
                <span>Uploading {file.name}...</span>
              </>
            );

            const res = await fetch(
              `${boxUrl}${encodeURIComponent(
                file.name
              )}&contentType=${encodeURIComponent(file.type)}`
            );
            const { key, url } = await res.json();

            if (file.body) {
              await fetch(url, {
                method: "PUT",
                body: file.body,
                headers: {
                  "Content-Type": file.type,
                },
              });
            } else {
              await fetch(url, { method: "PUT", body: file });
            }

            const box = `https://schof.co/${key}`;
            setClassName("success");
            setText(
              <>
                <CheckCircle size={32} />
                <span className="box-url">{box}</span>
              </>
            );

            try {
              window.focus();
              window.getSelection().removeAllRanges();
              await wait(100);
              const range = document.createRange();
              range.selectNode(document.querySelector(".box-area"));
              window.getSelection().addRange(range);
              try {
                await navigator.clipboard.writeText(box);
              } catch (e) {}
              document.execCommand("copy");
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
                <span>{e.message || "Unknown error"}</span>
              </>
            );
          }
        }}
      >
        {text}
      </DragAndDrop>
      {dismissedBinNotice === '0' && (
        <div className="promo-callout">
          <button
            className="promo-callout__close"
            onClick={() => setDismissedBinNotice("1")}
          >
            &times;
          </button>
          <div className="promo-callout__label">NEW</div>
          <div>Need to send multiple images?</div>
          <Link to="/bin">
            Give <code>/bin</code> a try &rarr;
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default BoxPage;
