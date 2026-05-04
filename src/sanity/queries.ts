import { groq } from "next-sanity";

export const categoriesQuery = groq`
  *[_type == "category"] | order(order asc, title asc) {
    _id, title, slug, description, accentColor, icon, coverImage, order,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...$limit] {
    _id, title, slug, publishedAt, excerpt, mainImage, tags,
    "category": category->{ _id, title, slug, accentColor, icon }
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && category->slug.current == $category] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, mainImage, tags,
    "category": category->{ _id, title, slug, accentColor, icon }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, excerpt, mainImage, body, videoEmbed, tags,
    "category": category->{ _id, title, slug, accentColor, icon }
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id, title, slug, description, accentColor, icon, coverImage
  }
`;

export const socialLinksQuery = groq`
  *[_type == "socialLink"] | order(order asc, platform asc) {
    _id, platform, url, username, icon, order
  }
`;

export const aboutQuery = groq`
  *[_type == "about"][0] {
    _id, name, tagline, bio, profilePhoto, skills, contactEmail
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post"]{ "slug": slug.current }
`;

export const allCategorySlugsQuery = groq`
  *[_type == "category"]{ "slug": slug.current }
`;
