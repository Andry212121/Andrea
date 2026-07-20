# AI Features Roadmap

None of these are built in the MVP — the MVP's "matching algorithm" is a
transparent, rule-based scoring system (see [Matching Algorithm](./07-matching-algorithm.md)),
deliberately not an opaque ML model, because parents need to trust *why* a tutor
was suggested from day one. AI features are layered on top once there is
sufficient first-party data (bookings, lesson notes, mock scores) to make them
genuinely useful rather than gimmicky.

## Phase 4 candidates (Year 2), roughly in build order

### 1. Grammar School Readiness Score
A composite score (0–100) for a child, derived from mock exam results, tutor
progress notes, and time-to-exam — surfaced on the parent dashboard with a
plain-English explanation of what's driving it. Lowest-risk AI feature: mostly a
weighted formula over existing structured data (`progress_reports`,
`mock_exam_results`), with an LLM used only to generate the natural-language
explanation, not the score itself.

### 2. Lesson summaries
After a tutor submits raw lesson notes, an LLM drafts a parent-friendly summary
(what was covered, what went well, what to practise) for the tutor to review and
send — cuts tutor admin time without putting unreviewed AI output in front of
parents.

### 3. Parent insights digest
A weekly/monthly digest email (via Resend) summarising a child's progress trend,
generated from `progress_reports` + booking history — templated with LLM-assisted
phrasing, not free-form generation, to keep tone and accuracy controlled.

### 4. Practice question generation
Subject- and exam-board-aware practice question generation (Verbal/Non-Verbal
Reasoning, Maths) for tutors to assign as homework — generated content is
tutor-reviewed before being sent to a child, never sent directly from the model
to a parent/child unreviewed.

### 5. Study planner / revision planner
Given a target exam date, current level and available weekly hours, generate a
week-by-week revision plan — a structured-output LLM task producing a plan the
parent/tutor can edit, not an autonomous scheduler.

### 6. Progress predictions
Given historical trend data for a child (and, in aggregate/anonymised form,
similar past students), forecast a likely readiness trajectory ahead of exam
date — framed explicitly as a probabilistic estimate, never a guarantee, with
clear UI treatment to avoid false certainty in a high-stakes, emotional context.

### 7. AI Study Assistant (child-facing)
A tutor-supervised, subject-scoped chat assistant for practice/explanation
between lessons — the highest-risk feature on this list given it's child-facing;
requires its own safeguarding review, content filtering, and parental controls
before any build begins, and is explicitly out of scope until GradeHub has a
dedicated trust & safety process mature enough to support it.

### 8. Homework generator
Combines practice question generation (#4) with the study planner (#5) to
auto-draft a homework set per lesson, tutor-editable before sending.

## Guardrails that apply to every AI feature above

- **Human in the loop by default.** Nothing AI-generated reaches a parent or
  child without a tutor or admin review step, until a feature has an extended
  track record of safe output *and* an explicit decision to relax that.
- **No AI feature touches the safeguarding or DBS verification pipeline.**
  Document/identity verification remains a manual admin process indefinitely.
- **Explainability over black-box scores** anywhere money or a child's education
  is being ranked or predicted (the Readiness Score and Progress Predictions
  both ship with a "why" explanation, not just a number).
- **Data minimisation:** any third-party LLM API call strips direct identifiers
  (child's full name, etc.) where the task doesn't require them.
