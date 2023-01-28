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
    <Link href={relativeUrl || url}>
      {title}
      <span className="sr">{`, written on `}</span>
      <span className="link-date">
        {showCategory ? category : format(new Date(date), "MMM d")}
      </span>
      {category && <span className="sr">{` in category ${category}.`}</span>}
      <span className="sr dash"> - </span>
      <span className="link-description shortened">{excerpt}</span>
    </Link>
  );
};

export default PostLink;
