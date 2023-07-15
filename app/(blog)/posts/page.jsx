import { getPosts } from "@/lib/blog";
import PostLink from "@/components/blog/PostLink";

export default async function Posts() {
  const posts = await getPosts();

  return (
    <>
      <div className="prose mb-10">
        <h1>Posts</h1>
      </div>
      {posts
        .filter(({ unlisted }) => !unlisted)
        .map((post) => (
          <PostLink key={post.url} {...post} />
        ))}
    </>
  );
}

export const metadata = {
  title: "Posts",
};
