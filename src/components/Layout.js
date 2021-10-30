import React from "react";

import "../assets/index.scss";

const Layout = ({ children, className = 'default', fullWidth = false }) =>
  fullWidth ? children : <main className={className}>{children}</main>;

export default Layout;
