import React from "react";

import Header from "./Header";

export default function Hero ({ children, className = "" }) {
  return (
    <div className={`hero ${className}`}>
      <Header/>

      <main>
        {children}
      </main>
    </div>
  );
}
