import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/sanity/types";
import { urlFor } from "@/sanity/image";
import { cn } from "@/lib/utils";

const fallbackCategories = [
  { slug: "software", title: "Software & Dev", icon: "💻", accentColor: "#3b82f6", description: "Code, projects, and dev content" },
  { slug: "fitness", title: "Weightlifting & CrossFit", icon: "🏋️", accentColor: "#22c55e", description: "Lifts, PRs, and training" },
  { slug: "fpv", title: "FPV Drones", icon: "🚁", accentColor: "#f97316", description: "Builds, flights, and reviews" },
  { slug: "travel", title: "Travel", icon: "✈️", accentColor: "#eab308", description: "Destinations and adventures" },
  { slug: "gaming", title: "Gaming & Streaming", icon: "🎮", accentColor: "#a855f7", description: "Games, clips, and streams" },
  { slug: "blog", title: "Blog", icon: "📝", accentColor: "#f43f5e", description: "Thoughts and lifestyle" },
];

interface CategoryGridProps {
  categories?: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const items = categories && categories.length > 0 ? categories : fallbackCategories;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--muted)] mb-8">
        Explore
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((cat) => {
          const slug = "slug" in cat && cat.slug ? (typeof cat.slug === "string" ? cat.slug : cat.slug.current) : (cat as { slug: string }).slug;
          const accent = cat.accentColor || "#888888";
          return (
            <Link
              key={slug}
              href={`/${slug}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6",
                "hover:border-white/15 hover:bg-[var(--surface-hover)] transition-all duration-300",
                "hover:-translate-y-0.5 hover:shadow-xl"
              )}
              style={{ boxShadow: undefined }}
            >
              {/* Accent glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse 80% 80% at 50% 120%, ${accent}20 0%, transparent 70%)` }}
              />

              {/* Cover image if present */}
              {"coverImage" in cat && (cat as Category).coverImage && (
                <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity">
                  <Image
                    src={urlFor((cat as Category).coverImage!).width(400).height(300).url()}
                    alt={cat.title}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              )}

              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{cat.icon}</span>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ background: `${accent}20`, color: accent }}
                  >
                    {"postCount" in cat ? `${(cat as Category).postCount ?? 0} posts` : "→"}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-white group-hover:text-white transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{cat.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
