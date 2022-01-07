import React, { useEffect } from "react";

import Layout from "../components/Layout";

const BoxPage = () => {
  useEffect(() => {
    window.location.href = "https://schof.link/?utm_source=box";
  });

  return <Layout>schof.link</Layout>;
};

export default BoxPage;
