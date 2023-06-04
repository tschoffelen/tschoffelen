import Link from "next/link";

import PostLink from "@/components/blog/PostLink";

import { getPosts } from "@/lib/blog";
import SocialMedia from "@/components/home/SocialMedia";
import ProjectLinks from "@/components/home/ProjectLinks";
import { format } from "date-fns";
import CodeHighlighter from "@/components/blog/CodeHighlighter";

export default async function Home() {
  const allPosts = (await getPosts())
    .filter(({ unlisted }) => !unlisted)
    .filter(({relativeUrl}) => relativeUrl)
    .slice(0, 30);

  return (
    <>
      <section className="homepage">
        <aside>
          <div className="avatar">
            <div className="avatar-inner" />
          </div>

          <div>
            <h2 className="p-name">Hi, I'm Thomas.</h2>

            <p className="p-note">
              I build companies and tools to support small businesses and
              educators.
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
              their first business to designing technology platforms.
            </p>
          </div>

          <ProjectLinks />
          <SocialMedia />
        </aside>
        <div className="articles">
          <main>
            {allPosts.map((post) => (
              <article className="blog-post">
                <h1>
                  <Link href={post.relativeUrl}>{post.title}</Link>
                </h1>
                <div className="blog-post-date">
                  {post.category ? (
                    <span>
                      <span className="blog-post-category">
                        {post.category}
                      </span>{" "}
                    </span>
                  ) : null}
                  <strong>{format(new Date(post.date), "MMMM d, yyyy")}</strong>
                </div>

                <section
                  className={post.fountain ? "fountain-body" : undefined}
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </article>
            ))}
          </main>
        </div>
      </section>

      <CodeHighlighter />

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
