import { getFeed } from "@/lib/blog";

export default async function handler(req, res) {
  const output = await getFeed();

  return res.status(200).send(output.rss2());
}
