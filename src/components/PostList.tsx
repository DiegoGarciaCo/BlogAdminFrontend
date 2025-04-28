import PostFilter from "./PostFilter";
import { ListAllPostsRow } from "@/lib/definitions";
import { fetchPosts } from "@/lib/data";

async function getPosts(): Promise<ListAllPostsRow[]> {
  return fetchPosts();
}

export default async function PostList() {
  const posts = await getPosts();
  return (
    <div className="mt-6">
      <PostFilter posts={posts} />
    </div>
  );
}
