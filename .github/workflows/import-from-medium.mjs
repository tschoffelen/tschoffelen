import { db } from "@vercel/postgres";
import { extract } from "@extractus/feed-extractor";
import excerptHtml from "excerpt-html";

export const getExcerpt = ({ description, excerpt }) => {
  if (excerpt) {
    if (excerpt.includes(". ")) {
      excerpt = `${excerpt.split(". ")[0]}.`;
    }
    return excerpt;
  }
  return excerptHtml(description || "").replace(
    /Continue reading on ([^»]+) »/,
    ""
  );
};

const client = await db.connect();

const result = await extract("https://medium.com/feed/@tschoffelen");

for (const item of result.entries) {
  const post = {
    id: item.id,
    title: item.title.replace("&amp;", "&"),
    excerpt: getExcerpt({ description: item.description }),
    attributes: {
      date: new Date(item.published).toISOString(),
      url: `${item.link.split("?")[0]}?utm_source=schof`
    }
  };

  try {
    await client.sql`
    INSERT INTO posts
      (id, title, excerpt, attributes)
    VALUES
      (${post.id}, ${post.title}, ${post.excerpt}, ${post.attributes})
  `;
    console.log("Inserted post", post.id);
  } catch (e) {
  }
}

client.release();
