import React from "react"
import PropTypes from "prop-types"

import "../styles/index.scss"

const GA_TRACKING_ID = "UA-99611142-1"

const Layout = ({ children, className }) => (
  <main className={className}>
    {children}

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
