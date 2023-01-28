import { getPosts } from "@/lib/blog";
import Seo from "@/components/Seo";
import { format } from "date-fns";
import Header from "@/components/Header";
import PostLink from "@/components/blog/PostLink";

export const getStaticProps = async () => {
  const allPosts = await getPosts();
  const groupedPosts = allPosts.reduce((acc, post) => {
    const month = format(new Date(post.date), "MMM yyyy");
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push({
      url: post.url,
      relativeUrl: post.relativeUrl,
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      date: post.date,
    });
    return acc;
  }, {});

  return {
    props: { groupedPosts },
    revalidate: 3600,
  };
};

export default function Posts({ groupedPosts }) {
  return (
    <>
      <Seo title="Posts" />
      <main className="posts">
        <Header />

        <h2>Recent posts</h2>

        {Object.entries(groupedPosts).map(([key, value]) => (
          <div key={key} className="links">
            <h3>{key}</h3>
            {value.map((post) => (
              <PostLink key={post.url} {...post} />
            ))}
          </div>
        ))}
      </main>
    </>
  );
}
