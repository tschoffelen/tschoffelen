import { db } from "@vercel/postgres";
import { S3 } from "@aws-sdk/client-s3";

const client = await db.connect();
const { rows } = await client.sql`SELECT * FROM posts`;

const s3 = new S3({ region: "eu-west-1" });

const content = JSON.stringify(rows, null, 2);
await s3.putObject({
  Bucket: "thomas-data-stash",
  Key: `backups/blog-posts/${new Date().toISOString().substring(0, 7)}.json`,
  Body: content
});

client.release();
