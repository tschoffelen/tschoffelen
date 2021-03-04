import React from "react"
import axios from "axios"
import useSWR from "swr"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Header from "../components/Header"

import "../assets/styles/roam.scss"

const NotePage = ({ ["*"]: noteId }) => {
  const { data } = useSWR(`https://schof.co/f/${noteId.replace("-", "/")}-note.md`, axios.get)
  console.log(noteId, data)

  const html = ((data && data.data) || "Loading...")
    .replace(/tabindex="0"/g, "")
    .replace(/tabindex="-1"/g, "")
    .replace(/<iframe/g, "<iframe frameborder=\"0\"")

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <Layout key="note">
      <SEO
        title="Notes"
        meta={[{ name: "robots", value: "noindex nofollow" }]} />

      <Header />

      <div
        className="roam-article"
        dangerouslySetInnerHTML={{ __html: html }} />

    </Layout>
  )
}

export default NotePage
