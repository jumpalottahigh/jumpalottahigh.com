import { client } from "@/sanity/client";
import { postsByCategoryQuery, categoryBySlugQuery, allCategorySlugsQuery } from "@/sanity/queries";
import type { Post, Category } from "@/sanity/types";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allCategorySlugsQuery).catch(() => []);
  return slugs.map((s) => ({ category: s.slug }));
}

const staticCategories = ["software", "fitness", "fpv", "travel", "gaming", "blog"];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const [posts, categoryData] = await Promise.all([
    client.fetch<Post[]>(postsByCategoryQuery, { category }).catch(() => []),
    client.fetch<Category | null>(categoryBySlugQuery, { slug: category }).catch(() => null),
  ]);

  // Allow static categories even if not in Sanity yet
  if (!categoryData && !staticCategories.includes(category)) {
    notFound();
  }

  const accent = categoryData?.accentColor || "#888888";
  const title = categoryData?.title || category.charAt(0).toUpperCase() + category.slice(1);
  const icon = categoryData?.icon || "📂";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{icon}</span>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${accent}20`, color: accent }}
          >
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">{title}</h1>
        {categoryData?.description && (
          <p className="mt-3 text-lg text-[var(--muted)] max-w-xl">{categoryData.description}</p>
        )}
      </div>

      {/* Posts grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-[var(--border)] rounded-2xl">
          <span className="text-5xl">{icon}</span>
          <p className="mt-4 text-[var(--muted)]">No posts in this category yet.</p>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const data = await client.fetch<Category | null>(categoryBySlugQuery, { slug: category }).catch(() => null);
  return {
    title: data?.title || category,
    description: data?.description || `Posts in the ${category} category`,
  };
}
