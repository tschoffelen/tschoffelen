import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Header from "../components/Header";

const MeetPage = () => (
  <Layout>
    <SEO title="Schedule a meeting" />

    <Header />

    <h1>Let's talk.</h1>
    <p>
      Let's have a 30 minute call via Zoom or a coffee break some place in the
      beautiful Hoxton area (London, UK).
    </p>

    <div
      style={{
        minWidth: 300,
        height: 750,
        marginTop: 64,
        borderRadius: 8,
        border: "1px solid #f2f2f2",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <iframe
        title="Schedule a call or coffee meeting."
        src="https://calendly.com/tschof/30min?embed_domain=localhost%3A8000&amp;embed_type=Inline&amp;hide_event_type_details=1&amp;background_color=fff&amp;primary_color=355fc5"
        width="100%"
        height="100%"
        style={{ borderRadius: 8 }}
        frameBorder="0"
      />
    </div>
  </Layout>
);

export default MeetPage;
