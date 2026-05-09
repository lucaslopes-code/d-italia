import { CategoryNav } from "@/components/CategoryNav";
import { CategorySection } from "@/components/CategorySection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { menu } from "@/lib/menu";

export default function Home() {
  return (
    <>
      <Header />
      <CategoryNav categories={menu} />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-12">
        {menu.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </main>

      <Footer />
    </>
  );
}
