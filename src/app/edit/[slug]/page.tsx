import EditPostForm from "@/components/EditPostForm";
import SidebarNav from "@/components/Sidebar";
import { fetchPostBySlug } from "@/lib/data";
import Link from "next/link";

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params; // Await the Promise
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-brand-primary mb-4">
          Edit Post
        </h1>
        <p className="text-red-500">Failed to load post: {slug}</p>
        <Link href="/" className="text-brand-accent hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen bg-brand-neutral text-brand-primary">
      <SidebarNav />
      <section className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-6">Edit Post: {post.Title}</h1>
          <Link href="/" className="text-brand-accent hover:underline">
            Back to Dashboard
          </Link>
        </div>
        <EditPostForm post={post} />
      </section>
    </main>
  );
}
