// app/admin/page.tsx

import PostList from "@/components/PostList";
import SidebarNav from "@/components/Sidebar";

export const dynamic = "force-dynamic"; // Force dynamic rendering

export default function AdminHome() {
  return (
    <main className="flex min-h-screen bg-brand-neutral text-brand-primary">
      <SidebarNav />
      <section className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>
        <PostList />
      </section>
    </main>
  );
}
