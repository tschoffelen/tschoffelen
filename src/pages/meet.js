import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Header from "../components/Header"

let loaded = false

const MeetPage = () => {
  if(!loaded){
    var script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    document.head.appendChild(script);
  }

  return (
  <Layout>
    <SEO title="Schedule a meeting" />

    <Header />

    <div className="calendly-inline-widget" data-url="https://calendly.com/tschof/30min?background_color=faf8f9&primary_color=355fc5" style={{minWidth: 300, height: 658}}/>
    <style>{`main { max-width: none; }`}</style>
  </Layout>
)
}

export default MeetPage
