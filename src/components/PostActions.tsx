// components/PostActions.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ListAllPostsRow } from "@/lib/definitions";
import { toast } from "sonner";

export default function PostActions({ post }: { post: ListAllPostsRow }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/delete/${post.ID}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Refresh the page or update state (for now, reload)
        window.location.reload();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Delete error" + error);
    }
    setShowDeleteModal(false);
  };

  const handlePublish = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/publish/${post.ID}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        window.location.reload();
      } else {
        toast.error("Publish failed");
      }
    } catch (error) {
      toast.error("Publish error" + error);
    }
    setShowPublishModal(false);
  };

  return (
    <div className="flex gap-2">
      {/* Edit: Redirect to /admin/edit/[slug] */}
      <Link
        href={`/edit/${post.Slug}`}
        className="text-brand-primary hover:text-brand-accent"
      >
        Edit
      </Link>

      {/* Publish: Conditional Modal */}
      {post.Status.String !== "published" && (
        <>
          <button
            onClick={() => setShowPublishModal(true)}
            className="text-brand-primary hover:text-brand-secondary"
          >
            Publish
          </button>
          {showPublishModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-brand-neutral p-6 rounded-lg w-full max-w-sm">
                <h3 className="text-lg font-bold text-brand-primary mb-4">
                  Confirm Publish
                </h3>
                <p className="mb-4">
                  {post.PublishedAt
                    ? `Publish "${post.Title}" now?`
                    : `No publish date set for "${post.Title}". Publish now?`}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handlePublish}
                    className="bg-brand-secondary text-brand-primary py-2 px-4 rounded hover:bg-brand-accent"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => setShowPublishModal(false)}
                    className="bg-brand-text text-brand-primary py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete: Modal Confirmation */}
      <button
        onClick={() => setShowDeleteModal(true)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-brand-neutral p-6 rounded-lg w-full max-w-sm">
            <h3 className="text-lg font-bold text-brand-primary mb-4">
              Confirm Delete
            </h3>
            <p className="mb-4">
              Are you sure you want to delete "{post.Title}"?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-brand-text text-brand-primary py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
