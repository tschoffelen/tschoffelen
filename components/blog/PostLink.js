import React from "react";
import Link from "next/link";
import { format } from "date-fns";

const PostLink = ({
  url,
  relativeUrl,
  title,
  date,
  excerpt,
  showDate = false
}) => {
  return (
    <Link
      href={relativeUrl || url}
      className="block mb-8 prose group"
    >
      <span className="block flex-1">
        <span className="border-b border-gray-800 text-gray-800 pb-0.5 group-hover:border-black group-hover:text-black transition">
          {title}
        </span>
        <span className="block truncate mt-1 group-hover:text-black transition">
          {showDate && format(new Date(date), "MMMM d, yyyy – ")}
          {excerpt}
        </span>
      </span>
    </Link>
  );
};

export default PostLink;
