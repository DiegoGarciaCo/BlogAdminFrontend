import React from "react";
import { PostThumbnail } from "./PostThumbnail"; // Adjusted import
import PostActions from "./PostActions";
import { ListAllPostsRow } from "@/lib/definitions";

export function PostRows({ posts }: { posts: ListAllPostsRow[] }) {
  return (
    <>
      {posts.map((post, index) => (
        <tr
          key={post.ID ?? `post-${index}`}
          className={`border-b border-brand-text ${
            index % 2 === 0
              ? "bg-brand-secondary/30 text-brand-primary"
              : "bg-brand-secondary text-brand-primary"
          }`}
        >
          <td className="p-3">
            <PostThumbnail post={post} />
          </td>
          <td className="p-3">
            {typeof post.Title === "string" ? post.Title : "Untitled"}
          </td>
          <td className="p-3">
            <span className="px-2 py-1 rounded">
              {post.Status.Valid ? post.Status.String : "Error"}
            </span>
          </td>
          <td className="p-3 hidden md:table-cell">
            {post.Author.Valid ? post.Author.String : "Unknown"}
          </td>
          <td className="p-3 hidden md:table-cell">
            {post.PublishedAt.Valid
              ? new Date(post.PublishedAt.Time).toLocaleDateString("en-US")
              : "Not Published"}
          </td>
          <td className="p-3">
            <PostActions post={post} />
          </td>
        </tr>
      ))}
    </>
  );
}
