export type Product = {
  id: string;
  name: string;
  italianName?: string;
  description: string;
  price: number;
  image?: string;
  badge?: string;
};

export type Category = {
  id: string;
  name: string;
  italianName: string;
  subtitle: string;
  products: Product[];
};

export const menu: Category[] = [
  {
    id: "paste",
    name: "Massas",
    italianName: "Le Paste",
    subtitle: "Massa fresca feita à mão",
    products: [
      {
        id: "tajarin-ragu",
        name: "Tajarin al Ragù",
        description:
          "Massa fresca inspirada na tradição piemontesa com ragù cozido lentamente.",
        price: 39,
        image: "/menu/tajarin-al-ragu.png",
      },
      {
        id: "fettuccine-pomodoro",
        name: "Fettuccine al Pomodoro",
        description:
          "Molho de tomate artesanal, manjericão e parmesão.",
        price: 34,
        image: "/menu/fettuccine-al-pomodoro.png",
      },
    ],
  },
  {
    id: "ravioli",
    name: "Ravioli",
    italianName: "I Ravioli",
    subtitle: "Massa recheada artesanal",
    products: [
      {
        id: "agnolotti-plin",
        name: "Agnolotti al Plin",
        description:
          "Feito à mão, recheado com carne e servido ao burro e salvia.",
        price: 44,
        image: "/menu/agnolotti-al-plin.png",
      },
    ],
  },
  {
    id: "lasagna",
    name: "Lasagna",
    italianName: "La Lasagna",
    subtitle: "Gratinada no forno",
    products: [
      {
        id: "lasagna-tradizionale",
        name: "Lasagna Tradizionale",
        description:
          "Massa fresca, ragù lento, besciamella e parmesão gratinado.",
        price: 42,
        image: "/menu/lasagna-tradizionale.png",
      },
    ],
  },
  {
    id: "bevande",
    name: "Bebidas",
    italianName: "Le Bevande",
    subtitle: "Para acompanhar sua massa",
    products: [
      {
        id: "coca-cola",
        name: "Coca-Cola",
        description: "Lata 350ml gelada.",
        price: 7,
        image: "/menu/coca-cola.png",
      },
      {
        id: "coca-zero",
        name: "Coca-Cola Zero",
        description: "Lata 350ml gelada, sem açúcar.",
        price: 7,
        image: "/menu/coca-cola-zero.png",
      },
      {
        id: "agua-sao-lourenco-sem-gas",
        name: "Água São Lourenço sem gás",
        description: "Garrafa 500ml.",
        price: 5,
        image: "/menu/agua-sem-gas.png",
      },
      {
        id: "agua-sao-lourenco-com-gas",
        name: "Água São Lourenço com gás",
        description: "Garrafa 500ml.",
        price: 5,
        image: "/menu/agua-com-gas.png",
      },
    ],
  },
];

export const restaurant = {
  name: "D'Italia",
  tagline: "Pasta Fresca · Cucina Italiana",
  motto: "Fatta a mano, come in Italia",
  address: "Endereço a definir",
  hours: "Ter a Dom · 18:30 às 23h",
  whatsapp: "393290055655",
};

export const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
