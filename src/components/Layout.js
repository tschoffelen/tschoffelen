import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "../styles/index.scss"

const GA_TRACKING_ID = "UA-99611142-1"

const Layout = ({ children, className }) => (
  <main className={className}>
    <header>
      <h1 className="logo" title="Thomas Schoffelen">
        <Link
          id="logo"
          tabIndex={-1}
          to="/"
          title="Thomas Schoffelen"
          aria-label="Thomas Schoffelen"
          role="img"
        >
          TS
        </Link>
      </h1>
    </header>

    <section className="main">{children}</section>

    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TRACKING_ID}');`,
      }}
    />
  </main>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Layout.defaultProps = {
  className: "default",
}

export default Layout
