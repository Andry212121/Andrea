import type { MetadataRoute } from "next";
import { tutors } from "@/lib/data/tutors";
import { subjects } from "@/lib/data/subjects";
import { locations } from "@/lib/data/locations";
import { blogPosts } from "@/lib/data/blog";

const siteUrl = "https://www.gradehub.co.uk";

const staticRoutes = [
  "",
  "/about",
  "/how-it-works",
  "/find-a-tutor",
  "/become-a-tutor",
  "/pricing",
  "/blog",
  "/grammar-school-guide",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/safeguarding",
  "/cookie-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
    })),
    ...tutors.map((tutor) => ({
      url: `${siteUrl}/tutors/${tutor.slug}`,
      lastModified: now,
    })),
    ...subjects.map((subject) => ({
      url: `${siteUrl}/subjects/${subject.slug}`,
      lastModified: now,
    })),
    ...locations.map((location) => ({
      url: `${siteUrl}/locations/${location.slug}`,
      lastModified: now,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: now,
    })),
  ];
}
