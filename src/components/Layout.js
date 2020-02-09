import React from "react";
import PropTypes from "prop-types";

import "../assets/index.scss";

const Layout = ({ children, className }) => (
  <main className={className}>
    {children}
  </main>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Layout.defaultProps = {
  className: "default"
};

export default Layout;
