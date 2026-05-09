import type { Category } from "@/lib/menu";
import { ProductCard } from "./ProductCard";

export function CategorySection({ category }: { category: Category }) {
  return (
    <section
      id={category.id}
      className="scroll-mt-32 border-b border-ink/5 py-12 last:border-b-0 md:py-16"
    >
      <header className="mb-8 flex flex-col items-center text-center">
        <span className="text-xs tracking-[0.4em] text-pomodoro uppercase">
          {category.name}
        </span>
        <h2 className="mt-2 font-display text-4xl font-bold text-ink italic md:text-5xl">
          {category.italianName}
        </h2>
        <div className="mt-3 flex items-center gap-3">
          <span className="h-px w-8 bg-ink/20" />
          <span className="font-display text-pomodoro/70">✦</span>
          <span className="h-px w-8 bg-ink/20" />
        </div>
        <p className="mt-3 max-w-md text-sm text-ink/60">{category.subtitle}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
