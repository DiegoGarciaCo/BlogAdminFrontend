// components/PostRowsSkeleton.tsx
import React from "react";

export default function PostRowsSkeleton() {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <tr
            key={index}
            className={`border-b border-brand-text ${
              index % 2 === 0 ? "bg-brand-primary" : "bg-brand-neutral"
            }`}
          >
            <td className="p-3">
              <div className="w-16 h-16 bg-brand-text/20 rounded animate-pulse" />
            </td>
            <td className="p-3">
              <div className="h-4 bg-brand-text/20 rounded w-3/4 animate-pulse" />
            </td>
            <td className="p-3">
              <div className="h-4 bg-brand-text/20 rounded w-1/4 animate-pulse" />
            </td>
            <td className="p-3 hidden md:table-cell">
              <div className="h-4 bg-brand-text/20 rounded w-1/2 animate-pulse" />
            </td>
            <td className="p-3 hidden md:table-cell">
              <div className="h-4 bg-brand-text/20 rounded w-1/3 animate-pulse" />
            </td>
            <td className="p-3">
              <div className="h-4 bg-brand-text/20 rounded w-1/2 animate-pulse" />
            </td>
          </tr>
        ))}
    </>
  );
}
