import Link from "next/link";

import PostLink from "@/components/blog/PostLink";

import { getPosts } from "@/lib/blog";
import ProjectLinks from "@/components/home/ProjectLinks";
import Header from "@/components/Header";

export default async function Home() {
  const allPosts = (await getPosts())
    .filter(({ unlisted }) => !unlisted)
    .slice(0, 5)
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
      <Header />
      <section className="h-card text-gray-800">
        <main className="p-8 md:p-16 max-w-[50rem] mx-auto md:flex items-center">
          <div className="avatar" />

          <div className="prose">
            <p className="p-name font-semibold text-gray-800">
              Hi, I'm Thomas.
            </p>

            <p className="p-note">
              I build companies and tools to support small businesses and
              educators.
            </p>
            <p>
              Alongside my work at{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="no-underline hover:underline"
                href="https://www.near.st/?utm_source=schof.co"
              >
                NearSt
              </a>
              , I consult founders and engineers on everything from setting up
              their first business to designing technology platforms.
            </p>
          </div>
        </main>

        <main className="p-8 md:p-16 max-w-[50rem] mx-auto md:border rounded-2xl">
          <h3 className="font-semibold mb-6">Recent writings</h3>
          {allPosts.map((post) => (
            <PostLink key={post.url} {...post} />
          ))}
          <Link
            href="/posts"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            View all →
          </Link>
        </main>

        <ProjectLinks />
      </section>

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
