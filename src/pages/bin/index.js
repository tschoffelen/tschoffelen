import React from "react";
import { Redirect } from "@reach/router";
import { nanoid } from "nanoid";

const BinPage = () => {
  const binId = nanoid(6);

  return <Redirect to={`/bin/${binId}?edit=1`} />;
};

export default BinPage;
