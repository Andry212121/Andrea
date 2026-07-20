export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "when-to-start-11-plus-tutoring",
    title: "When Should You Start 11+ Tutoring? A Year-by-Year Guide",
    excerpt:
      "Starting too early can cause burnout; starting too late can mean playing catch-up. Here's how to time your child's 11+ preparation.",
    category: "11+ Guidance",
    readTime: "6 min read",
    publishedAt: "2026-05-12",
    author: "GradeHub Editorial Team",
    content: [
      "There is no single right answer, but most Buckinghamshire families begin focused preparation in Year 4 or the start of Year 5 — roughly 12 to 18 months before the exam sits in September of Year 6.",
      "Starting in Year 4 allows a gentle, low-pressure introduction to Verbal and Non-Verbal Reasoning concepts, building familiarity well before the format needs to become second nature.",
      "Families starting in Year 5 can still achieve excellent results, particularly with a tutor who tailors a plan around the specific gaps a child has — the key is consistency over intensity.",
      "Whatever your timeline, the earliest step is understanding your target school's exact test format, since CSSE, GL and CEM papers all assess slightly different skills.",
    ],
  },
  {
    slug: "verbal-vs-non-verbal-reasoning",
    title: "Verbal Reasoning vs Non-Verbal Reasoning: What's the Difference?",
    excerpt:
      "Two of the most misunderstood 11+ papers, explained simply — plus how to tell which one your child needs more support with.",
    category: "Exam Prep",
    readTime: "5 min read",
    publishedAt: "2026-04-28",
    author: "GradeHub Editorial Team",
    content: [
      "Verbal Reasoning tests how children work with words, logic and language — code-breaking, analogies, and comprehension-style logic puzzles.",
      "Non-Verbal Reasoning tests pattern recognition and spatial awareness using shapes and sequences, with no reliance on vocabulary.",
      "A child can be strong in one and weak in the other, which is why a personalised assessment at the start of tutoring matters more than a one-size-fits-all course.",
    ],
  },
  {
    slug: "choosing-the-right-tutor",
    title: "How to Choose the Right 11+ Tutor for Your Child",
    excerpt:
      "Qualifications matter, but fit matters more. Here's what to actually look for beyond the star rating.",
    category: "Parent Advice",
    readTime: "7 min read",
    publishedAt: "2026-03-15",
    author: "GradeHub Editorial Team",
    content: [
      "Look beyond star ratings to specifics: has the tutor prepared children for your exact target school before? Do they understand the CSSE, GL or CEM format you'll be sitting?",
      "Book a free consultation call before committing. The best tutor on paper isn't always the best fit for your child's personality and confidence level.",
      "Ask how progress is tracked. The strongest tutors give you visibility — mock scores, topic breakdowns, and a clear plan for the weeks ahead.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
