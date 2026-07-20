import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { blogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guidance on the 11+, grammar school preparation and tutoring, from the GradeHub editorial team.",
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Guidance for the 11+ journey"
        description="Practical, no-nonsense advice for Buckinghamshire parents navigating grammar school preparation."
      />
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-[var(--radius-card)] border border-navy-900/8 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{post.category}</p>
              <h2 className="mt-2 font-serif-display text-lg font-medium text-navy-900 group-hover:text-navy-700">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-700/80">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-navy-700/60">
                <span>{post.readTime}</span>
                <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
