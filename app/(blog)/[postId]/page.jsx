import { format } from "date-fns";
import fountain from "gatsby-remark-fountain/src/fountain";

import { getPosts, getSinglePost } from "@/lib/blog";
import CodeHighlighter from "@/components/blog/CodeHighlighter";
import { notFound } from "next/navigation";

export async function getStaticPaths() {
  return {
    paths: (await getPosts())
      .filter(({ relativeUrl }) => !!relativeUrl)
      .map(({ id }) => ({ params: { postId: id } })),
    fallback: "blocking",
  };
}

export default async function Post({ params: { postId } }) {
  const post = await getSinglePost(postId);

  if (!post) notFound();

  let html = post.html;
  if (post.fountain) {
    html = fountain(post.content).html.script;
  }

  return (
    <article>
      <div className="text-gray-800 text-[0.8rem] mb-3">
        {!post.attributes?.unlisted ? (
          <>
            {post.category ? (
              <span>
                <a
                  href={`/posts/${post.categorySlug}`}
                  className="uppercase hover:text-gray-800 transition font-bold mr-1"
                >
                  {post.category}
                </a>{" "}
              </span>
            ) : null}
            {format(new Date(post.date), "MMMM do, yyyy")}
          </>
        ) : null}
      </div>
      <h1 className="text-gray-900 font-bold text-3xl md:text-[3rem] leading-[1.4] mb-9 md:mb-12">
        {post.title}
      </h1>

      <section
        className={post.fountain ? "fountain-body" : "prose"}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <CodeHighlighter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: post.date,
              about: post.category,
              author: {
                "@context": "http://schema.org",
                "@type": "Person",
                name: "Thomas Schoffelen",
                familyName: "Schoffelen",
                givenName: "Thomas",
                url: "https://schof.co",
                image: "https://schof.co/avatar.jpg",
                sameAs: [
                  "https://github.com/tschoffelen",
                  "https://twitter.com/tschoffelen",
                  "https://linkedin.com/in/tschoffelen",
                ],
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Posts",
                  item: "https://schof.co/posts/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: post.category,
                },
              ],
            },
          ),
        }}
      />
    </article>
  );
}

export async function generateMetadata({ params: { postId } }) {
  const post = await getSinglePost(postId);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt
  };
}
