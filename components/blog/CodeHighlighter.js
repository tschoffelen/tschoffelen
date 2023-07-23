"use client";

import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";

export default function CodeHighlighter() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
}
