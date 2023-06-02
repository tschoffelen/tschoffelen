import { getPosts } from "@/lib/blog";
import PostLink from "@/components/blog/PostLink";

export default async function Posts() {
  const posts = await getPosts();

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => (
        <PostLink key={post.url} {...post} />
      ))}
    </>
  );
}

export const metadata = {
  title: "Posts"
};
