"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Menu,
  Redo2,
  Undo2,
} from "lucide-react";
import { GetPostBySlugRow } from "@/lib/definitions";
import { toast } from "sonner";

const domain = "https://api.soldbyghost.com";

// Zod Schemas
const draftEditPostSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  author: z.string().optional(),
  tags: z.string().optional(),
});

const publishEditPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  author: z.string().min(1, "Author is required"),
  tags: z.string(),
});

type EditPostFormData = z.infer<typeof draftEditPostSchema>;

// Rich Text Toolbar
const RichTextToolbar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-2 p-2 border-b border-brand-accent rounded-md shadow-sm">
      <div className="flex items-center gap-1 p-1 rounded-md shadow-inner">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive("bold")
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive("italic")
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive("underline")
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Underline"
        >
          <u>U</u>
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 rounded-md shadow-inner">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive("heading", { level: 1 })
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Heading 2"
        >
          H2
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 rounded-md shadow-inner">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive({ textAlign: "left" })
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive({ textAlign: "center" })
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive({ textAlign: "right" })
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 rounded-md shadow-inner">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive("bulletList")
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Bullet List"
        >
          • <Menu className="w-4 text-gray-950 inline-block ml-1" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-brand-accent shadow-inner transition-colors ${
            editor.isActive("orderedList")
              ? "bg-brand-accent text-primary"
              : "text-brand-primary"
          }`}
          title="Ordered List"
        >
          1. <Menu className="w-4 text-gray-950 inline-block ml-1" />
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 rounded-md shadow-inner">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-brand-accent shadow-inner transition-colors text-brand-primary"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-brand-accent shadow-inner transition-colors text-brand-primary"
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function EditPostForm({ post }: { post: GetPostBySlugRow }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EditPostFormData>({
    resolver: zodResolver(draftEditPostSchema),
    defaultValues: {
      title: post.Title,
      slug: post.Slug,
      content: post.Content,
      excerpt: post.Excerpt?.String ?? "",
      author: post.Author?.String ?? "",
      tags: post.Tags.join(","), // Join array into comma-separated string if tags exist
    },
  });

  // TiPtap Editors with pre-filled content
  const contentEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    immediatelyRender: false,
    content: post.Content,
    onUpdate: ({ editor }) => setValue("content", editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border border-brand-accent rounded-md px-3 py-2 tiptap",
      },
    },
  });

  const excerptEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    immediatelyRender: false,
    content: post.Excerpt?.String ?? "",
    onUpdate: ({ editor }) => setValue("excerpt", editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border border-brand-accent rounded-md px-3 py-2 tiptap",
      },
    },
  });

  // Handle thumbnail upload separately
  const handleThumbnailUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const method = post.Thumbnail?.Valid ? "PUT" : "POST";
    try {
      const response = await fetch(
        `${domain}/api/posts/thumbnail/${post.ID}`,
        {
          method,
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("Failed to upload thumbnail");
      }
      toast.success("Thumbnail uploaded successfully");
    } catch (error) {
      toast.error(`Failed to upload thumbnail: ${error}`);
    }
  };

  // Form submission (no thumbnail included)
  const onSubmit = async (data: EditPostFormData, endpoint: string) => {
    try {
      // Validate based on endpoint
      if (endpoint === `/api/posts/publish/${post.ID}`) {
        publishEditPostSchema.parse(data); // Require all fields
        if (!post.Thumbnail?.Valid) {
          toast.error("Please upload a thumbnail");
          return;
        }
      } else {
        draftEditPostSchema.parse(data); // All optional for draft
      }

      const tags = data.tags?.split(",").map((tag) => tag.trim()) || [];
      const payload = {
        id: post.ID,
        title: data.title || "",
        slug: data.slug || "",
        content: data.content || "",
        excerpt: data.excerpt || "",
        status:
          endpoint === `/api/posts/publish/${post.ID}` ? "published" : "draft",
        author: data.author || "",
        tags: tags,
      };

      const postResponse = await fetch(`${domain}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!postResponse.ok) {
        toast.error("Failed to update post");
        return;
      }

      toast.success(
        endpoint.includes("publish")
          ? "Post updated and published"
          : "Draft saved"
      );
      window.location.href = "/";
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors.map((e) => e.message).join("\n"));
      } else {
        toast.error(error instanceof Error ? error.message : "Unknown error");
      }
    }
  };


  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          {...register("title")}
          className="w-full p-2 border border-brand-accent rounded focus:border-brand-accent"
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input
          {...register("slug")}
          className="w-full p-2 border border-brand-accent rounded focus:border-brand-accent"
          disabled={isSubmitting}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <RichTextToolbar editor={contentEditor} />
        <EditorContent editor={contentEditor} />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium mb-1">Excerpt</label>
        <RichTextToolbar editor={excerptEditor} />
        <EditorContent editor={excerptEditor} />
        {errors.excerpt && (
          <p className="text-red-500 text-sm">{errors.excerpt.message}</p>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium mb-1">Author</label>
        <input
          {...register("author")}
          className="w-full p-2 border border-brand-accent rounded focus:border-brand-accent"
          disabled={isSubmitting}
        />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author.message}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Tags (comma-separated)
        </label>
        <input
          {...register("tags")}
          className="w-full p-2 border border-brand-accent rounded focus:border-brand-accent"
          disabled={isSubmitting}
        />
        {errors.tags && (
          <p className="text-red-500 text-sm">{errors.tags.message}</p>
        )}
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium mb-1">Thumbnail</label>
        {post.Thumbnail?.Valid && (
          <div className="mb-2">
            <img
              src={post.Thumbnail.String}
              alt="Current thumbnail"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleThumbnailUpload(file);
            }
          }}
          disabled={isSubmitting}
          className="text-sm text-brand-primary file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-brand-secondary file:text-brand-primary hover:file:bg-brand-accent"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleSubmit((data) => onSubmit(data, `/api/posts`))}
          disabled={isSubmitting}
          className="bg-brand-text text-brand-primary py-2 px-4 rounded hover:bg-brand-accent disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save as Draft"}
        </button>
        <button
          type="button"
          onClick={handleSubmit((data) =>
            onSubmit(data, `/api/posts/publish/${post.ID}`)
          )}
          disabled={isSubmitting}
          className="bg-brand-secondary text-brand-primary py-2 px-4 rounded hover:bg-brand-accent disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update & Publish"}
        </button>
      </div>
    </form>
  );
}
