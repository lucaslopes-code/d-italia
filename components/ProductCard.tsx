"use client";

import Image from "next/image";
import { formatPrice, type Product } from "@/lib/menu";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, open } = useCart();

  function handleAdd() {
    addItem(product);
    open();
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="group flex w-full flex-row-reverse items-stretch gap-5 rounded-2xl border border-ink/10 bg-[#E2D3B5] p-5 text-left transition-all hover:border-pomodoro/50 active:scale-[0.99] md:p-6"
    >
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cream-2 to-cream md:h-32 md:w-32">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 256px, 192px"
            quality={100}
            className="object-cover"
          />
        ) : (
          <span className="font-display text-4xl text-pomodoro/30 md:text-5xl">
            ◍
          </span>
        )}
        {product.badge && (
          <span className="absolute top-1.5 left-1.5 rounded-full bg-pomodoro px-2 py-0.5 text-[10px] font-medium tracking-wide text-cream uppercase">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl leading-tight font-semibold text-ink md:text-2xl">
              {product.name}
            </h3>
            {product.italianName && (
              <p className="mt-0.5 text-xs tracking-wide text-pomodoro/80 italic">
                {product.italianName}
              </p>
            )}
          </div>
          <span className="shrink-0 font-display text-lg font-semibold whitespace-nowrap text-ink md:text-xl">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/65">
          {product.description}
        </p>

        <span className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-medium tracking-wide text-basilico opacity-0 transition-opacity group-hover:opacity-100">
          + Adicionar ao pedido
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </button>
  );
}
