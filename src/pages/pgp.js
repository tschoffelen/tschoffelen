import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const PgpPage = () => (
  <Layout>
    <SEO title="PGP key" />
    <h2>My public key.</h2>
    <p>Fingerprint:</p>
    <pre className="pgp">EE0F 4B84 A58A 3FF0 5728 9044 7599 4EE6 D0F1 FD7F</pre>

    <p style={{ marginTop: 48 }}>Key:</p>
    <pre className="pgp">
      {`-----BEGIN PGP PUBLIC KEY BLOCK-----
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
2/1Fechg
=9e0f
-----END PGP PUBLIC KEY BLOCK-----`}
    </pre>
  </Layout>
)

export default PgpPage
