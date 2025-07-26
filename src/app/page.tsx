// app/page.tsx

import PostList from "@/components/PostList";
import SidebarNav from "@/components/Sidebar";
import { fetchPosts } from "@/lib/data";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // Force dynamic rendering


export default async function AdminHome() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");

    const posts = await fetchPosts(cookieHeader);
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
