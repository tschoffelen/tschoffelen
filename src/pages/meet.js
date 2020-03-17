import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Header from "../components/Header"

let loaded = false

const MeetPage = () => {
  if(!loaded && typeof window !== `undefined`){
    var script = window.document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    window.document.head.appendChild(script);
    loaded = true;
  }

  return (
  <Layout>
    <SEO title="Schedule a meeting" />

    <Header />

    <div className="calendly-inline-widget" data-url="https://calendly.com/tschof/30min?background_color=faf8f9&primary_color=355fc5" style={{minWidth: 300, height: 658}}/>
    <style>{`main { max-width: none; }`}</style>
    <script src="https://assets.calendly.com/assets/external/widget.js" />
  </Layout>
)
}

export default MeetPage
