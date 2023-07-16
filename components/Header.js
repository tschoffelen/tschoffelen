import React from "react";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="lg:pb-16">
      <h1 className="p-8 pb-2 lg:pb-8 lg:fixed t-0 l-0" title="Thomas Schoffelen">
        <Link
          id="logo"
          tabIndex={-1}
          href="/"
          title="Thomas Schoffelen"
          aria-label="Thomas Schoffelen"
          role="img"
          className="text-gray-800 hover:text-gray-600 transition-colors duration-200 ease-in-out"
        >
          <ArrowLeftCircle/>
        </Link>
      </h1>
    </header>
  );
}
