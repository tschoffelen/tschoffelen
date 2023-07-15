import React from "react";
import { Github, Mail, Rss, Twitter } from "lucide-react";

const SocialMedia = () => {
  return (
    <div className="border-t border-gray-200 mt-10 pt-10 md:mt-16 md:pt-16 flex justify-center gap-7" title="Get in touch">
      <a
        href="https://social.coop/@tschoffelen"
        className="u-url"
        rel="noopener noreferrer"
        target="_blank"
        title="Follow me on Mastodon"
      >
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
          <g
            stroke="none"
            stroke-width="1"
            fill="none"
            transform="translate(2.6712, 2)"
            fill-rule="nonzero"
          >
            <path
              d="M18.6569726,6.56647763 C18.6569726,2.22788652 15.8132315,0.955768758 15.8132315,0.955768758 C13.0226068,-0.325276148 5.61129339,-0.311885435 2.84745016,0.955768758 C2.84745016,0.955768758 0.00326265693,2.22788652 0.00326265693,6.56647763 C0.00326265693,11.7308294 -0.291333036,18.1449811 4.71813281,19.4706617 C6.52632546,19.9482638 8.08009456,20.0509259 9.33034083,19.9795088 C11.5982813,19.8545288 12.8708454,19.1716024 12.8708454,19.1716024 L12.8708454,17.9753654 C12.8708454,17.9753654 11.1742421,18.0333918 9.35265868,17.9753654 C7.5489296,17.9128754 5.64789467,17.7789682 5.35195991,15.565037 C5.32452168,15.3593745 5.31110001,15.1520842 5.31178777,14.9446006 C9.1339437,15.8774869 12.3932433,15.3507856 13.2904211,15.2436599 C15.7953772,14.9446006 17.9771708,13.400205 18.2552512,11.9897165 C18.6926812,9.76685811 18.6569726,6.56647763 18.6569726,6.56647763 Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.0406881,10.9965369 L13.0406881,7.09056443 L13.0406881,7.09056443 C13.0406881,4.97581043 10.3174636,4.89496471 10.3174636,7.38416207 L10.3174636,10.043561 L8.34610441,10.043561 L8.34610441,7.38373656 C8.34610441,4.8945392 5.62287995,4.97538493 5.62287995,7.09013893 L5.62287995,10.9961114 C5.62287995,11.5225941 5.19608144,11.9493926 4.66959879,11.9493926 L4.57460638,11.9493926 C4.05329732,11.9493926 3.62867237,11.5306364 3.62141754,11.0093778 L3.61506888,10.5532279 L3.61506888,10.5532279 C3.68364074,7.05538557 3.95123549,5.03866815 4.41785312,4.50307569 C5.51990802,3.27336964 7.81422463,3.19252391 8.83585931,4.76263302 L9.32944375,5.59236547 L9.82302818,4.76263302 C10.8489179,3.18401384 13.147064,3.28187972 14.2410344,4.50307569 C14.8483481,5.20234456 15.1110064,7.21802627 15.0290093,10.5501208 L15.0273873,10.9997542 C15.0254931,11.5248111 14.5993772,11.9494837 14.0743168,11.9495963 L13.9939692,11.9496136 C13.4674866,11.949931 13.0405966,11.5232241 13.0404836,10.9967414 C13.0404836,10.9966733 13.0404836,10.9966051 13.0406881,10.9965369 Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </a>

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
      <a
        href="/api/rss.xml"
        title="Subscribe via RSS"
      >
        <Rss />
      </a>
    </div>
  );
};

export default SocialMedia;
