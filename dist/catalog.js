'use strict';
// Transcribed from the owner's current menu. Prices intentionally excluded.
const TOPPINGS=['Banano','Fresa','Granola','Nuez','Almendra','Maní','Chía','Avena','Coco','Chispitas de chocolate (20 g)','Galleta de vainilla','Galleta de chocolate'];
const SYRUPS=['Dulce de leche','Leche condensada','Chocolate','Caramelo','Fresa','Miel de abeja','Mantequilla de maní','Sirope sugar free'];
const BOOSTS=[
 {name:'Proteína aislada de soya vainilla',protein:9,calories:60,note:'+9 g de proteína · +60 kcal'},
 {name:'Fibra de manzana o guayaba',fiber:5,calories:25,note:'+5 g de fibra · +25 kcal'},
 {name:'Proteína whey post workout',protein:12,calories:95,note:'+12 g de proteína · +95 kcal'},
 {name:'Colágeno hidrolizado Verisol',collagen:2.5,calories:20,note:'+2,5 g de colágeno · +20 kcal'}
];
const CATALOG={
  "batidos": {
    "name": "Batidos",
    "eyebrow": "HEALTHY MEAL SHAKES",
    "intro": "Proteína, sabor y una forma de vivir bien.",
    "prep": "2 min",
    "groups": [
      {
        "name": "Smart Shakes",
        "description": "Menos calorías, mismo sabor.",
        "size": "16 oz",
        "protein": 18,
        "calories": 150,
        "options": "boosts",
        "variants": [
          {
            "name": "Vainilla",
            "description": "Clásico sabor a vainilla.",
            "image": "vanilla",
            "photo": "assets/illustrations/batidos-0-0.webp",
            "thumbnail": "assets/illustrations/batidos-0-0-thumb.webp",
            "generated": true
          },
          {
            "name": "Fresa",
            "description": "Clásico sabor a fresa.",
            "image": "fresa",
            "photo": "assets/illustrations/batidos-0-1.webp",
            "thumbnail": "assets/illustrations/batidos-0-1-thumb.webp",
            "generated": true
          },
          {
            "name": "Dulce de leche",
            "description": "Sabor suave a dulce de leche.",
            "image": "dulce-leche",
            "photo": "assets/illustrations/batidos-0-2.webp",
            "thumbnail": "assets/illustrations/batidos-0-2-thumb.webp",
            "generated": true
          },
          {
            "name": "Creamy Banana",
            "description": "Sabor caramelo con banano.",
            "image": "creamy-banana",
            "photo": "assets/illustrations/batidos-0-3.webp",
            "thumbnail": "assets/illustrations/batidos-0-3-thumb.webp",
            "generated": true
          },
          {
            "name": "Coco",
            "description": "Vainilla, coco y canela.",
            "image": "coco",
            "photo": "assets/illustrations/batidos-0-4.webp",
            "thumbnail": "assets/illustrations/batidos-0-4-thumb.webp",
            "generated": true
          },
          {
            "name": "Choconuez",
            "description": "Chocolate, avellana y nuez.",
            "image": "choconuez",
            "photo": "assets/illustrations/batidos-0-5.webp",
            "thumbnail": "assets/illustrations/batidos-0-5-thumb.webp",
            "generated": true
          }
        ]
      },
      {
        "name": "Coffee Shakes",
        "description": "Batidos hechos con café.",
        "size": "16 oz",
        "protein": 18,
        "calories": 150,
        "options": "boosts",
        "variants": [
          {
            "name": "Coffee Lover",
            "description": "Vainilla, canela y café.",
            "image": "coffee-lover",
            "photo": "assets/illustrations/batidos-1-0.webp",
            "thumbnail": "assets/illustrations/batidos-1-0-thumb.webp",
            "generated": true
          },
          {
            "name": "Café Moka",
            "description": "Whey chocolate, chocoavellanas y café.",
            "image": "cafe-moka",
            "photo": "assets/illustrations/batidos-1-1.webp",
            "thumbnail": "assets/illustrations/batidos-1-1-thumb.webp",
            "generated": true
          },
          {
            "name": "Caramel Moka",
            "description": "Caramelo, chocolate y café.",
            "image": "caramel-moka",
            "photo": "assets/illustrations/batidos-1-2.webp",
            "thumbnail": "assets/illustrations/batidos-1-2-thumb.webp",
            "generated": true
          }
        ]
      },
      {
        "name": "Power Shakes",
        "description": "Más completos, más saciantes.",
        "size": "24 oz",
        "options": "boosts",
        "variants": [
          {
            "name": "Peanut Crunch",
            "description": "Sabor a maní con textura crujiente.",
            "protein": 31,
            "calories": 310,
            "photo": "assets/peanut-crunch-real.webp"
          },
          {
            "name": "Chocomani",
            "description": "Chocolate y maní.",
            "protein": 31,
            "calories": 310,
            "image": "chocomani",
            "photo": "assets/illustrations/batidos-2-1.webp",
            "thumbnail": "assets/illustrations/batidos-2-1-thumb.webp",
            "generated": true
          },
          {
            "name": "Crunchy Cookie",
            "description": "Sabor galleta y cacao con textura crujiente.",
            "protein": 31,
            "calories": 260,
            "image": "crunchy-cookie",
            "photo": "assets/illustrations/batidos-2-2.webp",
            "thumbnail": "assets/illustrations/batidos-2-2-thumb.webp",
            "generated": true
          },
          {
            "name": "Cheesecake Fresa",
            "description": "Sabor cheesecake de fresa con colágeno Verisol.",
            "protein": 29,
            "calories": 250,
            "image": "cheesecake",
            "tags": [
              "Con colágeno"
            ],
            "photo": "assets/illustrations/batidos-2-3.webp",
            "thumbnail": "assets/illustrations/batidos-2-3-thumb.webp",
            "generated": true
          },
          {
            "name": "Pie de limón",
            "description": "Sabor pie de limón con colágeno Verisol.",
            "protein": 29,
            "calories": 250,
            "image": "pie-limon",
            "tags": [
              "Con colágeno"
            ],
            "photo": "assets/illustrations/batidos-2-4.webp",
            "thumbnail": "assets/illustrations/batidos-2-4-thumb.webp",
            "generated": true
          },
          {
            "name": "Caramel Apple Pie",
            "description": "Sabor pastel de manzana con 5 g de fibra.",
            "protein": 27,
            "calories": 255,
            "fiber": 5,
            "image": "caramel-apple",
            "photo": "assets/illustrations/batidos-2-5.webp",
            "thumbnail": "assets/illustrations/batidos-2-5-thumb.webp",
            "generated": true
          },
          {
            "name": "Fit Mantequilla",
            "description": "Whey chocolate, crema de maní, BCAAs y glutamina.",
            "protein": 35,
            "calories": 410,
            "image": "fit-mantequilla",
            "tags": [
              "Post workout"
            ],
            "photo": "assets/illustrations/batidos-2-6.webp",
            "thumbnail": "assets/illustrations/batidos-2-6-thumb.webp",
            "generated": true
          }
        ]
      },
      {
        "name": "Fruta natural",
        "description": "Batidos con fruta natural en sus ingredientes.",
        "options": "boosts",
        "variants": [
          {
            "name": "Mora",
            "description": "Mora con galleta.",
            "size": "24 oz",
            "protein": 24,
            "calories": 225,
            "image": "mora-shake",
            "photo": "assets/illustrations/batidos-3-0.webp",
            "thumbnail": "assets/illustrations/batidos-3-0-thumb.webp",
            "generated": true
          },
          {
            "name": "Maracuyá",
            "description": "Sabor exótico y refrescante.",
            "size": "24 oz",
            "protein": 27,
            "calories": 230,
            "image": "maracuya-shake",
            "photo": "assets/illustrations/batidos-3-1.webp",
            "thumbnail": "assets/illustrations/batidos-3-1-thumb.webp",
            "generated": true
          },
          {
            "name": "Piña colada",
            "description": "Piña tropical con trocitos de coco.",
            "size": "24 oz",
            "protein": 27,
            "calories": 270,
            "image": "pina-colada",
            "photo": "assets/illustrations/batidos-3-2.webp",
            "thumbnail": "assets/illustrations/batidos-3-2-thumb.webp",
            "generated": true
          },
          {
            "name": "Açaí y pitaya",
            "description": "Fruta natural. Delicioso y refrescante.",
            "protein": 27,
            "calories": 230,
            "image": "acai-pitaya",
            "photo": "assets/illustrations/batidos-3-3.webp",
            "thumbnail": "assets/illustrations/batidos-3-3-thumb.webp",
            "generated": true
          }
        ]
      }
    ]
  },
  "refreshers": {
    "name": "Refreshers",
    "eyebrow": "DRINKS COLLECTION",
    "intro": "Frescura y buen gusto, a tu manera.",
    "prep": "2 min",
    "groups": [
      {
        "name": "Specials Drinks",
        "description": "Menos calorías, mismo sabor.",
        "size": "32 oz",
        "variants": [
          {
            "name": "Green Detox",
            "description": "Batido verde con piña, pepino, apio, hierbabuena y espinaca; té verde, fibra y aloe.",
            "image": "special-drinks",
            "extraNote": "Podés pedirlo con 9 g de proteína extra.",
            "photo": "assets/illustrations/refreshers-0-0.webp",
            "thumbnail": "assets/illustrations/refreshers-0-0-thumb.webp",
            "generated": true
          },
          {
            "name": "Detox Maracuyá",
            "description": "Maracuyá con té verde, fibra y aloe.",
            "image": "special-drinks",
            "extraNote": "Podés pedirlo con 9 g de proteína extra.",
            "photo": "assets/illustrations/refreshers-0-1.webp",
            "thumbnail": "assets/illustrations/refreshers-0-1-thumb.webp",
            "generated": true
          },
          {
            "name": "Detox Mango",
            "description": "Mango con té verde, fibra y aloe.",
            "image": "special-drinks",
            "extraNote": "Podés pedirlo con 9 g de proteína extra.",
            "photo": "assets/illustrations/refreshers-0-2.webp",
            "thumbnail": "assets/illustrations/refreshers-0-2-thumb.webp",
            "generated": true
          },
          {
            "name": "Beauty Booster",
            "description": "Proteína, colágeno Verisol y vitamina C.",
            "protein": 17,
            "carbs": 5,
            "image": "special-drinks",
            "photo": "assets/illustrations/refreshers-0-3.webp",
            "thumbnail": "assets/illustrations/refreshers-0-3-thumb.webp",
            "generated": true
          },
          {
            "name": "Original Fruit Punch",
            "description": "Proteína, colágeno, electrolitos, té verde y guaraná.",
            "protein": 7.5,
            "calories": 120,
            "image": "special-drinks",
            "photo": "assets/original-fruit-punch-real.webp",
            "thumbnail": "assets/original-fruit-punch-thumb.webp"
          },
          {
            "name": "Tropical Glow",
            "description": "Sabor tropical con aloe vera de mandarina, fibra de guayaba y colágeno.",
            "image": "special-drinks",
            "tags": [
              "Sin cafeína"
            ],
            "photo": "assets/illustrations/refreshers-0-5.webp",
            "thumbnail": "assets/illustrations/refreshers-0-5-thumb.webp",
            "generated": true
          }
        ]
      },
      {
        "name": "Protein Iced",
        "description": "Clásicos fríos con proteína.",
        "size": "24 oz",
        "variants": [
          {
            "name": "Protein Iced Chai",
            "description": "Té chai frío con proteína.",
            "protein": 14,
            "image": "iced-chai",
            "photo": "assets/illustrations/refreshers-1-0.webp",
            "thumbnail": "assets/illustrations/refreshers-1-0-thumb.webp",
            "generated": true
          },
          {
            "name": "Protein Iced Moka",
            "description": "Sabor café y chocolate. El menú lo presenta sin leche y sin azúcar.",
            "protein": 17,
            "image": "iced-moka",
            "tags": [
              "Sin leche",
              "Sin azúcar"
            ],
            "photo": "assets/illustrations/refreshers-1-1.webp",
            "thumbnail": "assets/illustrations/refreshers-1-1-thumb.webp",
            "generated": true
          },
          {
            "name": "Protein Iced Matcha",
            "description": "Matcha con proteína y fibra.",
            "protein": 9,
            "image": "iced-matcha",
            "photo": "assets/illustrations/refreshers-1-2.webp",
            "thumbnail": "assets/illustrations/refreshers-1-2-thumb.webp",
            "generated": true
          }
        ]
      },
      {
        "name": "Bebidas funcionales",
        "description": "Colección de bebidas de 500 ml.",
        "size": "500 ml",
        "tags": [
          "Sin azúcar",
          "Gluten free"
        ],
        "variants": [
          {
            "name": "Relax Mint",
            "description": "Menta, lavanda, bálsamo de limón, aloe, pasiflora y manzanilla.",
            "image": "relax-mint",
            "photo": "assets/illustrations/refreshers-2-0.webp",
            "thumbnail": "assets/illustrations/refreshers-2-0-thumb.webp",
            "generated": true
          },
          {
            "name": "Detox Digest",
            "description": "Té verde, fibra y aloe.",
            "image": "detox-digest",
            "photo": "assets/illustrations/refreshers-2-1.webp",
            "thumbnail": "assets/illustrations/refreshers-2-1-thumb.webp",
            "generated": true
          },
          {
            "name": "Hybro Reset",
            "description": "Magnesio, potasio, aloe y vitaminas B1 y B12, con proteína.",
            "protein": 15,
            "image": "hybro-reset",
            "photo": "assets/illustrations/refreshers-2-2.webp",
            "thumbnail": "assets/illustrations/refreshers-2-2-thumb.webp",
            "generated": true
          },
          {
            "name": "Beauty Glow",
            "description": "Colágeno, aloe, biotina, zinc, selenio, manzanilla y vitaminas A, C y E.",
            "photo": "assets/beauty-glow-real.webp"
          },
          {
            "name": "Mega Energy",
            "description": "Guaraná, ginseng, té orange pekoe, aloe, vitaminas C, B6 y B12, y biotina.",
            "photo": "assets/mega-energy-real.webp"
          }
        ]
      }
    ]
  },
  "bowls": {
    "name": "Bowls",
    "eyebrow": "PROTEIN BOWLS",
    "intro": "Tu estilo de vida, cucharada a cucharada.",
    "prep": "8–10 min",
    "groups": [
      {
        "name": "Protein Bowls",
        "description": "Bowl a base de batido nutricional, proteína y fruta en la mezcla. Incluye 3 toppings.",
        "protein": 18,
        "calories": 150,
        "tags": [
          "Sin leche",
          "Gluten free"
        ],
        "options": "toppings",
        "note": "Valores publicados para la línea Protein Bowls. Los toppings pueden modificar los valores.",
        "variants": [
          {
            "name": "Banano caramelo",
            "description": "Sabor banano y caramelo.",
            "image": "bowl-reference",
            "photo": "assets/illustrations/bowls-0-0.webp",
            "thumbnail": "assets/illustrations/bowls-0-0-thumb.webp",
            "generated": true
          },
          {
            "name": "Chocobanano",
            "description": "Sabor chocolate y banano.",
            "image": "bowl-reference",
            "photo": "assets/illustrations/bowls-0-1.webp",
            "thumbnail": "assets/illustrations/bowls-0-1-thumb.webp",
            "generated": true
          },
          {
            "name": "Maracuyá",
            "description": "Sabor maracuyá. Elegí tus tres toppings para hacerlo a tu manera.",
            "photo": "assets/bowl-maracuya.webp"
          },
          {
            "name": "Mora",
            "description": "Sabor mora.",
            "image": "bowl-reference",
            "photo": "assets/illustrations/bowls-0-3.webp",
            "thumbnail": "assets/illustrations/bowls-0-3-thumb.webp",
            "generated": true
          },
          {
            "name": "Açaí y pitaya",
            "description": "Sabor açaí y pitaya.",
            "image": "bowl-reference",
            "photo": "assets/illustrations/bowls-0-4.webp",
            "thumbnail": "assets/illustrations/bowls-0-4-thumb.webp",
            "generated": true
          }
        ]
      },
      {
        "name": "Avenas",
        "description": "Snack a base de avena, batido nutricional y proteína. Incluye 3 toppings.",
        "protein": 20,
        "calories": 200,
        "options": "toppings",
        "note": "Valores publicados para la línea Avenas. Los toppings pueden modificar los valores.",
        "variants": [
          {
            "name": "Vainilla",
            "description": "Avena con sabor a vainilla.",
            "image": "avena",
            "photo": "assets/illustrations/bowls-1-0.webp",
            "thumbnail": "assets/illustrations/bowls-1-0-thumb.webp",
            "generated": true
          },
          {
            "name": "Chocolate",
            "description": "Avena con sabor a chocolate.",
            "image": "avena",
            "photo": "assets/illustrations/bowls-1-1.webp",
            "thumbnail": "assets/illustrations/bowls-1-1-thumb.webp",
            "generated": true
          }
        ]
      }
    ]
  },
  "waffles": {
    "name": "Waffles",
    "eyebrow": "HEALTHY PROTEIN SNACKS",
    "intro": "El arte de cuidarte con buen gusto.",
    "prep": "8–10 min",
    "groups": [
      {
        "name": "Protein Waffles",
        "description": "Waffles a base de proteína. Elegí un sirope incluido.",
        "protein": 28,
        "calories": 200,
        "tags": [
          "Gluten free",
          "Sin azúcar"
        ],
        "options": "syrups",
        "note": "Valores publicados para la línea Protein Waffles. Las combinaciones y el sirope pueden modificar los valores.",
        "variants": [
          {
            "name": "Churro",
            "description": "Maní y proteína en polvo.",
            "image": "waffle",
            "photo": "assets/illustrations/waffle-churro.webp",
            "thumbnail": "assets/illustrations/waffles-0-0-thumb.webp",
            "generated": true
          },
          {
            "name": "Banana",
            "description": "Banano y maní.",
            "photo": "assets/waffle-banana.webp"
          },
          {
            "name": "Aloha",
            "description": "Banano, maní, fresas y coco.",
            "image": "waffle",
            "photo": "assets/illustrations/waffles-0-2.webp",
            "thumbnail": "assets/illustrations/waffles-0-2-thumb.webp",
            "generated": true
          },
          {
            "name": "Full House",
            "description": "Banano, maní, fresas, coco, chispas de chocolate, almendras y mantequilla de maní.",
            "photo": "assets/waffle-full-house.webp"
          }
        ]
      },
      {
        "name": "Fit Cake",
        "description": "Muffin de chocolate.",
        "protein": 15,
        "calories": 180,
        "size": "1 muffin",
        "tags": [
          "Sin huevo"
        ],
        "variants": [
          {
            "name": "Fit Cake",
            "description": "Muffin proteico sabor a chocolate, con trocitos de maní y chocolate amargo.",
            "image": "fit-cake",
            "photo": "assets/illustrations/waffles-1-0.webp",
            "thumbnail": "assets/illustrations/waffles-1-0-thumb.webp",
            "generated": true
          }
        ]
      },
      {
        "name": "Protein Mini Donuts",
        "description": "Surtido gourmet de 4 minidonas. Consultá disponibilidad.",
        "protein": 16,
        "calories": 200,
        "size": "4 minidonas",
        "tags": [
          "Harina gluten free"
        ],
        "variants": [
          {
            "name": "Protein Mini Donuts",
            "description": "Minidonas a base de proteína. Cada dona contiene 4 g de proteína.",
            "image": "mini-donuts",
            "photo": "assets/illustrations/waffles-2-0.webp",
            "thumbnail": "assets/illustrations/waffles-2-0-thumb.webp",
            "generated": true
          }
        ]
      }
    ]
  }
};
