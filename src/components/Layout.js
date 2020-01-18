import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "../styles/index.scss";

const GA_TRACKING_ID = "UA-99611142-1";

const Layout = ({ children }) => (
  <>
    <main>
      <header>
        <h1 className="logo" title="Thomas Schoffelen">
          <Link id="logo" to="/" title="Thomas Schoffelen">TS</Link>
        </h1>
      </header>

      <section>{children}</section>

      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
      <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TRACKING_ID}');` }}/>
    </main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
