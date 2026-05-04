import { defineType, defineField } from "sanity";

export const aboutSchema = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "tagline", type: "string", description: "Short tagline shown in hero" }),
    defineField({ name: "bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "profilePhoto", type: "image", options: { hotspot: true } }),
    defineField({ name: "skills", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "contactEmail", type: "string" }),
  ],
  preview: {
    select: { title: "name", media: "profilePhoto" },
  },
});
