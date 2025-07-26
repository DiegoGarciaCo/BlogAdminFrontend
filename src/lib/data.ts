import { GetPostBySlugRow } from "./definitions";
import { ListAllPostsRow } from "./definitions";

const domain = "https://api.soldbyghost.com";

export async function fetchPosts(cookieHeader: string): Promise<ListAllPostsRow[]> {
  try {
    const response = await fetch(`${domain}/api/posts`, {
                                method: "GET",
                                headers: {
                                  "Content-Type": "application/json",
                                  "Accept": "application/json",
                                  Cookie: cookieHeader,
                                },
                                cache: "no-store",

    });
    console.log(response.status, response.statusText);
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

export async function fetchPostBySlug(slug: string): Promise<GetPostBySlugRow> {
  try {
    const response = await fetch(`${domain}/api/posts/${slug}`);
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
