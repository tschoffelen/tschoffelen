import Link from "next/link";

import { getPosts } from "@/lib/blog";
import PostLink from "@/components/blog/PostLink";

export default async function TagPage({ params: { tag } }) {
  const posts = await getPosts();
  const tagName =
    posts.find(({ categorySlug }) => categorySlug === tag)?.category || tag;

  return (
    <>
      <div className="prose mb-6">
        <div className="mb-2 text-gray-500 text-sm">Post category</div>
        <h1>{tagName}</h1>
      </div>
      <div className="flex flex-wrap mb-8 md:mb-12">
        <Link
          href="/posts"
          className="inline-flex items-center px-4 py-2 mr-3 mb-3 text-sm font-medium leading-4 text-gray-800 border border-gray-400 rounded-full"
        >
          All posts
        </Link>
      </div>

      {posts
        .filter(({ unlisted }) => !unlisted)
        .filter(({ categorySlug }) => categorySlug === tag)
        .map((post) => (
          <PostLink key={post.url} {...post} showDate />
        ))}
    </>
  );
}

export const metadata = {
  title: "Posts",
};
