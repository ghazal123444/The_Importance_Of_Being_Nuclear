import { createRoute } from "@tanstack/react-router";
import { Activity, ArrowRight, Building2, Gauge, Map } from "lucide-react";
import { useState } from "react";
import { RootRoute } from "./__root";

type DepthId = "D5" | "D10" | "D15";

const DEPTHS: Record<DepthId, {
  label: string;
  depth: string;
  min: string;
  mean: string;
  max: string;
}> = {
  D5: { label: "D5", depth: "5 km source depth", min: "0.07865", mean: "0.16937", max: "0.24518" },
  D10: { label: "D10", depth: "10 km source depth · principal model", min: "0.07662", mean: "0.15256", max: "0.20832" },
  D15: { label: "D15", depth: "15 km source depth", min: "0.07531", mean: "0.14323", max: "0.20642" },
};

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h2>
      {children ? <p className="mt-4 text-base text-muted-foreground md:text-lg">{children}</p> : null}
    </div>
  );
}

function StudyHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-subtle" aria-hidden="true" />
      <div className="container relative py-20 md:py-28">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
          Study 02 · Seismic Safety
        </p>
        <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Designing for Seismic Safety on the <span className="text-gradient-seismic">Lebanese Coast</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          A screening-level study coupling regional probabilistic seismic hazard analysis with fixed-base and base-isolated assessment of a published reference nuclear power plant.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {["R-CRISIS", "OpenSeesPy", "714 grid points", "273 LRBs"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-foreground">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuestionsSection() {
  const questions = [
    { icon: Gauge, title: "How strong is the coastal seismic hazard?", body: "The study maps PGA across Lebanon and summarizes the coastal screening corridor for three uniform source-depth assumptions: 5, 10, and 15 km." },
    { icon: Map, title: "How sensitive is the hazard to source depth?", body: "D10 is the principal model, while D5 and D15 are retained as sensitivity cases so the effect of the assumed source depth can be seen directly." },
    { icon: Building2, title: "Can base isolation reduce structural demand?", body: "A reference nuclear island is modeled in fixed-base and LRB-isolated configurations to test how shifting the dominant period changes seismic response." },
  ];
  return (
    <section className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="container">
        <SectionHeading eyebrow="01 · Questions" title="What this study asks">
          The paper moves from regional hazard to structural response: first quantify the shaking, then test whether isolation can reduce what the nuclear structures experience.
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {questions.map((q) => (
            <div key={q.title} className="rounded-lg border border-border bg-card p-6 shadow-subtle transition-smooth hover:-translate-y-1 hover:border-seismic-3/40 hover:shadow-elevated">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-seismic-3/15 text-seismic-3"><q.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">{q.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{q.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  const steps = [
    ["Regional PSHA", "R-CRISIS calculated hazard at 714 grid points using CY2008 and AB2010. For each depth case, the larger point-by-point PGA was retained as the conservative screening value."],
    ["Depth sensitivity", "The analysis was repeated for source depths of 5, 10, and 15 km. D10 was used as the principal model; D5 and D15 were sensitivity cases."],
    ["Coastal interpretation", "PGA at 10% probability of exceedance in 50 years, approximately a 475-year return period, was extracted and summarized for the nominal coastal screening corridor."],
    ["Structural assessment", "The reference ASB, SCV, and CIS were reproduced in separate 2D NS and EW OpenSeesPy models, then compared in fixed-base and LRB-isolated conditions."],
  ];
  return (
    <section className="scroll-mt-24 border-b border-border bg-muted/30 py-20 md:py-28">
      <div className="container">
        <SectionHeading eyebrow="02 · Methodology" title="From regional hazard to nuclear response">
          The website keeps the same chain as the paper, but strips it to the steps needed to understand the analysis.
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map(([title, body], i) => (
            <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-seismic-3/15 font-mono text-xs font-bold text-seismic-3">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HazardMap({ depth }: { depth: DepthId }) {
  const gradients: Record<DepthId, [string, string, string]> = {
    D5: ["#ef4444", "#f59e0b", "#60a5fa"],
    D10: ["#f97316", "#facc15", "#3b82f6"],
    D15: ["#fb923c", "#fde047", "#60a5fa"],
  };
  const [a, b, c] = gradients[depth];
  return (
    <svg viewBox="0 0 440 620" className="w-full" role="img" aria-label={`Simplified Lebanese PSHA map for ${depth}`}>
      <defs>
        <linearGradient id={`grad-${depth}`} x1="0" y1="1" x2="0.75" y2="0">
          <stop offset="0%" stopColor={a} />
          <stop offset="46%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect x="0" y="0" width="440" height="620" rx="20" fill="oklch(var(--background))" />
      <path d="M210 28 C238 42 250 68 246 102 C242 135 225 160 214 190 C200 228 198 266 188 302 C178 342 154 370 144 405 C132 446 118 484 98 518 C86 539 77 555 70 573 C103 589 130 592 158 583 C191 573 211 551 229 522 C247 494 261 462 279 432 C295 404 319 380 329 350 C339 318 330 292 312 270 C294 248 279 232 273 205 C267 177 276 151 291 128 C307 102 315 78 304 59 C287 31 252 20 210 28 Z"
        fill={`url(#grad-${depth})`} stroke="oklch(var(--seismic-2))" strokeWidth="4" filter="url(#glow)" />
      <path d="M116 455 C157 424 201 392 242 356" stroke="rgba(255,255,255,.25)" strokeWidth="2" strokeDasharray="6 8" fill="none"/>
      <path d="M102 505 C154 472 216 423 274 361" stroke="rgba(255,255,255,.18)" strokeWidth="2" strokeDasharray="4 9" fill="none"/>
      <text x="20" y="585" fill="oklch(var(--muted-foreground))" fontSize="13" fontFamily="monospace">PGA screening surface · {depth}</text>
    </svg>
  );
}

function HazardSection() {
  const [depth, setDepth] = useState<DepthId>("D10");
  const current = DEPTHS[depth];
  return (
    <section id="hazard" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="container">
        <SectionHeading eyebrow="03 · Interactive PSHA" title="Change the assumed source depth">
          Select D5, D10, or D15. The map and the coastal minimum, mean, and maximum PGA values update together. No invented hazard curves — only the depth cases reported in the paper.
        </SectionHeading>
        <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">Source-depth case</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(Object.keys(DEPTHS) as DepthId[]).map((id) => (
                  <button key={id} onClick={() => setDepth(id)} aria-pressed={depth === id}
                    className={`rounded-md border px-5 py-2.5 font-mono text-sm font-semibold uppercase tracking-widest transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${depth === id ? "border-seismic-3 bg-seismic-3 text-background" : "border-border bg-muted text-muted-foreground hover:border-seismic-3/50 hover:text-foreground"}`}>
                    {id}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-border bg-muted/40 px-4 py-3">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Selected case</p>
              <p className="mt-1 font-display text-xl font-bold text-foreground">{current.depth}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-lg border border-border bg-background p-3"><HazardMap depth={depth} /></div>
            <div className="flex flex-col justify-center">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Coastal PGA statistics</p>
              <div className="mt-4 grid gap-3">
                {[["Minimum", current.min], ["Mean", current.mean], ["Maximum", current.max]].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-border bg-muted/40 p-5">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label} PGA</p>
                    <div className="mt-2 flex items-baseline gap-2"><span className="font-display text-4xl font-bold tracking-tight text-foreground">{value}</span><span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">g</span></div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The coastal pattern remains broadly coherent across the three depth assumptions, while the mean and maximum PGA show moderate depth sensitivity. D10 remains the principal model used for the structural work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IsolationSection() {
  const results = [
    ["Base shear", "65.5–73.3%", "reduction"],
    ["Internal deformation", "90.5–95.3%", "reduction"],
    ["Pseudo-acceleration", "94.1–98.1%", "reduction"],
    ["Isolation displacement", "1.85–1.95 cm", "at the interface"],
  ];
  return (
    <section className="scroll-mt-24 border-b border-border bg-muted/30 py-20 md:py-28">
      <div className="container">
        <SectionHeading eyebrow="04 · Base Isolation" title="What changed when the nuclear island was isolated">
          The study calibrated a 273-bearing LRB system around a 2.5 s target period with 20% equivalent damping, then compared the effective-linear isolated response with the fixed-base model.
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary"><Activity className="h-4 w-4" /> Dynamic shift</span>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">The plant begins moving as one isolated nuclear island</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The isolated periods were 2.489 s in NS and 2.491 s in EW. Approximately 99.99% of the horizontal effective mass moved in the first isolated mode, showing the intended near-rigid-body translation above the isolation layer.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-muted/40 p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Governing fixed-base case</p>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">14,389 kip</p>
              <p className="mt-1 text-sm text-muted-foreground">EW · AB2010-D10</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map(([label, value, note]) => (
              <div key={label} className="rounded-lg border border-border bg-card p-5 shadow-subtle">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-seismic-3">{note}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-relaxed text-muted-foreground">
          A key result is that the controlling GMPE changes after isolation. CY2008 controls PGA at Site S1, while AB2010 controls the governing fixed-base base shear. This shows why structural demand cannot be inferred from PGA alone; the period-dependent response spectrum matters.
        </p>
      </div>
    </section>
  );
}

function LimitationsSection() {
  const assumptions = [
    "D10 was adopted as the principal uniform source-depth case, with D5 and D15 retained as sensitivities.",
    "The regional PSHA used reference-rock conditions, simplified fault mechanisms, and approximate source geometries.",
    "Separate 2D NS and EW structural models were used instead of an unsupported full 3D torsional model.",
    "The basemat was treated as rigid and 273 identical LRBs were represented by an equivalent aggregate horizontal isolation element.",
    "The superstructure used 4% damping; the dominant isolation response used 20% equivalent damping as a separate response group.",
  ];
  const limitations = [
    "The 475-year hazard level is a screening level, not a nuclear design-basis or licensing-grade hazard level.",
    "The simplified regional PSHA does not include detailed local soil amplification or a complete site-specific geological, geophysical, geotechnical, and uncertainty program.",
    "The 2D aggregate-bearing model cannot resolve torsion, rocking, vertical response, individual-bearing axial-load redistribution, heating, buckling, or cavitation.",
    "The calibrated Qd/W ratio of about 0.42% is unusually low relative to the reference nuclear-isolation range and requires physical engineering validation.",
    "Three paired records were prepared for a nonlinear extension, but nonlinear plant-response results are not reported as final evidence in this paper.",
  ];
  return (
    <section className="scroll-mt-24 py-20 md:py-28">
      <div className="container">
        <div className="rounded-lg border border-border bg-card p-8 shadow-subtle md:p-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">05 · Interpretation</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">What the results do — and do not — establish</h2>
          <p className="mt-6 max-w-3xl text-base text-muted-foreground md:text-lg">
            The work demonstrates a coherent hazard-to-isolation workflow and shows strong demand reduction in the adopted screening model. It does not qualify Site S1, finalize an LRB design, or provide a nuclear licensing basis.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/40 p-6">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Main assumptions</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">{assumptions.map((item) => <li key={item} className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-seismic-3" />{item}</li>)}</ul>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-6">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Important limitations</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">{limitations.map((item) => <li key={item} className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-seismic-4" />{item}</li>)}</ul>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`${import.meta.env.BASE_URL}assets/paper/seismic-final.pdf`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-subtle transition-smooth hover:-translate-y-0.5 hover:brightness-110">Read the full paper <ArrowRight className="h-4 w-4" /></a>
            <a href="#hazard" className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-foreground transition-smooth hover:-translate-y-0.5 hover:border-primary/50">Revisit the PSHA map <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudySeismicPage() {
  return <><StudyHero /><QuestionsSection /><MethodSection /><HazardSection /><IsolationSection /><LimitationsSection /></>;
}

export const StudySeismicRoute = createRoute({ getParentRoute: () => RootRoute, path: "/study/seismic", component: StudySeismicPage });
