"use client";

import React, { useState, Suspense } from "react";
import { PostRows } from "./PostRows";
import PostRowsSkeleton from "./PostRowsSkeleton";
import { ListAllPostsRow } from "@/lib/definitions";

export default function PostFilter({ posts }: { posts: ListAllPostsRow[] }) {
  // State for filters, sorting, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortBy, setSortBy] = useState<"Title" | "PublishedAt" | "CreatedAt">(
    "CreatedAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Adjustable

  // Extract unique tags from posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.Tags || []))
  ).sort();

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const title = post.Title ?? "";
    const matchesSearch = title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      !statusFilter || (post.Status.String ?? "draft") === statusFilter;
    const matchesTag = !tagFilter || (post.Tags || []).includes(tagFilter);
    return matchesSearch && matchesStatus && matchesTag;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    if (sortBy === "Title") {
      return order * ((a.Title || "") > (b.Title || "") ? 1 : -1);
    } else if (sortBy === "PublishedAt") {
      const aTime = a.PublishedAt.Valid
        ? new Date(a.PublishedAt.Time)
        : new Date(0);
      const bTime = b.PublishedAt.Valid
        ? new Date(b.PublishedAt.Time)
        : new Date(0);
      return order * (aTime > bTime ? 1 : -1);
    } else {
      // CreatedAt
      const aTime = a.CreatedAt.Valid
        ? new Date(a.CreatedAt.Time)
        : new Date(0);
      const bTime = b.CreatedAt.Valid
        ? new Date(b.CreatedAt.Time)
        : new Date(0);
      return order * (aTime > bTime ? 1 : -1);
    }
  });

  // Paginate posts
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Pagination handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-brand-text rounded focus:border-brand-accent focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-brand-text rounded"
        >
          <option value="">Filter by Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-brand-text rounded"
        >
          <option value="">Filter by Tag</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "Title" | "PublishedAt" | "CreatedAt")
          }
          className="w-full md:w-1/4 p-2 border border-brand-text rounded"
        >
          <option value="Title">Sort by Title</option>
          <option value="PublishedAt">Sort by Published At</option>
          <option value="CreatedAt">Sort by Created At</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="w-full md:w-1/4 p-2 border border-brand-text rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table className="w-full text-left">
        <thead className="bg-brand-secondary text-brand-primary">
          <tr>
            <th className="p-3">Thumbnail</th>
            <th className="p-3">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3 hidden md:table-cell">Author</th>
            <th className="p-3 hidden md:table-cell">Published</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <Suspense fallback={<PostRowsSkeleton />}>
            <PostRows posts={paginatedPosts} />
          </Suspense>
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-brand-secondary text-brand-primary hover:bg-brand-accent"
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-brand-secondary text-brand-primary hover:bg-brand-accent"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
