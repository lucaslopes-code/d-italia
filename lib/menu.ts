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
    id: "tagliatelle",
    name: "Tagliatelle",
    italianName: "Le Tagliatelle",
    subtitle: "Massa longa em fitas, tradicional de Bolonha",
    products: [
      {
        id: "tagliatelle-ragu",
        name: "Tagliatelle al Ragù",
        italianName: "alla Bolognese",
        description:
          "A receita clássica de Bolonha. Ragù lentamente cozido com carne bovina, tomate San Marzano, vinho tinto e ervas. Finalizado com Parmigiano Reggiano.",
        price: 58.9,
        badge: "Clássico",
      },
      {
        id: "tagliatelle-salmone",
        name: "Tagliatelle al Salmone",
        italianName: "al Salmone",
        description:
          "Salmão fresco selado em manteiga de limão siciliano, creme de leite fresco, endro e raspas de limão. Toque sofisticado da cozinha do norte.",
        price: 72.9,
      },
      {
        id: "tagliatelle-alfredo",
        name: "Tagliatelle Alfredo",
        italianName: "al Burro e Parmigiano",
        description:
          "Manteiga italiana, creme de leite fresco e Parmigiano Reggiano envelhecido 24 meses. Simples, cremoso e inesquecível.",
        price: 54.9,
      },
    ],
  },
  {
    id: "tajarin",
    name: "Tajarin",
    italianName: "I Tajarin",
    subtitle: "Massa fina ao ovo, especialidade do Piemonte",
    products: [
      {
        id: "tajarin-ragu",
        name: "Tajarin al Ragù",
        italianName: "al Ragù di Carne",
        description:
          "Tajarin artesanal feito com gemas frescas, servido com ragù piemontês de carne bovina e suína cozido por horas em vinho Barolo.",
        price: 62.9,
      },
      {
        id: "tajarin-burro-salvia",
        name: "Tajarin Burro e Salvia",
        italianName: "al Burro e Salvia",
        description:
          "A forma mais tradicional de servir o Tajarin. Manteiga clarificada, folhas de sálvia fresca crocantes e Grana Padano.",
        price: 56.9,
        badge: "Tradição",
      },
      {
        id: "tajarin-tartufo",
        name: "Tajarin al Tartufo",
        italianName: "al Tartufo Nero",
        description:
          "A joia do Piemonte. Manteiga de trufa negra, lascas frescas de trufa e Parmigiano Reggiano. Para ocasiões especiais.",
        price: 98.9,
        badge: "Premium",
      },
    ],
  },
  {
    id: "pappardelle",
    name: "Pappardelle",
    italianName: "Le Pappardelle",
    subtitle: "Fitas largas toscanas, perfeitas para molhos encorpados",
    products: [
      {
        id: "pappardelle-ragu",
        name: "Pappardelle al Ragù",
        italianName: "al Ragù della Casa",
        description:
          "Fitas largas que abraçam o ragù da casa. Carne desfiada, tomate, cebola caramelizada e um toque de vinho tinto.",
        price: 59.9,
      },
      {
        id: "pappardelle-funghi",
        name: "Pappardelle ai Funghi",
        italianName: "ai Funghi Porcini",
        description:
          "Cogumelos porcini e Paris salteados em alho e azeite extra virgem, finalizados com creme de leite fresco e salsa.",
        price: 64.9,
      },
      {
        id: "pappardelle-pomodoro",
        name: "Pappardelle al Pomodoro",
        italianName: "al Pomodoro Fresco",
        description:
          "Tomates italianos San Marzano cozidos lentamente com manjericão fresco, alho e azeite. A simplicidade da Toscana.",
        price: 49.9,
      },
    ],
  },
  {
    id: "ravioli",
    name: "Ravioli",
    italianName: "I Ravioli",
    subtitle: "Massa recheada artesanal, fechada uma a uma",
    products: [
      {
        id: "ravioli-ricotta",
        name: "Ravioli di Ricotta e Spinaci",
        italianName: "Ricotta e Spinaci",
        description:
          "Recheio cremoso de ricota fresca e espinafre refogado, ao molho de manteiga, sálvia e Parmigiano. O ravioli mais clássico da Itália.",
        price: 64.9,
        badge: "Mais pedido",
      },
      {
        id: "ravioli-burro-salvia",
        name: "Ravioli Burro e Salvia",
        italianName: "al Burro e Salvia",
        description:
          "Ravioli de ricota servido com manteiga dourada e folhas de sálvia crocantes. A elegância da cozinha romana.",
        price: 62.9,
      },
      {
        id: "ravioli-quattro-formaggi",
        name: "Ravioli ai Quattro Formaggi",
        italianName: "ai Quattro Formaggi",
        description:
          "Recheio de ricota envolto em molho cremoso de Gorgonzola, Mozzarella, Parmigiano e Provolone. Para os apaixonados por queijo.",
        price: 68.9,
      },
    ],
  },
  {
    id: "cannelloni",
    name: "Cannelloni",
    italianName: "I Cannelloni",
    subtitle: "Tubos de massa recheada gratinados ao forno",
    products: [
      {
        id: "cannelloni-napoletana",
        name: "Cannelloni alla Napoletana",
        italianName: "alla Napoletana",
        description:
          "Cannelloni recheado com mistura de carne e queijos italianos, banhado em molho de tomate San Marzano e gratinado com mozzarella di bufala.",
        price: 66.9,
        badge: "Da casa",
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
        id: "san-pellegrino-limonata",
        name: "San Pellegrino Limonata",
        italianName: "Limonata",
        description:
          "Refrigerante italiano clássico de limão siciliano. 330ml.",
        price: 16.9,
        badge: "Italiano",
      },
      {
        id: "san-pellegrino-aranciata",
        name: "San Pellegrino Aranciata",
        italianName: "Aranciata",
        description:
          "Refrigerante italiano de laranja vermelha siciliana. 330ml.",
        price: 16.9,
        badge: "Italiano",
      },
      {
        id: "coca-cola",
        name: "Coca-Cola Lata",
        description: "Lata 350ml gelada.",
        price: 7.9,
      },
      {
        id: "coca-zero",
        name: "Coca-Cola Zero Lata",
        description: "Lata 350ml gelada, sem açúcar.",
        price: 7.9,
      },
      {
        id: "guarana",
        name: "Guaraná Antarctica",
        description: "Lata 350ml gelada.",
        price: 7.9,
      },
      {
        id: "h2o-limoneto",
        name: "H2O Limoneto",
        description: "Água sabor limão. Garrafa 500ml.",
        price: 8.9,
      },
      {
        id: "agua-com-gas",
        name: "Água Mineral com Gás",
        description: "Garrafa 500ml.",
        price: 6.5,
      },
      {
        id: "agua-sem-gas",
        name: "Água Mineral",
        description: "Sem gás. Garrafa 500ml.",
        price: 5.5,
      },
      {
        id: "suco-laranja",
        name: "Suco Del Valle Laranja",
        description: "Garrafa 450ml.",
        price: 9.9,
      },
      {
        id: "suco-uva",
        name: "Suco Del Valle Uva",
        description: "Garrafa 450ml.",
        price: 9.9,
      },
      {
        id: "suco-maracuja",
        name: "Suco Del Valle Maracujá",
        description: "Garrafa 450ml.",
        price: 9.9,
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
