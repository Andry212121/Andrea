export interface LocationPage {
  slug: string;
  town: string;
  heading: string;
  intro: string;
  schools: string[];
  tutorCountEstimate: string;
}

export const locations: LocationPage[] = [
  {
    slug: "aylesbury",
    town: "Aylesbury",
    heading: "11+ Tutors in Aylesbury",
    intro:
      "Aylesbury is home to several highly sought-after Buckinghamshire grammar schools. Our vetted local tutors know the CSSE test format inside out and prepare children for both the exam and the wider selection process.",
    schools: ["Aylesbury Grammar School", "Aylesbury High School", "The Grange School (Upper)"],
    tutorCountEstimate: "40+",
  },
  {
    slug: "high-wycombe",
    town: "High Wycombe",
    heading: "11+ Tutors in High Wycombe",
    intro:
      "High Wycombe families targeting Wycombe High School or the Royal Grammar School work with our specialist tutors who tailor preparation to each school's exact assessment format.",
    schools: ["Royal Grammar School High Wycombe", "Wycombe High School"],
    tutorCountEstimate: "35+",
  },
  {
    slug: "milton-keynes",
    town: "Milton Keynes",
    heading: "11+ Tutors in Milton Keynes",
    intro:
      "Milton Keynes doesn't have local grammar schools, so many families prepare for out-of-county consortium tests or independent school entrance exams. Our tutors cover both routes.",
    schools: ["Out-of-county consortium testing", "Independent school entrance exams"],
    tutorCountEstimate: "30+",
  },
  {
    slug: "buckingham",
    town: "Buckingham",
    heading: "11+ Tutors in Buckingham",
    intro:
      "Buckingham families preparing for The Royal Latin School work with tutors experienced in the Buckinghamshire CSSE format and the school's own selection criteria.",
    schools: ["The Royal Latin School"],
    tutorCountEstimate: "20+",
  },
  {
    slug: "online",
    town: "Online",
    heading: "Online 11+ Tutors",
    intro:
      "Prefer to learn from home? Our online tutors deliver the same structured, vetted tuition over video, with digital whiteboards and shared practice papers — popular with families across and beyond Buckinghamshire.",
    schools: ["Available UK-wide"],
    tutorCountEstimate: "120+",
  },
];
