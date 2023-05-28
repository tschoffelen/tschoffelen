import { ColumnType, sql } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";

interface PostsTable {
  id: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  html: string;
  attributes: object;
  editToken: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export interface Database {
  posts: PostsTable;
}

export const db = createKysely<Database>();
export { sql };

export async function seed() {
  await db.schema
    .createTable("posts")
    .ifNotExists()
    .addColumn("id", "varchar(255)", (cb) => cb.primaryKey())
    .addColumn("title", "varchar(255)", (cb) => cb.notNull())
    .addColumn("category", "varchar(255)", (cb) => cb.defaultTo('Blog'))
    .addColumn("excerpt", "text")
    .addColumn("content", "text")
    .addColumn("html", "text")
    .addColumn("attributes", "json")
    .addColumn("editToken", "varchar(255)")
    .addColumn("createdAt", sql`timestamp with time zone`, (cb) =>
      cb.defaultTo(sql`current_timestamp`)
    )
    .execute();
  console.log(`Created "posts" table`);
}
