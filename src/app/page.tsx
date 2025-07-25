// app/admin/page.tsx

import PostList from "@/components/PostList";
import SidebarNav from "@/components/Sidebar";
import { ListAllPostsRow } from "@/lib/definitions";

export const dynamic = "force-dynamic"; // Force dynamic rendering

const domain = "https://api.soldbyghost.com";

async function fetchPosts(): Promise<ListAllPostsRow[]> {
  try {
    const response = await fetch(`${domain}/api/posts`);
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (!data) {
      return [];
    }
    console.log("Data fetched:", data);
    return data.map((post: ListAllPostsRow) => ({
      ...post,
      PublishedAt: post.PublishedAt.Valid ? new Date(post.PublishedAt.Time) : null,
      CreatedAt: post.CreatedAt.Valid ? new Date(post.CreatedAt.Time) : null,
    }));
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

export default async function AdminHome() {
    const posts = await fetchPosts();
    console.log("Posts fetched:", posts);
  return (
    <main className="flex min-h-screen bg-brand-neutral text-brand-primary">
      <SidebarNav />
      <section className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>
        <PostList posts={posts}/>
      </section>
    </main>
  );
}
