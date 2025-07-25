import PostFilter from "./PostFilter";
import { ListAllPostsRow } from "@/lib/definitions";


export default async function PostList( { posts }: { posts: ListAllPostsRow[] }) {
  return (
    <div className="mt-6">
      <PostFilter posts={posts} />
    </div>
  );
}
