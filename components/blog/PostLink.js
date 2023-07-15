import React from "react";
import Link from "next/link";
import { format } from "date-fns";

const PostLink = ({
  url,
  relativeUrl,
  title,
  date,
  category,
  excerpt,
  showCategory = false,
}) => {
  return (
    <Link href={relativeUrl || url} className="block leading-relaxed prose mb-4 group transition-all">
      <span className="flex items-center gap-2">
      <span className="font-bold group-hover:underline transition-all">{title}</span>
      <span className="sr-only">{`, written on `}</span>
      <span className="text-[0.65rem] uppercase font-bold text-gray-800 px-1 opacity-40 bg-gray-300 rounded-sm">
        {showCategory ? category : format(new Date(date), "MMM d")}
      </span>
      {category && <span className="sr-only">{` in category ${category}.`}</span>}
      </span>
      <span className="sr-only"> - </span>
      <span className="block truncate">{excerpt}</span>
    </Link>
  );
};

export default PostLink;
