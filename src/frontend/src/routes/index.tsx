import { ENERGY_SOURCES } from "@/data/energy";
import { STUDIES, type Study } from "@/data/studies";
import { createRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { RootRoute } from "./__root";

function Hero() {
  return (
    <section data-ocid="home.hero" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle" aria-hidden="true" />
      <div className="container relative py-20 md:py-28">
        <div className="max-w-4xl animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft"
              aria-hidden="true"
            />
            Research Series
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            The Importance of{" "}
            <span className="text-gradient-primary">Being Nuclear</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Two connected studies examining nuclear energy in Lebanon: first the
            electricity question, then seismic safety on the Lebanese coast.
          </p>
        </div>
      </div>
    </section>
  );
}

function StudyVisual({ study }: { study: Study }) {
  if (study.id === "energy") {
    return (
      <div className="flex flex-wrap gap-2">
        {ENERGY_SOURCES.map((source) => (
          <span
            key={source.id}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-foreground"
          >
            <span
              className={`h-2 w-2 rounded-full ${source.dotClass}`}
              aria-hidden="true"
            />
            {source.shortName}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border/60 bg-muted/30 p-4">
      <svg viewBox="0 0 240 72" className="w-full" aria-hidden="true">
        <polyline
          points="0,36 24,34 48,38 72,32 96,40 120,26 144,46 168,18 192,54 216,10 240,62"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={study.accentText}
        />
      </svg>
    </div>
  );
}

function StudyCard({ study, position }: { study: Study; position: number }) {
  return (
    <Link
      to={study.route}
      data-ocid={`home.study.card.${position}`}
      className="group study-card flex flex-col overflow-hidden rounded-lg shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
        <span
          className={`font-mono text-xs font-semibold uppercase tracking-widest ${study.accentText}`}
        >
          {study.index}
        </span>
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {study.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3
          className={`font-display text-2xl font-bold tracking-tight md:text-3xl ${study.accentText}`}
        >
          {study.title}
        </h3>
        <p className="mt-4 text-sm text-muted-foreground md:text-base">
          {study.summary}
        </p>
        <div className="mt-6">
          <StudyVisual study={study} />
        </div>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-sm font-semibold uppercase tracking-widest text-foreground transition-smooth group-hover:gap-3">
          Explore study
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

function StudyExplorer() {
  return (
    <section
      data-ocid="home.study"
      className="relative overflow-hidden py-20 md:py-24"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="container relative">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              The Papers
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Two studies, one question
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground md:text-base">
            Each paper in the series is an explorable, interactive study — from Lebanon&apos;s energy crisis to seismic safety on its coast.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {STUDIES.map((study, i) => (
            <StudyCard key={study.id} study={study} position={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBox() {
  return (
    <section className="pb-24">
      <div className="container">
        <div className="mb-6 max-w-xl rounded-xl border border-border bg-card p-8 shadow-subtle">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Contact
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground">
            Questions about the research?
          </h3>
          <a
            href="mailto:Ghazalnaser1190@gmail.com"
            className="mt-4 inline-block text-base font-semibold text-primary transition-smooth hover:underline"
          >
            Ghazalnaser1190@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <StudyExplorer />
      <ContactBox />
    </>
  );
}

export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: HomePage,
});
