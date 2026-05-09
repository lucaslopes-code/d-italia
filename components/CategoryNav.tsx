"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/lib/menu";

export function CategoryNav({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState<string>(categories[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav className="sticky top-[73px] z-30 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
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
