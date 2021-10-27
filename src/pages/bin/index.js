import React, { useEffect } from "react";
import { nanoid } from "nanoid";

const BinPage = () => {
  const binId = nanoid(6);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = `/bin/${binId}?edit=1`;
    }
  }, []);

  return <p>Creating a new bin...</p>;
};

export default BinPage;
