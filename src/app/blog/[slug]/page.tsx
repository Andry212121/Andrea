import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { blogPosts, getPostBySlug } from "@/lib/data/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} description={post.excerpt} />
      <article className="py-16 sm:py-20">
        <div className="container-page max-w-2xl">
          <div className="mb-8 flex items-center gap-3 text-sm text-navy-700/70">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-navy-800">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 border-t border-navy-900/8 pt-8">
            <Link href="/blog" className="text-sm font-semibold text-navy-900 hover:text-gold-600">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
