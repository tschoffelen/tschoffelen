import React from "react";
import { Github, Mail, Twitter } from "lucide-react";

const SocialMedia = () => {
  return (
    <div className="social-links" title="Get in touch">
      <a
        href="mailto:thomas@schof.co"
        className="u-email"
        rel="author"
        title="Send me an email"
      >
        <Mail />
      </a>
      <a
        href="https://twitter.com/tschoffelen"
        className="u-url"
        rel="noopener noreferrer"
        target="_blank"
        title="Follow me on Twitter"
      >
        <Twitter />
      </a>
      <a
        href="https://github.com/tschoffelen"
        className="u-url"
        rel="noopener noreferrer"
        target="_blank"
        title="Follow me on GitHub"
      >
        <Github />
      </a>
    </div>
  );
};

export default SocialMedia;
