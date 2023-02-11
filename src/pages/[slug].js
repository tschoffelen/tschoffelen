import { format } from "date-fns";
import fountain from "gatsby-remark-fountain/src/fountain";

import Seo from "@/components/Seo";
import Header from "@/components/Header";

import { getPostBySlug, getPostSlugs } from "@/lib/blog";

export const getStaticProps = async ({ params: { slug } }) => {
  const post = await getPostBySlug(slug);

  let html = post.html;
  let useFountain = post.fountain;
  if (useFountain) {
    html = fountain(post.content).html.script;
  }

  return {
    props: { post: { ...post, html } },
  };
};

export async function getStaticPaths() {
  return {
    paths: getPostSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default function Post({ post }) {
  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        jsonLd={[
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
        ]}
      >
        <link
          rel="canonical"
          href={post.url}
          key="canonical"
        />
      </Seo>
      <main>
        <Header />
        <article className="blog-post">
          <h2>{post.title}</h2>
          <p className="blog-post-date">
            {post.category ? (
              <span>
                <span className="blog-post-category">{post.category}</span>{" "}
              </span>
            ) : null}
            <strong>{format(new Date(post.date), "MMMM d, yyyy")}</strong>
          </p>
          <section
            className={post.fountain ? "fountain-body" : ""}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </main>
    </>
  );
}
