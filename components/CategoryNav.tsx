"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/lib/menu";

export function CategoryNav({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState<string>(categories[0]?.id ?? "");

  useEffect(() => {
    const ids = categories.map((c) => c.id);

    const computeActive = () => {
      // No fim da página, a última seção é o alvo mesmo que seja curta.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1] ?? "");
        return;
      }

      // Caso geral: última seção cujo topo já cruzou a linha de 30% da viewport.
      const line = window.innerHeight * 0.3;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);

    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, [categories]);

  return (
    <nav className="sticky top-[73px] z-30 border-b border-ink/10 bg-cream/90 backdrop-blur-md md:top-[105px]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <ul className="no-scrollbar flex gap-1 overflow-x-auto py-3">
          {categories.map((c) => {
            const isActive = active === c.id;
            return (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? "bg-pomodoro text-cream"
                      : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {c.italianName}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
