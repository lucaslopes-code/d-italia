"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, menu, restaurant } from "@/lib/menu";

export function CartSheet() {
  const { items, isOpen, close, total, updateQuantity, removeItem, addItem } =
    useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [showDrinks, setShowDrinks] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const drinks = menu.find((c) => c.id === "bevande")?.products ?? [];

  // Lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) {
      setShowDrinks(false);
      setErrorOpen(false);
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  function handleFinalize() {
    if (items.length === 0) return;

    if (!name.trim() || !address.trim()) {
      setSubmitted(true);
      setShowDrinks(false);
      setErrorOpen(true);
      return;
    }

    const lines = items.map(
      (i) =>
        `• ${i.quantity}x ${i.name} — ${formatPrice(i.price * i.quantity)}`,
    );

    const parts = [
      "Olá *D'Italia*! Gostaria de fazer o seguinte pedido:",
      "",
      ...lines,
      "",
      `*Total: ${formatPrice(total)}*`,
    ];

    parts.push("", `*Nome:* ${name.trim()}`);
    parts.push(`*Endereço/Obs.:* ${address.trim()}`);

    const url = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(parts.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <>
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de pedido"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <div>
            <h2 className="font-display text-2xl leading-none font-semibold text-ink">
              Seu pedido
            </h2>
            <p className="mt-1 text-xs text-ink/60">
              Confira e finalize pelo WhatsApp
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-full p-2 text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
            aria-label="Fechar carrinho"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="font-display text-5xl text-pomodoro/30">◍</span>
              <p className="mt-3 font-display text-xl text-ink">
                Carrinho vazio
              </p>
              <p className="mt-1 text-sm text-ink/60">
                Escolha um prato pra começar seu pedido
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-5 rounded-full border border-ink/15 bg-[#E2D3B5] px-4 py-2 text-sm text-ink hover:bg-[#ece0c8]"
              >
                Ver cardápio
              </button>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-ink/10 bg-[#E2D3B5] p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display text-base leading-tight font-semibold text-ink">
                          {item.name}
                        </p>
                        {item.italianName && (
                          <p className="text-[11px] tracking-wide text-pomodoro/70 italic">
                            {item.italianName}
                          </p>
                        )}
                      </div>
                      <span className="font-display font-semibold whitespace-nowrap text-ink">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-full border border-ink/15 bg-cream/50 p-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-ink hover:bg-ink/5"
                          aria-label="Diminuir"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-ink hover:bg-ink/5"
                          aria-label="Aumentar"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-ink/50">
                        {formatPrice(item.price)} cada
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-xs text-ink/50 transition-colors hover:text-pomodoro"
                      >
                        Remover
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {showDrinks ? (
                <div className="mt-5 rounded-xl border border-ink/10 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg font-semibold text-ink">
                      Escolha sua bebida
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowDrinks(false)}
                      className="text-xs tracking-wide text-ink/50 transition-colors hover:text-pomodoro"
                    >
                      Cancelar
                    </button>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {drinks.map((drink) => (
                      <li key={drink.id}>
                        <button
                          type="button"
                          onClick={() => {
                            addItem(drink);
                            setShowDrinks(false);
                          }}
                          className="flex w-full items-center gap-3 rounded-lg border border-ink/10 bg-[#E2D3B5] p-2 text-left transition-colors hover:border-pomodoro/50"
                        >
                          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-cream">
                            {drink.image && (
                              <Image
                                src={drink.image}
                                alt={drink.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-ink">
                              {drink.name}
                            </span>
                            <span className="block text-xs text-ink/60">
                              {formatPrice(drink.price)}
                            </span>
                          </span>
                          <span
                            className="font-display text-xl text-pomodoro"
                            aria-hidden
                          >
                            +
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pomodoro px-5 py-3.5 text-sm font-semibold tracking-wide text-cream shadow-[0_4px_18px_-4px_rgba(113,16,10,0.45)] transition-colors hover:bg-pomodoro-dark"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Adicionar mais itens ao carrinho
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDrinks(true)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-pomodoro/40 px-5 py-3 text-sm font-semibold tracking-wide text-pomodoro transition-colors hover:bg-pomodoro/5"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3h12l-1.3 8a5 5 0 0 1-9.4 0L6 3z" />
                      <path d="M12 16v5M8.5 21h7" />
                    </svg>
                    Adicionar bebidas
                  </button>

                  <div className="mt-6 space-y-3">
                <div>
                  <label
                    className="text-[11px] font-medium tracking-[0.15em] text-ink/70 uppercase"
                    htmlFor="cart-name"
                  >
                    Nome <span className="text-pomodoro">*</span>
                  </label>
                  <input
                    id="cart-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como devemos te chamar?"
                    aria-invalid={submitted && !name.trim()}
                    className={`mt-1 w-full rounded-lg border bg-[#E2D3B5] px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-pomodoro ${
                      submitted && !name.trim()
                        ? "border-red-500"
                        : "border-ink/15"
                    }`}
                  />
                  {submitted && !name.trim() && (
                    <p className="mt-1 text-xs text-red-600">
                      Informe seu nome.
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="text-[11px] font-medium tracking-[0.15em] text-ink/70 uppercase"
                    htmlFor="cart-address"
                  >
                    Endereço / observações <span className="text-pomodoro">*</span>
                  </label>
                  <textarea
                    id="cart-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    placeholder="Rua, número, complemento, ponto de referência…"
                    aria-invalid={submitted && !address.trim()}
                    className={`mt-1 w-full resize-none rounded-lg border bg-[#E2D3B5] px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-pomodoro ${
                      submitted && !address.trim()
                        ? "border-red-500"
                        : "border-ink/15"
                    }`}
                  />
                  {submitted && !address.trim() && (
                    <p className="mt-1 text-xs text-red-600">
                      Informe o endereço para entrega.
                    </p>
                  )}
                </div>
              </div>
                </>
              )}
            </>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-ink/10 bg-cream-2/40 px-5 py-4">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-xs tracking-[0.2em] text-ink/70 uppercase">
                Total
              </span>
              <span className="font-display text-2xl font-bold text-ink">
                {formatPrice(total)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleFinalize}
              className="mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-basilico px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-basilico-dark"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 21.8c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.2 12C2.2 6.6 6.6 2.2 12 2.2S21.8 6.6 21.8 12 17.4 21.8 12 21.8zm5.4-7.3c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5s0-.4 0-.5c0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.2 3.3 5.3 4.6 2.6 1 3.1.8 3.7.8.6 0 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.2-.2-.5-.3z" />
              </svg>
              Finalizar pedido
            </button>
          </footer>
        )}
      </aside>

      {errorOpen && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-label="Campos obrigatórios"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div
            onClick={() => setErrorOpen(false)}
            aria-hidden
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-xs rounded-2xl border border-ink/10 bg-cream p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pomodoro/10 text-pomodoro">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">
              Faltou preencher
            </h3>
            <p className="mt-1 text-sm text-ink/70">
              Informe seu <strong>nome</strong> e <strong>endereço</strong> para
              finalizar o pedido.
            </p>
            <button
              type="button"
              onClick={() => setErrorOpen(false)}
              className="mt-5 w-full rounded-full bg-pomodoro px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-pomodoro-dark"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
