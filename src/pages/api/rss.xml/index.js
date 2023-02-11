import { getFeed } from "@/lib/blog";

export default async function handler(req, res) {
  const output = await getFeed();

  return res.status(200).end(output.rss2());
}
