import Image from "next/image";
import { restaurant } from "@/lib/menu";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-ink text-cream/80">
      <div className="mx-auto grid items-start gap-8 px-4 py-12 md:grid-cols-3 md:px-8 max-w-7xl">
        <div>
          <Image
            src="/logo.png"
            alt={restaurant.name}
            width={1300}
            height={1300}
            className="h-24 w-auto"
          />
          <p className="mt-4 max-w-xs font-display text-lg text-cream/70 italic">
            {restaurant.motto}
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            Horário
          </p>
          <p className="mt-2 text-sm">{restaurant.hours}</p>
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            Endereço
          </p>
          <p className="mt-2 text-sm">{restaurant.address}</p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-cream/40 md:px-8">
          © {new Date().getFullYear()} {restaurant.name} · Pasta Fresca · Cucina
          Italiana
        </div>
      </div>
    </footer>
  );
}
