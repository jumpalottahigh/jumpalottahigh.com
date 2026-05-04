import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt || ""}
            width={900}
            height={506}
            className="w-full object-cover"
          />
        </div>
        {value.alt && (
          <figcaption className="mt-2 text-center text-sm text-[var(--muted)]">{value.alt}</figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-black text-white mt-10 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-8 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold text-white mt-6 mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h4>,
    normal: ({ children }) => <p className="text-[var(--foreground)] leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--muted)] pl-4 my-6 text-[var(--muted)] italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="font-mono text-sm bg-[var(--surface)] px-1.5 py-0.5 rounded text-orange-400">
        {children}
      </code>
    ),
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-4 text-[var(--foreground)]">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-4 text-[var(--foreground)]">{children}</ol>,
  },
};

interface PostBodyProps {
  body: unknown[];
}

export default function PostBody({ body }: PostBodyProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <PortableText value={body as Parameters<typeof PortableText>[0]["value"]} components={components} />
    </div>
  );
}
