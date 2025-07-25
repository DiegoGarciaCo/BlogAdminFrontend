import { GetPostBySlugRow } from "./definitions";

const domain = "https://api.soldbyghost.com";


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
