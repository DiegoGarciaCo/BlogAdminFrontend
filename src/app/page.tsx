// app/admin/page.tsx

import PostList from "@/components/PostList";
import SidebarNav from "@/components/Sidebar";
import { ListAllPostsRow } from "@/lib/definitions";
import { fetchPosts } from "@/lib/data";

export const dynamic = "force-dynamic"; // Force dynamic rendering

async function getPosts(): Promise<ListAllPostsRow[]> {
  return fetchPosts();
}

export default async function AdminHome() {
    const posts = await getPosts();
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
