import CreatePostForm from "@/components/CreatePostForm";
import SidebarNav from "@/components/Sidebar";

export default function CreatePage() {
  return (
    <main className="flex min-h-screen bg-brand-neutral text-brand-primary">
      <SidebarNav />
      <section className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
        <CreatePostForm />
      </section>
    </main>
  );
}
