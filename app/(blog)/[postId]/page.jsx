import { format } from "date-fns";
import fountain from "gatsby-remark-fountain/src/fountain";

import Header from "@/components/Header";

import { getPosts, getSinglePost } from "@/lib/blog";
import CodeHighlighter from "@/components/blog/CodeHighlighter";

export async function getStaticPaths() {
  return {
    paths: (await getPosts()).map(({ id }) => ({ params: { postId: id } })),
    fallback: false,
  };
}

export default async function Post({ params: { postId } }) {
  const post = await getSinglePost(postId);

  let html = post.html;
  if (post.fountain) {
    html = fountain(post.content).html.script;
  }

  return (
    <article className="blog-post">
      <h1>{post.title}</h1>
      <div className="blog-post-date">
        {post.category ? (
          <span>
            <span className="blog-post-category">{post.category}</span>{" "}
          </span>
        ) : null}
        <strong>{format(new Date(post.date), "MMMM d, yyyy")}</strong>
      </div>

      <section
        className={post.fountain ? "fountain-body" : undefined}
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
            }
          ),
        }}
      />
    </article>
  );
}

export async function generateMetadata({ params: { postId } }) {
  const post = await getSinglePost(postId);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: post.url,
    },
  };
}
