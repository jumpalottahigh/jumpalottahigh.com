export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
}

export interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  accentColor?: string
  icon?: string
  coverImage?: SanityImage
  order?: number
  postCount?: number
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  category: Category
  publishedAt: string
  mainImage?: SanityImage
  body?: unknown[]
  videoEmbed?: string
  tags?: string[]
  excerpt?: string
}

export interface SocialLink {
  _id: string
  platform: string
  url: string
  username?: string
  icon?: string
  order?: number
}

export interface About {
  _id: string
  name?: string
  tagline?: string
  bio?: unknown[]
  profilePhoto?: SanityImage
  skills?: string[]
  contactEmail?: string
}
