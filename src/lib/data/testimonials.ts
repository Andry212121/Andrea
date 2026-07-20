export interface Testimonial {
  quote: string;
  name: string;
  context: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We were completely overwhelmed by the 11+ process until we found GradeHub. Within a week we were matched with a tutor who understood exactly what our daughter's target school was looking for. She's now at Beaconsfield High.",
    name: "Sarah T.",
    context: "Parent, Amersham",
    rating: 5,
  },
  {
    quote:
      "The vetting gave us real peace of mind — DBS checks, verified qualifications, real reviews. It's the difference between GradeHub and just searching Facebook groups for a tutor.",
    name: "Michael R.",
    context: "Parent, High Wycombe",
    rating: 5,
  },
  {
    quote:
      "Our son went from dreading Verbal Reasoning to actually looking forward to his sessions. The progress dashboard meant we always knew exactly where he stood.",
    name: "Aisha K.",
    context: "Parent, Aylesbury",
    rating: 5,
  },
  {
    quote:
      "As a tutor, GradeHub has completely changed how I get students. No more chasing invoices or managing five different WhatsApp groups — bookings, payments and messaging all live in one place.",
    name: "Eleanor W.",
    context: "GradeHub Tutor since 2023",
    rating: 5,
  },
];

export const platformStats = [
  { label: "Vetted tutors across Buckinghamshire", value: "250+" },
  { label: "Grammar school offers supported", value: "1,400+" },
  { label: "Average parent rating", value: "4.9/5" },
  { label: "Average tutor response time", value: "< 2 hrs" },
];
