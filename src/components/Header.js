import React from "react";
import Link from "next/link";

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
          <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <path
                d="M24.5853659,0 C26.4712162,-3.46425092e-16 28,1.52878378 28,3.41463415 L28,24.5853659 C28,26.4712162 26.4712162,28 24.5853659,28 L3.41463415,28 C1.52878378,28 2.30950061e-16,26.4712162 0,24.5853659 L0,3.41463415 C-2.30950061e-16,1.52878378 1.52878378,3.46425092e-16 3.41463415,0 L24.5853659,0 Z M14,7.17073171 C10.2282993,7.17073171 7.17073171,10.2282993 7.17073171,14 C7.17073171,17.7717007 10.2282993,20.8292683 14,20.8292683 C17.7717007,20.8292683 20.8292683,17.7717007 20.8292683,14 C20.8292683,10.2282993 17.7717007,7.17073171 14,7.17073171 Z"
                fill="currentColor"
              />
            </g>
          </svg>
        </Link>
      </h1>
    </header>
  );
}
