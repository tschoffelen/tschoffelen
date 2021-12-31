import React, { useState } from "react";
import { ArrowUpCircle, CheckCircle, Copy, XCircle } from "react-feather";

import Layout from "../../components/Layout";
import DragAndDrop from "../../components/DragAndDrop";
import Seo from "../../components/Seo";

import "./style.scss";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { Link } from "gatsby";
import { toast, Toaster } from "react-hot-toast";
import copy from "copy-to-clipboard";

const boxUrl =
  "https://mrm5dm6of9.execute-api.eu-west-1.amazonaws.com/production/box/get-url?filename=";

const BoxPage = () => {
  const [text, setText] = useState(null);
  const [className, setClassName] = useState("");
  const [dismissedBinNotice, setDismissedBinNotice] = useLocalStorage(
    "dismissed_bin_notice",
    "0"
  );

  return (
    <Layout>
      <Seo meta={[{ name: "robots", content: "noindex, nofollow" }]} />
      <Toaster />
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
            const { url, publicUrl } = await res.json();

            if (file.body) {
              await fetch(url, {
                method: "PUT",
                body: file.body,
                headers: {
                  "Content-Type": file.type,
                  "Content-Disposition": `inline; filename="${file.name}"`
                },
              });
            } else {
              await fetch(url, {
                method: "PUT",
                body: file,
                headers: {
                  "Content-Disposition": `inline; filename="${file.name}"`,
                },
              });
            }

            setClassName("success");
            setText(
              <>
                <div className="box-result">
                  <span className="box-url">{publicUrl}</span>
                  <Copy
                    className="box-copy"
                    size={18}
                    onClick={() => {
                      if (copy(publicUrl)) {
                        toast("Copied", {
                          icon: "👏",
                          style: {
                            paddingLeft: 18,
                            borderRadius: "24px",
                            background: "#333",
                            fontSize: 14,
                            color: "#fff",
                          },
                        });
                      }
                    }}
                  />
                </div>
              </>
            );
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
      {dismissedBinNotice === "0" && (
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
