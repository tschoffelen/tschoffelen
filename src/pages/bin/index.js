import React from "react";
import { nanoid } from "nanoid";

import "./style.scss";

const BinPage = () => {
  const createBin = () => {
    const binId = nanoid(6);
    window.location.href = `/bin/${binId}?edit=1`;
  };

  return (
    <div className="bin-home">
      <p>
        Bins allow you to store a set of images and show them on one web page.
        <br />
        Each bin has its own unique link you can share with others.
      </p>
      <button onClick={createBin}>Create a bin</button>
    </div>
  );
};

export default BinPage;
