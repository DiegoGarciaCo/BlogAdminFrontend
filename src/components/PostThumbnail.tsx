"use client";

import { ListAllPostsRow } from "@/lib/definitions";
import React, { useState } from "react";
import { toast } from "sonner";

const domain = "https://api.soldbyghost.com"; 

export function PostThumbnail({ post }: { post: ListAllPostsRow }) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${domain}/api/posts/thumbnail/${post.ID}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        window.location.reload(); // Refresh to show updated thumbnail
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Upload error: " + error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-16 h-16 flex items-center justify-center relative">
      {post.Thumbnail.Valid ? (
        <img
          src={post.Thumbnail.String}
          alt={`${post.Title ?? "Untitled"} thumbnail`}
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <label className="flex items-center justify-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
          <span
            className={`text-sm text-brand-text bg-brand-primary px-2 py-1 rounded hover:bg-brand-accent transition-colors ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </span>
        </label>
      )}
    </div>
  );
}
