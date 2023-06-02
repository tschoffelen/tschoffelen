import React from "react";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";

export default function Header() {
  return (
    <header>
      <h1 className="logo" title="Thomas Schoffelen">
        <Link
          id="logo"
          tabIndex={-1}
          href="/"
          title="Thomas Schoffelen"
          aria-label="Thomas Schoffelen"
          role="img"
        >
          <ArrowLeftCircle/>
        </Link>
      </h1>
    </header>
  );
}
