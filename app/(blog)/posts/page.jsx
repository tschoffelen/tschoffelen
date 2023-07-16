import Link from "next/link";

import { getPosts } from "@/lib/blog";
import PostLink from "@/components/blog/PostLink";

export default async function Posts() {
  const posts = await getPosts();

  const tags = Object.entries(
    posts.reduce((acc, post) => {
      if (acc[post.categorySlug]) {
        acc[post.categorySlug][1] += 1;
        return acc;
      }
      acc[post.categorySlug] = [post.category, 1];
      return acc;
    }, {})
  )
    .map(([k, v]) => ({
      slug: k,
      title: v[0],
      count: v[1],
    }))
    .sort((a, b) => b.count - a.count)
    .filter(({ count }) => count >= 3);

  return (
    <>
      <div className="prose mb-6">
        <h1>Posts</h1>
      </div>
      <div className="flex flex-wrap mb-8 md:mb-12">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/posts/${tag.slug}`}
            className="inline-flex items-center px-4 py-2 mr-3 mb-3 text-sm font-medium leading-4 text-gray-800 border border-gray-400 rounded-full"
          >
            {tag.title}
          </Link>
        ))}
      </div>
      {posts
        .filter(({ unlisted }) => !unlisted)
        .map((post) => (
          <PostLink key={post.url} {...post} showDate />
        ))}
    </>
  );
}

export const metadata = {
  title: "Posts",
};
