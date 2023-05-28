"use client";

import Prism from "prismjs";
import { useEffect } from "react";

export default function CodeHighlighter() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
}
