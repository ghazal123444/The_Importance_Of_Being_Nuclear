export type StudyId = "energy" | "seismic";

export interface Study {
  id: StudyId;
  /** Mono index label, e.g. "01". */
  index: string;
  /** The paper's own title (not the series name). */
  title: string;
  /** Short descriptive summary shown on the card. */
  summary: string;
  /** Route path to the study's dedicated page. */
  route: string;
  /** Accent token for the card, e.g. "study-accent-1". */
  accent: string;
  /** Literal Tailwind classes for the accent (picked up by JIT). */
  accentText: string;
  accentBorder: string;
  accentBg: string;
  /** Short category tag shown on the card. */
  tag: string;
}

export const STUDIES: Study[] = [
  {
    id: "energy",
    index: "01",
    title: "A Quantitative Assessment of Lebanon's Energy Crisis",
    summary:
      "Analyzing current power shortfalls and modeling nuclear integration pathways for a resilient Lebanese energy grid.",
    route: "/study",
    accent: "study-accent-1",
    accentText: "text-study-accent1",
    accentBorder: "border-study-accent1",
    accentBg: "bg-study-accent1",
    tag: "Energy Systems",
  },
  {
    id: "seismic",
    index: "02",
    title:
      "Designing for Seismic Safety on the Lebanese Coast — Probabilistic Seismic Hazard and Base-Isolation Assessment for Nuclear Power Plants",
    summary:
      "Evaluating coastal seismicity and developing robust engineering criteria for safe nuclear facility deployment.",
    route: "/study/seismic",
    accent: "study-accent-2",
    accentText: "text-study-accent2",
    accentBorder: "border-study-accent2",
    accentBg: "bg-study-accent2",
    tag: "Seismic Engineering",
  },
];

export function getStudy(id: StudyId): Study {
  const study = STUDIES.find((s) => s.id === id);
  if (!study) throw new Error(`Unknown study: ${id}`);
  return study;
}
