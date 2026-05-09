import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { CartSheet } from "@/components/CartSheet";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D'Italia · Pasta Fresca",
  description:
    "Massas frescas italianas feitas à mão. Tagliatelle, Tajarin, Pappardelle, Ravioli e Cannelloni — receitas tradicionais da Itália.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <CartSheet />
        </CartProvider>
      </body>
    </html>
  );
}
