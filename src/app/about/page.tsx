import { client } from "@/sanity/client";
import { aboutQuery } from "@/sanity/queries";
import type { About } from "@/sanity/types";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

export default async function AboutPage() {
  const about = await client.fetch<About | null>(aboutQuery).catch(() => null);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left column */}
        <div className="lg:col-span-1">
          {about?.profilePhoto ? (
            <div className="relative w-40 h-40 lg:w-full lg:h-auto lg:aspect-square rounded-2xl overflow-hidden mb-6">
              <Image
                src={urlFor(about.profilePhoto).width(400).height(400).url()}
                alt={about.name || "Profile"}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-40 h-40 lg:w-full lg:h-auto lg:aspect-square rounded-2xl bg-[var(--surface)] flex items-center justify-center text-6xl mb-6">
              👤
            </div>
          )}

          {about?.skills && about.skills.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)] mb-3">Skills</p>
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--muted)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {about?.contactEmail && (
            <div className="mt-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)] mb-3">Contact</p>
              <a
                href={`mailto:${about.contactEmail}`}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                {about.contactEmail}
              </a>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/links"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)] hover:text-white hover:border-white/20 transition-all"
            >
              🔗 All links
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
            {about?.name || "jumpalottahigh"}
          </h1>
          {about?.tagline && (
            <p className="text-lg text-[var(--muted)] mb-8">{about.tagline}</p>
          )}

          {about?.bio ? (
            <div className="prose">
              <PortableText value={about.bio as Parameters<typeof PortableText>[0]["value"]} />
            </div>
          ) : (
            <div className="space-y-4 text-[var(--muted)]">
              <p>Software engineer building things by day, lifting heavy weights, flying FPV drones, and streaming games by night.</p>
              <p>This site is where I document it all — projects, travel adventures, drone builds, and whatever else catches my attention.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "About",
  description: "About jumpalottahigh",
};
