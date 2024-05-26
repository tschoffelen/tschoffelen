"use client";

import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-js-extras";

export default function CodeHighlighter() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
}
