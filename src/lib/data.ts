import { GetPostBySlugRow, ListAllPostsRow } from "./definitions";

export async function fetchPosts(): Promise<ListAllPostsRow[]> {
  try {
    const response = await fetch("http://localhost:8080/api/posts");
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (!data) {
      return [];
    }
    return data.map((post: any) => ({
      ...post,
      publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
      createdAt: post.createdAt ? new Date(post.createdAt) : null,
    }));
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

export async function fetchPostBySlug(slug: string): Promise<GetPostBySlugRow> {
  try {
    const response = await fetch(`http://localhost:8080/api/posts/${slug}`);
    const data = await response.json();
    return {
      ...data,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      createdAt: data.createdAt ? new Date(data.createdAt) : null,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
    };
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}
