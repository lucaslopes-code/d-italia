import Image from "next/image";
import { CartButton } from "@/components/CartButton";
import { restaurant } from "@/lib/menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-8 md:py-3">
        <Image
          src="/logo.png"
          alt={restaurant.name}
          width={1300}
          height={1300}
          priority
          className="h-14 w-auto md:h-20"
        />

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-xs text-ink/70 sm:flex md:text-sm">
            <span className="size-2 shrink-0 rounded-full bg-basilico" />
            <span>{restaurant.hours}</span>
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
