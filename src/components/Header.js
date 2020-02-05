import React from "react"
import { Link } from "gatsby"

export default function Header() {
  return (
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
  )
}
