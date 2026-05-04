import Link from "next/link";

const socialLinks = [
  { label: "YouTube", href: "https://youtube.com/@jumpalottahigh" },
  { label: "TikTok", href: "https://tiktok.com/@jumpalottahigh" },
  { label: "GitHub", href: "https://github.com/jumpalottahigh" },
  { label: "Twitch", href: "https://twitch.tv/jumpalottahigh" },
  { label: "Instagram", href: "https://instagram.com/jumpalottahigh" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-white">jumpalottahigh</p>
            <p className="text-sm text-[var(--muted)] mt-1">
              Software · Fitness · FPV · Travel · Gaming
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--muted)] hover:text-white transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} jumpalottahigh
        </p>
      </div>
    </footer>
  );
}
