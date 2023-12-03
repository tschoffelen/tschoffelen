import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-6 px-8 md:p-8 md:px-10 text-sm flex items-center justify-between border-b mb-4 md:mb-10">
      <h1>
        <Link
          id="logo"
          href="/"
          title="Thomas Schoffelen"
          aria-label="Thomas Schoffelen"
          role="img"
          className="text-gray-900 leading-tight hover:text-black transition-colors duration-200 ease-in-out font-semibold flex gap-3 items-center"
        >
          <span className="w-4 h-4 rounded-sm bg-current" />
          Thomas Schoffelen
        </Link>
      </h1>
      <ul className="flex items-center gap-4 md:gap-6">
        <li>
          <Link href="/about" className="text-gray-500">
            About
          </Link>
        </li>
        <li>
          <Link href="/posts" className="text-gray-500">
            Posts
          </Link>
        </li>
      </ul>
    </header>
  );
}
