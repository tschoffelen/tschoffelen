import React from "react";
import { Image } from "react-feather";
import useSWR from "swr";
import axios from "axios";

import Layout from "../../components/Layout";
import DragAndDrop from "../../components/DragAndDrop";
import Seo from "../../components/Seo";

import "./style.scss";

const binUrl =
  "https://mrm5dm6of9.execute-api.eu-west-1.amazonaws.com/production/bin/";

const boxUrl =
  "https://mrm5dm6of9.execute-api.eu-west-1.amazonaws.com/production/box/get-url?filename=";

const getBin = async (id) => {
  const { data } = await axios.get(`${binUrl}${id}`);
  return data;
};

const BinPage = ({ params: { id } }) => {
  let { data, mutate } = useSWR(id, getBin);
  const editMode =
    typeof window !== "undefined" && window.location.href.includes("edit");

  if (!data) {
    return <Layout className="bin">Loading...</Layout>;
  }

  const updateBin = async (newData) => {
    await mutate(newData, false);
    await axios.post(`${binUrl}${id}`, newData);
    return newData;
  };

  const setTitle = async (title) => {
    const newData = {
      ...data,
      title,
    };
    return updateBin(newData);
  };

  const addItem = async (files) => {
    try {
      for (const file of files) {
        if (file.body || !file.type.startsWith("image/")) {
          throw new Error("Sorry, that doesn't look like an image.");
        }

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
            },
          });
        } else {
          await fetch(url, { method: "PUT", body: file });
        }

        const newData = {
          ...data,
          items: [
            ...data.items,
            {
              url: publicUrl,
              filename: file.name,
              type: file.type,
            },
          ],
        };

        data = await updateBin(newData);
      }
    } catch (e) {
      if (e.message && e.message.includes("Is a directory")) {
        e.message = "Dude, that's a folder!";
      }
      alert(e.message);
    }
  };

  const Wrapper = editMode ? DragAndDrop : (props) => <div {...props} />;

  return (
    <Layout className="bin">
      <Wrapper className="drag-drop" handleDrop={addItem}>
        <Seo meta={[{ name: "robots", content: "noindex, nofollow" }]} />
        <input
          type="text"
          readOnly={!editMode}
          onChange={(e) => setTitle(e.target.value)}
          className="bin__title"
          value={data.title}
        />
        <div className="bin__url">https://schof.co/bin/{id}</div>
        <div className="bin__items">
          {data.items.map((item) => (
            <a
              className="bin__item"
              key={item.url}
              href={item.url}
              target="_blank"
              draggable="false"
            >
              <img alt={item.filename} draggable="false" src={item.url} />
            </a>
          ))}
        </div>
        {!data.items.length ? (
          <div className="bin__placeholder">
            <Image size={32} />
            <span>Start by dropping some images</span>
          </div>
        ) : null}
      </Wrapper>
    </Layout>
  );
};

export default BinPage;
