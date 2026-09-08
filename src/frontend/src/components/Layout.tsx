import { Header } from "@/components/Header";
import { STUDIES } from "@/data/studies";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            The Importance of Being Nuclear — an interactive series
          </p>
          <nav
            aria-label="Studies"
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {STUDIES.map((study) => (
              <Link
                key={study.id}
                to={study.route}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-smooth hover:text-primary"
              >
                {study.index} · {study.tag}
              </Link>
            ))}
          </nav>
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
