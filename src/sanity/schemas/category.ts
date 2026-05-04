import { defineType, defineField } from "sanity";

export const categorySchema = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "accentColor", title: "Accent Color (hex)", type: "string", description: "e.g. #3b82f6" }),
    defineField({ name: "icon", type: "string", description: "Emoji or icon name, e.g. 💻" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number", description: "Display order on homepage" }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
