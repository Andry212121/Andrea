export interface Faq {
  question: string;
  answer: string;
  category: "General" | "Parents" | "Tutors" | "Safeguarding" | "Payments";
}

export const faqs: Faq[] = [
  {
    category: "General",
    question: "What is GradeHub?",
    answer:
      "GradeHub is a marketplace that connects parents in Buckinghamshire with vetted, DBS-checked 11+ and grammar school tutors. We handle matching, booking, messaging and payments in one secure platform.",
  },
  {
    category: "Parents",
    question: "How does tutor matching work?",
    answer:
      "You complete a short questionnaire covering your child's target school, current level, budget, availability and any learning needs. Our matching algorithm returns your best 3–5 tutor matches, ranked by fit rather than just proximity or price.",
  },
  {
    category: "Parents",
    question: "When should we start 11+ tutoring?",
    answer:
      "Most Buckinghamshire families start focused 11+ preparation in Year 4 or early Year 5, roughly 12–18 months before the exam. Starting earlier allows for a steadier pace with less pressure, but our tutors also work successfully with children starting later.",
  },
  {
    category: "Parents",
    question: "Can I meet a tutor before booking paid lessons?",
    answer:
      "Yes. Every match includes a free 15-minute consultation call so you and your child can meet the tutor and ask questions before committing to paid lessons.",
  },
  {
    category: "Safeguarding",
    question: "How are tutors vetted?",
    answer:
      "Every tutor must pass an Enhanced DBS check, provide verified proof of identity, submit evidence of qualifications, and complete a profile review by our admin team before they can appear in search results or accept bookings.",
  },
  {
    category: "Safeguarding",
    question: "Are online lessons safe?",
    answer:
      "Online lessons take place through our integrated video system, and we recommend parents remain reachable during sessions for younger children. Full details are in our Safeguarding Policy.",
  },
  {
    category: "Payments",
    question: "How does payment work?",
    answer:
      "Payments are processed securely through Stripe. Funds are held until 24 hours after a lesson is completed, giving parents time to flag any issues before tutors are paid out.",
  },
  {
    category: "Payments",
    question: "What is GradeHub's cancellation policy?",
    answer:
      "Lessons can be rescheduled or cancelled free of charge up to 24 hours in advance. Cancellations inside 24 hours may be charged in line with the tutor's individual policy, shown on their profile.",
  },
  {
    category: "Tutors",
    question: "How much can I earn as a tutor on GradeHub?",
    answer:
      "You set your own hourly rate. GradeHub takes a service fee on completed lessons booked through the platform — full details are on our Pricing page.",
  },
  {
    category: "Tutors",
    question: "What do I need to apply?",
    answer:
      "You'll need an Enhanced DBS certificate (or willingness to obtain one through us), proof of relevant qualifications or experience, a short video introduction, and to pass a profile review by our admin team.",
  },
];
