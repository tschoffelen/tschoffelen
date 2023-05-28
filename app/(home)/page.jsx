import Link from "next/link";

import PostLink from "@/components/blog/PostLink";

import { getPosts } from "@/lib/blog";

export default async function Home() {
  const allPosts = (await getPosts())
    .filter(({ unlisted }) => !unlisted)
    .slice(0, 4)
    .map(({ url, relativeUrl, title, category, excerpt, date }) => ({
      url,
      relativeUrl,
      title,
      category,
      excerpt,
      date,
    }));

  return (
    <>
      <div className="h-card">
        <div className="hero">
          <main className="homepage">
            <div className="avatar">
              <div className="avatar-inner" />
            </div>

            <div>
              <h2 className="p-name">Hi, I'm Thomas.</h2>

              <p className="p-note">
                I build startups and tools to help businesses and educators.
              </p>
              <p>
                Alongside my work at{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.near.st/?utm_source=schof.co"
                >
                  NearSt
                </a>
                , I consult founders and engineers on everything from setting up
                their first business to designing modern technology platforms.
              </p>
            </div>
          </main>
        </div>
        <main className="homepage-links">
          <div className="links">
            <h3>
              <Link href="/posts">Recent posts ↗</Link>
            </h3>

            {allPosts.map((post) => (
              <PostLink key={post.url} {...post} showCategory />
            ))}
          </div>

          <div className="links">
            <h3>What I'm working on</h3>
            <a
              href="https://near.st/?utm_source=schof.co"
              className="p-org"
              rel="noopener noreferrer"
              target="_blank"
            >
              NearSt
              <span className="sr"> - </span>
              <span className="link-description">
                Making products visible online to get more in-store customers.
              </span>
            </a>
            <a
              href="https://streetartcities.com/?utm_source=schof.co"
              className="p-org"
              rel="noopener noreferrer"
              target="_blank"
            >
              Street Art Cities
              <span className="sr"> - </span>
              <span className="link-description">
                The world's largest street art community platform.
              </span>
            </a>
            <a
              href="https://infowijs.nl/?utm_source=schof.co"
              className="p-org"
              rel="noopener noreferrer"
              target="_blank"
            >
              Infowijs
              <span className="sr"> - </span>
              <span className="link-description">
                Communication tools used by 100s of Dutch schools.
              </span>
            </a>
            <a
              href="https://sueterapp.com/?utm_source=schof.co"
              className="p-org"
              rel="noopener noreferrer"
              target="_blank"
            >
              Sueter
              <span className="sr"> - </span>
              <span className="link-description">
                The sustainable circular fashion network.
              </span>
            </a>
          </div>

          <div className="links">
            <h3>Get in touch</h3>
            <a href="mailto:thomas@schof.co" className="u-email" rel="author">
              Send me an email
            </a>
            <a
              href="https://github.com/tschoffelen"
              className="u-url"
              rel="noopener noreferrer"
              target="_blank"
            >
              Follow me on Github
            </a>
          </div>

          <a
            style={{ display: "none" }}
            aria-hidden="true"
            href="https://schof.co"
            className="u-url u-uid"
          >
            Thomas Schoffelen
          </a>
        </main>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Person",
            name: "Thomas Schoffelen",
            familyName: "Schoffelen",
            givenName: "Thomas",
            worksFor: [
              {
                "@type": "Role",
                roleName: "Head of Engineering",
                startDate: "2016",
                worksFor: {
                  "@type": "Organization",
                  name: "NearSt",
                },
              },
              {
                "@type": "Role",
                roleName: "Founder",
                startDate: "2017",
                worksFor: {
                  "@type": "Organization",
                  name: "Thomas Schoffelen BV",
                  brand: "schof.co",
                  taxID: "67640516",
                  duns: "492180704",
                  email: "info@schof.co",
                  vatID: "NL857104779B01",
                },
              },
            ],
            url: "https://schof.co",
            jobTitle: "Head of Platform Innovation",
            gender: "male",
            image: "https://schof.co/avatar.jpg",
            sameAs: [
              "https://github.com/tschoffelen",
              "https://twitter.com/tschoffelen",
              "https://linkedin.com/in/tschoffelen",
              "https://social.coop/@tschoffelen",
            ],
          }),
        }}
      />
    </>
  );
}
