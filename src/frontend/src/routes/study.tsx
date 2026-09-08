import {
  DEATH_RATES,
  DIMENSIONS,
  type DimensionId,
  ENERGY_SOURCES,
  GWE_OPTIONS,
  type GweOption,
  co2Lifetime,
  comparisonSources,
  deathPerYear,
  deathTotal,
  nuclearOutput,
  scaleForGwe,
} from "@/data/energy";
import { createRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Atom,
  BookOpen,
  FlaskConical,
  Gauge,
  Landmark,
  LineChart,
  Radiation,
  Recycle,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { RootRoute } from "./__root";

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          {children}
        </p>
      ) : null}
    </div>
  );
}

/** Format large numbers compactly, e.g. 9,290,000 -> "9.29M". */
function formatValue(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString();
}

function StudyHero() {
  return (
    <section
      data-ocid="study.hero"
      className="relative overflow-hidden border-b border-border"
    >
      <div className="absolute inset-0 bg-gradient-subtle" aria-hidden="true" />
      <div className="container relative py-20 md:py-28">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft"
            aria-hidden="true"
          />
          The Study
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl">
          The Importance of{" "}
          <span className="text-gradient-primary">Being Nuclear</span>
        </h1>
        <p className="mt-6 max-w-3xl text-base text-muted-foreground md:text-lg">
          Since the 2019 crisis, Lebanon has faced a severe electricity crisis
          that has slowed the country's development and worsened its economic
          situation. This study investigates whether nuclear energy could
          theoretically resolve Lebanon's electricity crisis and meet national
          demand. In this paper, the amount of fuel needed to meet the demand
          was calculated, along with the CO₂ emissions, since environmental
          impact is an important factor. The land area required was also
          considered, because Lebanon is a small and densely populated country.
          In addition, an LCOE analysis was carried out to evaluate the economic
          side, especially since the crisis has already affected the country's
          economy. A safety comparison based on death rates was also included.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {ENERGY_SOURCES.map((source) => (
            <span
              key={source.id}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-foreground"
            >
              <span
                className={`h-2 w-2 rounded-full ${source.dotClass}`}
                aria-hidden="true"
              />
              {source.shortName}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocioEconomicSection() {
  return (
    <section
      id="socio-economic"
      data-ocid="study.socio-economic"
      className="scroll-mt-24 border-b border-border bg-muted/30 py-20 md:py-28"
    >
      <div className="container">
        <SectionHeading eyebrow="01 · Context" title="A crisis beyond the grid">
          The electricity shortage is not an isolated infrastructure problem —
          it sits at the centre of a broader socio-economic collapse.
        </SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Landmark className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
              The socio-economic context
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Studies show that the electricity crisis intensified after the
              2019 financial collapse, which led to currency devaluation, fuel
              shortages, and rising electricity costs. This has significantly
              affected living conditions, limiting access to essential services
              such as healthcare, education, food preservation, and water
              supply. The crisis therefore extends beyond infrastructure
              failure, representing a broader socio-economic collapse affecting
              households and communities across the country.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/15 text-accent">
              <Gauge className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
              Why this study matters
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Because the crisis touches every household, the search for a
              reliable, affordable, and low-carbon source of electricity is not
              merely technical — it is a question of restoring access to the
              essentials of daily life. This study weighs nuclear against the
              alternatives on fuel, carbon, land, cost, and safety to ask
              whether it could theoretically meet Lebanon's needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionsSection() {
  const questions = [
    {
      icon: Gauge,
      title: "Can nuclear meet Lebanon's demand?",
      body: "Using fundamental physics, how much fuel and land would nuclear need to deliver the country's electricity?",
    },
    {
      icon: Atom,
      title: "How do the alternatives compare?",
      body: "Measured on equal footing — the same capacity — how do coal, diesel, solar, and wind stack up on fuel, carbon, land, and cost?",
    },
    {
      icon: LineChart,
      title: "Is nuclear safe enough?",
      body: "A safety comparison based on death rates reveals whether nuclear's reputation matches its real-world risk.",
    },
  ];

  return (
    <section
      id="questions"
      data-ocid="study.questions"
      className="scroll-mt-24 border-b border-border py-20 md:py-28"
    >
      <div className="container">
        <SectionHeading eyebrow="02 · Questions" title="What this study asks">
          A single goal drives the entire investigation: to determine whether
          nuclear power, analysed with fundamental physics, could theoretically
          meet Lebanon's electricity needs.
        </SectionHeading>

        <div className="mb-10 rounded-lg border border-primary/30 bg-primary/5 p-6 shadow-subtle md:p-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Paper goal / question
          </p>
          <p className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-foreground md:text-2xl">
            "This project investigates whether nuclear power plants, analyzed
            using fundamental physics principles, could theoretically meet
            Lebanon's electricity needs."
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {questions.map((q, i) => (
            <div
              key={q.title}
              data-ocid={`study.questions.card.${i + 1}`}
              className="rounded-lg border border-border bg-card p-6 shadow-subtle transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary">
                <q.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
                {q.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{q.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: "Pick a reactor capacity",
      body: "Choose how much nuclear capacity you need, in gigawatts-electric (1, 2, or 3 GWe). Every source is then measured against that same target.",
    },
    {
      title: "Compare across six dimensions",
      body: "Fuel, device count, CO₂, land, cost, and safety are shown side by side for all five technologies — with onshore and offshore wind combined into a single entry.",
    },
    {
      title: "Watch the trade-offs scale",
      body: "As you change the capacity, the graphs update live — revealing how each source's footprint scales with the reactor size.",
    },
  ];

  return (
    <section
      id="how-it-works"
      data-ocid="study.how-it-works"
      className="scroll-mt-24 border-b border-border bg-muted/30 py-20 md:py-28"
    >
      <div className="container">
        <SectionHeading
          eyebrow="03 · How It Works"
          title="Nuclear power, in plain language"
        >
          Before you drive the comparison, here's the short version of what
          nuclear power actually is — and a video that walks through it.
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              <Atom className="h-4 w-4" aria-hidden="true" />
              The short version
            </span>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              Nuclear power works by splitting heavy atoms — usually uranium —
              in a controlled chain reaction. That split releases an enormous
              amount of heat, which boils water into steam that spins a turbine
              to make electricity.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The same fuel that powers a reactor is incredibly dense: a tiny
              amount of uranium delivers the energy of thousands of tonnes of
              coal. That's why nuclear produces almost no carbon dioxide and
              needs very little land — but it also demands expensive, complex
              infrastructure and carries persistent safety and waste concerns.
            </p>
          </div>

          <div
            data-ocid="study.how-it-works.video"
            className="overflow-hidden rounded-lg border border-border bg-card shadow-subtle"
          >
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/rcOFV4y5z8c"
                title="Nuclear Energy Explained: How does it work? (Kurzgesagt)"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="border-t border-border px-6 py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Nuclear Energy Explained — Kurzgesagt
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              data-ocid={`study.how-it-works.step.${i + 1}`}
              className="relative rounded-lg border border-border bg-card p-6 shadow-subtle"
            >
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                Step {i + 1}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologySection() {
  const points = [
    "Nuclear output is derived from fission physics: at G GWe, the reactor produces E_y ≈ 8.3G TWh/year and consumes ≈ 1.16G tonnes of U-235 per year.",
    "All five technologies are evaluated at an identical capacity, so the comparison is apples-to-apples.",
    "Fuel and device requirements are computed from the nuclear output at the selected capacity, so every source scales with GWe.",
    "CO₂ is reported as both an annual figure and a lifetime total, using each technology's operating lifetime.",
  ];

  return (
    <section
      id="methodology"
      data-ocid="study.methodology"
      className="scroll-mt-24 border-b border-border py-20 md:py-28"
    >
      <div className="container">
        <SectionHeading
          eyebrow="04 · Methodology"
          title="How the numbers are built"
        >
          The comparison rests on a consistent, physics-based method so the
          trade-offs are meaningful rather than cherry-picked.
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/15 text-accent">
              <FlaskConical className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
              Equal footing
            </h3>
            <ul className="mt-4 space-y-3">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
              The six dimensions
            </h3>
            <div className="mt-4 space-y-3">
              {DIMENSIONS.map((dim) => (
                <div key={dim.id} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
                      {dim.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dim.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTool() {
  const [gwe, setGwe] = useState<GweOption>(1);
  const [activeDimension, setActiveDimension] = useState<DimensionId>("co2");
  const [hiddenSources, setHiddenSources] = useState<Set<string>>(new Set());

  const activeMeta = DIMENSIONS.find((d) => d.id === activeDimension)!;
  const output = nuclearOutput(gwe);
  const sources = comparisonSources();

  const rows = sources
    .filter((s) => !hiddenSources.has(s.id))
    .map((source) => {
      const scaled = scaleForGwe(source, activeDimension, gwe);
      return { source, scaled };
    });
  const max = Math.max(...rows.map((r) => r.scaled), 1);

  const toggleSource = (id: string) => {
    setHiddenSources((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      data-ocid="study.compare.tool"
      className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Reactor capacity
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose how much nuclear capacity you need, in gigawatts-electric.
            Every source is scaled to this same target.
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold tracking-tight text-foreground">
              {gwe}
            </span>
            <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              GWe
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            {GWE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setGwe(option)}
                data-ocid={`study.compare.gwe.${option}`}
                aria-pressed={gwe === option}
                className={`rounded-md border px-4 py-2 font-mono text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  gwe === option
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {option} GWe
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:max-w-sm">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Dimension
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DIMENSIONS.map((dim) => (
              <button
                key={dim.id}
                type="button"
                onClick={() => setActiveDimension(dim.id)}
                data-ocid={`study.compare.dimension.${dim.id}`}
                aria-pressed={activeDimension === dim.id}
                className={`rounded-md border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeDimension === dim.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {dim.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Nuclear annual output
          </p>
          <p className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground">
            ≈ {output.energyTwh.toFixed(1)} TWh/year
          </p>
        </div>
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            U-235 consumed
          </p>
          <p className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground">
            ≈ {output.uraniumTonnes.toFixed(2)} tonnes/year
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
            {activeMeta.label}
          </h3>
          <p className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground sm:block">
            {activeMeta.unit}
          </p>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          {activeMeta.description}
        </p>

        <div className="mb-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Energy sources
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sources.map((source) => {
              const hidden = hiddenSources.has(source.id);
              return (
                <button
                  key={source.id}
                  type="button"
                  onClick={() => toggleSource(source.id)}
                  data-ocid={`study.compare.toggle.${source.id}`}
                  aria-pressed={!hidden}
                  className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    hidden
                      ? "border-border bg-muted text-muted-foreground/50 line-through hover:text-muted-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${source.dotClass} ${
                      hidden ? "opacity-30" : ""
                    }`}
                    aria-hidden="true"
                  />
                  {source.shortName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          {rows.map(({ source, scaled }) => {
            const pct = Math.max((scaled / max) * 100, 2);
            const lifetime =
              activeDimension === "co2" ? co2Lifetime(source, gwe) : null;
            const showDeaths =
              activeDimension === "co2" || activeDimension === "land";
            const deaths = showDeaths ? deathPerYear(source, gwe) : null;
            return (
              <div key={source.id} data-ocid={`study.compare.row.${source.id}`}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
                    <span
                      className={`h-2 w-2 rounded-full ${source.dotClass}`}
                      aria-hidden="true"
                    />
                    {source.shortName}
                  </span>
                  <span className="text-right font-mono text-xs text-muted-foreground">
                    {formatValue(scaled)} {activeMeta.unit}
                    {lifetime !== null
                      ? ` · ${formatValue(lifetime)} t lifetime`
                      : ""}
                    {deaths !== null ? ` · ${deaths.toFixed(2)} deaths/yr` : ""}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${source.barClass} transition-all duration-500 ease-out`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {source.note ? (
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {source.note}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
          {activeMeta.higherIsBetter
            ? "Higher is better for this dimension."
            : "Lower is better for this dimension."}{" "}
          Bars are normalized to the largest value at the selected capacity.
          {activeDimension === "co2"
            ? " Lifetime totals use each technology's operating lifetime."
            : ""}
          {activeDimension === "co2" || activeDimension === "land"
            ? " Deaths per year are shown alongside, using each source's death rate per TWh."
            : ""}
        </p>
      </div>
    </div>
  );
}

function CompareSection() {
  return (
    <section
      id="compare"
      data-ocid="study.compare"
      className="scroll-mt-24 border-b border-border bg-muted/30 py-20 md:py-28"
    >
      <div className="container">
        <SectionHeading
          eyebrow="05 · Compare"
          title="Drive the comparison yourself"
        >
          Choose a reactor capacity and watch how each technology's footprint
          scales across fuel, devices, CO₂, land, cost, and safety.
        </SectionHeading>
        <ComparisonTool />
      </div>
    </section>
  );
}

function DeathRatesSection() {
  const [gwe, setGwe] = useState<GweOption>(1);
  const output = nuclearOutput(gwe);
  const rows = DEATH_RATES.map((source) => ({
    source,
    total: deathTotal(source, gwe),
  }));
  const max = Math.max(...rows.map((r) => r.total), 1);

  return (
    <section
      id="death-rates"
      data-ocid="study.death-rates"
      className="scroll-mt-24 border-b border-border py-20 md:py-28"
    >
      <div className="container">
        <SectionHeading
          eyebrow="06 · Death Rates"
          title="How many deaths per unit of power?"
        >
          A safety comparison based on death rates reveals whether nuclear's
          reputation matches its real-world risk. Each figure is the number of
          deaths per TWh of electricity generated, scaled to the reactor
          capacity you select.
        </SectionHeading>

        <div
          data-ocid="study.death-rates.tool"
          className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Reactor capacity
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose how much nuclear capacity you need, in
                gigawatts-electric. Death totals scale with the energy each
                source produces.
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                  {gwe}
                </span>
                <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                  GWe
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                {GWE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setGwe(option)}
                    data-ocid={`study.death-rates.gwe.${option}`}
                    aria-pressed={gwe === option}
                    className={`rounded-md border px-4 py-2 font-mono text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      gwe === option
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-muted text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {option} GWe
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full lg:max-w-sm">
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Energy produced
                </p>
                <p className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground">
                  {output.energyTwh.toFixed(1)} TWh/year
                </p>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Death totals below use this output: deaths per TWh ×{" "}
                {output.energyTwh.toFixed(1)} TWh.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                Deaths per TWh and total deaths
              </h3>
              <p className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground sm:block">
                deaths / TWh
              </p>
            </div>

            <div className="space-y-5">
              {rows.map(({ source, total }) => {
                const pct = Math.max((total / max) * 100, 2);
                return (
                  <div
                    key={source.id}
                    data-ocid={`study.death-rates.row.${source.id}`}
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
                        <span
                          className={`h-2 w-2 rounded-full ${source.dotClass}`}
                          aria-hidden="true"
                        />
                        {source.shortName}
                      </span>
                      <span className="text-right font-mono text-xs text-muted-foreground">
                        {source.deathsPerTwh} / TWh ·{" "}
                        <span className="text-foreground">
                          {total.toFixed(3)} deaths
                        </span>
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${source.barClass} transition-all duration-500 ease-out`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    {source.note ? (
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        {source.note}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
              Lower is better. Bars are normalized to the largest total at the
              selected capacity. Death totals = deaths per TWh × (8.3 × G) TWh.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function NuclearWasteSection() {
  const annual = 19.1;
  const perReactor = 764;
  const total = 2292;

  return (
    <section
      id="nuclear-waste"
      data-ocid="study.nuclear-waste"
      className="scroll-mt-24 border-b border-border bg-muted/30 py-20 md:py-28"
    >
      <div className="container">
        <SectionHeading
          eyebrow="07 · Nuclear Waste"
          title="A small amount of a very dense fuel"
        >
          At the national-demand scenario — three 1 GWe reactors running for 40
          years — the spent fuel is far smaller than the electricity it
          produces. This section is fixed to that scenario and does not scale
          with the capacity selector above.
        </SectionHeading>

        <div className="mb-10 rounded-lg border border-primary/30 bg-primary/5 p-6 shadow-subtle md:p-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Fuel vs. spent fuel
          </p>
          <p className="mt-3 text-base leading-relaxed text-foreground">
            Note: this 1.16 metric tons per year is the mass of U-235 that
            actually undergoes fission, not the total mass of reactor fuel
            loaded. Since commercial reactors use low-enriched uranium (LEU) at
            about 5% U-235, the actual mass of LEU fuel loaded each year is
            larger; this is calculated later, in the Cost section, as
            approximately 19.1 metric tons of LEU/year using a burnup-based
            method. Even using this larger, more realistic figure, nuclear still
            requires dramatically less fuel mass than coal or diesel to produce
            the same electricity output.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Recycle className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Annual spent fuel
            </p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
              {annual} t/year
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Per reactor, based on a 55 GWd/t burnup — the energy density of
              the fuel means very little mass is consumed.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/15 text-accent">
              <Atom className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Per reactor, 40 years
            </p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
              {perReactor} t
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              One 1 GWe reactor accumulates this much spent fuel over its
              operating lifetime.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Radiation className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Three reactors, 40 years
            </p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
              {total} t
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Total spent fuel across the national-demand scenario of three 1
              GWe reactors.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/15 text-accent">
              <FlaskConical className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
              Most waste is low-level
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The vast majority of nuclear waste is low-level — lightly
              contaminated materials with low radioactivity, such as clothing,
              tools, and filters. High-level waste, the small fraction that
              holds most of the radioactivity, makes up only a tiny share of the
              total volume. A significant percentage of this low-level waste is
              recyclable — metals, concrete, and other materials can be
              decontaminated and reused rather than sent to disposal.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Landmark className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
              Small relative to the power
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Across 40 years, three reactors produce roughly 2,292 metric tons
              of spent fuel while generating a vast amount of electricity. That
              mass is small relative to the energy delivered — a direct
              consequence of uranium's extraordinary energy density.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConclusionSection() {
  return (
    <section
      id="conclusion"
      data-ocid="study.conclusion"
      className="scroll-mt-24 py-20 md:py-28"
    >
      <div className="container">
        <div className="rounded-lg border border-border bg-card p-8 shadow-subtle md:p-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            08 · Conclusion
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Nuclear earns a serious second look
          </h2>
          <p className="mt-6 max-w-3xl text-base text-muted-foreground md:text-lg">
            Across every dimension, nuclear delivers very low carbon and a tiny
            land footprint — the two attributes a low-carbon future demands
            most. Its real costs are upfront infrastructure and persistent
            safety concerns, not the fuel or emissions that burden coal and
            diesel. The trade-off is clear: nuclear's challenges are engineering
            and perception, while its competitors' are physical limits.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/40 p-6">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                Assumptions
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  "All technologies are evaluated at an identical capacity, so the comparison is apples-to-apples.",
                  "Nuclear output is derived from fission physics and scales linearly with the selected GWe.",
                  "Lifecycle emissions include construction, fuel, and decommissioning where applicable.",
                  "Cost figures reflect typical capital and operating costs, not site-specific or regional variation.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-6">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                Limitations
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                This study is based on simplified theoretical assumptions in
                order to allow a clear physics-based comparison between energy
                sources. It assumes constant electricity demand, fixed capacity
                factors, and ideal continuous operation of nuclear reactors.
                Real-world factors such as political and economic instability,
                grid inefficiencies, transmission losses, construction delays,
                and regulatory approval processes are not included. Cost values
                are taken from generalized international estimates and may vary
                significantly depending on location, time, and local
                infrastructure conditions in Lebanon. Therefore, the results
                should be interpreted as a theoretical comparison of energy
                systems rather than a full engineering or feasibility
                assessment. This study focuses only on technical and economic
                aspects. It does not consider political, security, or
                geopolitical factors that would be very important in a real
                Lebanese nuclear project.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`${import.meta.env.BASE_URL}assets/paper/importance-of-being-nuclear.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="study.conclusion.paper"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-subtle transition-smooth hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Read the full paper
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#compare"
              data-ocid="study.conclusion.revisit"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-foreground transition-smooth hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Revisit the comparison
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudyPage() {
  return (
    <>
      <StudyHero />
      <SocioEconomicSection />
      <QuestionsSection />
      <HowItWorksSection />
      <MethodologySection />
      <CompareSection />
      <DeathRatesSection />
      <NuclearWasteSection />
      <ConclusionSection />
    </>
  );
}

export const StudyRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/study",
  component: StudyPage,
});
