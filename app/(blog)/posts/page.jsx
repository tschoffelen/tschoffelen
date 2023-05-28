import { getPosts } from "@/lib/blog";
import { format } from "date-fns";
import PostLink from "@/components/blog/PostLink";

export default async function Posts() {
  const posts = await getPosts();

  const groupedPosts = posts.reduce((acc, post) => {
    if (post.unlisted) return acc;
    const month = format(new Date(post.date), "MMM yyyy");
    if (!acc[month]) acc[month] = [];
    acc[month].push(post);
    return acc;
  }, {});

  return (
    <>
      <h1>Recent posts</h1>
      <div className="posts">
        {Object.entries(groupedPosts).map(([key, value]) => (
          <div key={key} className="links">
            <h3>{key}</h3>
            {value.map((post) => (
              <PostLink key={post.url} {...post} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export const metadata = {
  title: "Posts",
};
