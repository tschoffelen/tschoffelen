import React, { useEffect } from "react";

import Layout from "../components/Layout";

const BoxPage = () => {
  useEffect(() => {
    window.location.href = "https://schof.link/?utm_source=box";
  });

  return (
    <Layout>
      <p>schof.link</p>
      <meta
        httpEquiv="refresh"
        content="0; url=https://schof.link/?utm_source=box"
      />
    </Layout>
  );
};

export default BoxPage;
