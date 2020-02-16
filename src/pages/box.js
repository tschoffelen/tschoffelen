import React, { useState } from "react"

import Layout from "../components/Layout"
import DragAndDrop from "../components/DragAndDrop"

const boxUrl =
  "https://mrm5dm6of9.execute-api.eu-west-1.amazonaws.com/production/box/get-url?filename="

const BoxPage = () => {
  const [text, setText] = useState("Drop your stuff")

  return (
    <Layout>
      <DragAndDrop
        handleDrop={files => {
          const file = files[0]
          setText(`Preparing ${file.name}...`)

          fetch(
            `${boxUrl}${encodeURIComponent(
              file.name
            )}&contentType=${encodeURIComponent(file.type)}`
          )
            .then(res => res.json())
            .then(({ key, url }) => {
              setText(`Uploading ${file.name}...`)
              fetch(url, { method: "PUT", body: file })
                .then(() => {
                  const box = `https://schof.co/${key}`
                  setText(box)
                  try {
                    const range = document.createRange()
                    range.selectNode(document.querySelector(".box-area"))
                    window.getSelection().addRange(range)
                    document.execCommand("copy")
                  } catch (e) {}
                })
                .catch(e => {
                  setText(e.message || e || "Unknown error")
                })
            })
            .catch(e => {
              setText(e.message || e || "Unknown error")
            })
        }}
      >
        {text}
      </DragAndDrop>
    </Layout>
  )
}

export default BoxPage
