import React from "react";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Header from "../components/Header";

const MeetPage = () => (
  <Layout>
    <Seo title="Schedule a meeting" />

    <Header />

    <h1>Happy to help.</h1>
    <p>
      I love to help you out determining the way forward, whether it's
      determining the best way to structure your new engineering project, or
      talking about business strategy.
    </p>

    <p>
      If the options below aren't what you're looking for,{" "}
      <a href="mailto:thomas@schof.co" style={{ fontWeight: "bold" }}>
        let me know
      </a>{" "}
      and we'll see what we can do together.
    </p>

    <div className="links">
      <a
        href="https://calendly.com/tschof/consulting-30-mins"
        rel="noopener noreferrer"
        className="active"
        target="_blank"
      >
        Schedule a 30-minute session &rarr;
      </a>
      <a
        href="https://calendly.com/tschof/consulting"
        rel="noopener noreferrer"
        className="active"
        target="_blank"
      >
        Schedule a 1-hour session &rarr;
      </a>
    </div>
  </Layout>
);

export default MeetPage;
