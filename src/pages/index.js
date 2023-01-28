import Link from "next/link";

import Seo from "@/components/Seo";
import PostLink from "@/components/blog/PostLink";

import { getPosts } from "@/lib/blog";

export const getStaticProps = async () => {
  const allPosts = (await getPosts())
    .slice(0, 3)
    .map(({ url, relativeUrl, title, category, excerpt, date }) => ({
      url,
      relativeUrl,
      title,
      category,
      excerpt,
      date,
    }));

  return {
    props: { allPosts },
    revalidate: 3600,
  };
};

export default function Home({ allPosts }) {
  return (
    <>
      <Seo />
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
              <Link href="/posts">Recent posts</Link>
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
            <a
              href="https://twitter.com/tschoffelen"
              className="u-url"
              rel="noopener noreferrer"
              target="_blank"
            >
              Follow me on Twitter
            </a>
            <a
              href="https://github.com/tschoffelen"
              className="u-url"
              rel="noopener noreferrer"
              target="_blank"
            >
              Follow me on Github
            </a>
            <a href="mailto:thomas@schof.co" className="u-email" rel="author">
              Send me an email
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
    </>
  );
}
