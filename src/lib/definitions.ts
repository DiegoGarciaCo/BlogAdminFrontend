export interface ListAllPostsRow {
  ID: string; // UUID as a string
  Title: string; // Non-nullable string
  Slug: string; // Non-nullable string
  Excerpt: nullable; // Nullable string
  Author: nullable; // Nullable string
  PublishedAt: nullableDate; // Nullable date (or string | null if ISO string)
  Thumbnail: nullable;
  Status: nullable; // Nullable string
  CreatedAt: nullableDate; // Nullable date (or string | null if ISO string)
  Tags: string[]; // Array of strings, non-nullable but can be empty
}

interface nullable {
  String: string;
  Valid: boolean;
}

interface nullableDate {
  Time: string;
  Valid: boolean;
}

export interface GetPostBySlugRow {
  ID: string; // uuid.UUID -> string
  Title: string;
  Slug: string;
  Content: string;
  Excerpt?: nullable; // sql.NullString -> optional string or null
  Status?: nullable;
  Author?: nullable; // sql.NullString -> optional string or null
  PublishedAt?: nullable; // sql.NullTime -> optional Date or null
  Thumbnail?: nullable;
  CreatedAt?: nullableDate; // sql.NullTime -> optional Date or null
  UpdatedAt?: nullableDate; // sql.NullTime -> optional Date or null
  Tags: string[]; // []string -> string[]
}

export interface CreatePostResData {
  ID: string;
  Title: string;
  Slug: string;
  Content?: nullable;
  Excerpt?: nullable;
  Status: string;
  CreatedAt: nullableDate;
  UpdatedAt: nullableDate;
  Tags: string[];
}
