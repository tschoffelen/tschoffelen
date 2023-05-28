import "@/styles/globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const revalidate = 3600;

export const metadata = {
  title: "Thomas Schoffelen",
  description:
    "Thomas Schoffelen is a tech entrepreneur and consultant, co-founder of NearSt and Infowijs, building tools to help small businesses and educators.",
  keywords:
    "thomas schoffelen, thomas, schoffelen, consulting, engineer, entrepreneur, startups, young startup",
  author: "Thomas Schoffelen",
  category: 'technology',
  "google-site-verification": "PfK2tt-swzI7S9DjGXMWXb6BEo09M6ATCR87bR5HqQE",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f5" },
    { media: "(prefers-color-scheme: dark)", color: "#212733" },
  ],
  twitter: {
    card: "summary_large_image",
    creator: "@tschoffelen",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://schof.co/api/rss.xml",
    },
  },
  bookmarks: [
    "https://schof.co/pgp.txt",
    "https://twitter.com/tschoffelen",
    "https://instagram.com/tschoffelen",
    "https://github.com/tschoffelen",
    'https://github.com/tschoffelen',
  ],
  other: {
    text: `





          Looking for my company info?

          Company name:              Thomas Schoffelen B.V.
          Contact email:             thomas@schof.co
          NL Chamber of Commerce:    67640516
          VAT number:                NL857104779B01





    `,
  },
};
