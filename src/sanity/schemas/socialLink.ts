import { defineType, defineField } from "sanity";

export const socialLinkSchema = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "document",
  fields: [
    defineField({ name: "platform", type: "string", validation: (r) => r.required() }),
    defineField({ name: "url", type: "url", validation: (r) => r.required() }),
    defineField({ name: "username", type: "string" }),
    defineField({ name: "icon", type: "string", description: "Emoji or icon key" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: {
    select: { title: "platform", subtitle: "username" },
  },
});
