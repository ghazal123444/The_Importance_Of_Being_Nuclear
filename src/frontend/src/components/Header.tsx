import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header
      data-ocid="header"
      className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md"
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          data-ocid="header.brand"
          className="font-display text-lg font-bold tracking-tight text-foreground transition-smooth hover:opacity-90"
        >
          THE IMPORTANCE OF BEING NUCLEAR
        </Link>

        <nav
          aria-label="Main navigation"
          data-ocid="header.nav"
          className="hidden items-center gap-1 md:flex"
        >
          <Link
            to="/"
            className="rounded-md px-3 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to="/study"
            className="rounded-md px-3 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
          >
            Energy Systems
          </Link>
          <Link
            to="/study/seismic"
            className="rounded-md px-3 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
          >
            Seismic Engineering
          </Link>
        </nav>
      </div>
    </header>
  );
}
