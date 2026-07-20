export interface Subject {
  slug: string;
  name: string;
  category: "11+" | "Core" | "GCSE" | "A-Level" | "SEN";
  description: string;
}

export const subjects: Subject[] = [
  {
    slug: "11-plus",
    name: "11+ Exam Preparation",
    category: "11+",
    description: "Full preparation for grammar school entrance exams across GL and CEM formats.",
  },
  {
    slug: "verbal-reasoning",
    name: "Verbal Reasoning",
    category: "11+",
    description: "Build the vocabulary, logic and speed children need for VR papers.",
  },
  {
    slug: "non-verbal-reasoning",
    name: "Non-Verbal Reasoning",
    category: "11+",
    description: "Pattern recognition and spatial reasoning practice for NVR papers.",
  },
  {
    slug: "maths",
    name: "Maths",
    category: "Core",
    description: "From arithmetic fluency to advanced problem solving, for 11+ through A-Level.",
  },
  {
    slug: "english",
    name: "English",
    category: "Core",
    description: "Comprehension, creative writing and grammar for exams and everyday confidence.",
  },
  {
    slug: "creative-writing",
    name: "Creative Writing",
    category: "11+",
    description: "Structured techniques for the timed creative writing element of 11+ exams.",
  },
  {
    slug: "gcse-maths",
    name: "GCSE Maths",
    category: "GCSE",
    description: "Foundation and Higher tier coverage mapped to AQA, Edexcel and OCR specs.",
  },
  {
    slug: "gcse-english",
    name: "GCSE English",
    category: "GCSE",
    description: "Language and literature tuition focused on exam technique and analysis.",
  },
  {
    slug: "gcse-science",
    name: "GCSE Science",
    category: "GCSE",
    description: "Combined and Triple Science support across Biology, Chemistry and Physics.",
  },
  {
    slug: "a-level-maths",
    name: "A-Level Maths",
    category: "A-Level",
    description: "Pure, mechanics and statistics tuition from experienced subject specialists.",
  },
  {
    slug: "sen-support",
    name: "SEN Support",
    category: "SEN",
    description: "Specialist tutors experienced with dyslexia, ADHD, autism and processing needs.",
  },
];

export const examBoards = ["GL Assessment", "CEM (Durham)", "ISEB Common Pre-Test", "CSSE"];
