import { client } from "@/sanity/client";
import { socialLinksQuery } from "@/sanity/queries";
import type { SocialLink } from "@/sanity/types";

export const revalidate = 60;

const platformColors: Record<string, string> = {
  YouTube: "#ff0000",
  TikTok: "#69c9d0",
  GitHub: "#ffffff",
  Twitch: "#9146ff",
  Instagram: "#e1306c",
  Twitter: "#1da1f2",
  LinkedIn: "#0077b5",
  Discord: "#5865f2",
};

const platformEmojis: Record<string, string> = {
  YouTube: "▶",
  TikTok: "♪",
  GitHub: "◆",
  Twitch: "◉",
  Instagram: "◎",
  Twitter: "✕",
  LinkedIn: "in",
  Discord: "◈",
};

export default async function LinksPage() {
  const socialLinks = await client.fetch<SocialLink[]>(socialLinksQuery).catch(() => []);

  const fallback: Partial<SocialLink>[] = [
    { platform: "YouTube", url: "https://youtube.com/@jumpalottahigh", username: "@jumpalottahigh" },
    { platform: "TikTok", url: "https://tiktok.com/@jumpalottahigh", username: "@jumpalottahigh" },
    { platform: "GitHub", url: "https://github.com/jumpalottahigh", username: "jumpalottahigh" },
    { platform: "Twitch", url: "https://twitch.tv/jumpalottahigh", username: "jumpalottahigh" },
    { platform: "Instagram", url: "https://instagram.com/jumpalottahigh", username: "@jumpalottahigh" },
  ];

  const links = socialLinks.length > 0 ? socialLinks : fallback;

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-24">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--surface)] text-3xl mb-6">
          🔗
        </div>
        <h1 className="text-4xl font-black text-white">jumpalottahigh</h1>
        <p className="mt-2 text-[var(--muted)]">Find me everywhere</p>
      </div>

      <div className="flex flex-col gap-4">
        {links.map((link) => {
          const accent = platformColors[link.platform!] || "#888888";
          const emoji = link.icon || platformEmojis[link.platform!] || "→";
          return (
            <a
              key={link._id || link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-white/15 hover:-translate-y-0.5 transition-all duration-300"
              style={{ boxShadow: undefined }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                style={{ background: `${accent}20`, color: accent }}
              >
                {emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">{link.platform}</p>
                {link.username && (
                  <p className="text-sm text-[var(--muted)] truncate">{link.username}</p>
                )}
              </div>
              <span className="text-[var(--muted)] group-hover:text-white group-hover:translate-x-0.5 transition-all">→</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Links",
  description: "Find jumpalottahigh on all platforms",
};
