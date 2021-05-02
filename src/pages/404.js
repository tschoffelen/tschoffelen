import React from "react";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Header from "../components/Header";

const NotFoundPage = () => (
  <Layout>
    <Seo title="Page not found" />

    <Header />

    <h2>You're drunk.</h2>
    <p>
      Four-oh-four. Nothing here pal. <br />
      <Link className="link" to="/">
        Let me call you a cab.
      </Link>
    </p>
  </Layout>
);

export default NotFoundPage;
