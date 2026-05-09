"use client";

import { useCart } from "@/lib/cart";

export function CartButton() {
  const { open, itemCount, hydrated } = useCart();
  const showBadge = hydrated && itemCount > 0;

  return (
    <button
      onClick={open}
      className="relative inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3 py-2 text-sm text-ink transition-colors hover:bg-white"
      aria-label="Abrir carrinho de pedido"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h2l2.4 11.5a2 2 0 0 0 2 1.5h7.6a2 2 0 0 0 2-1.5L21 8H6" />
        <circle cx="9" cy="21" r="1" />
        <circle cx="18" cy="21" r="1" />
      </svg>
      <span className="hidden sm:inline">Pedido</span>
      {showBadge && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pomodoro px-1 text-[10px] font-semibold text-cream">
          {itemCount}
        </span>
      )}
    </button>
  );
}
