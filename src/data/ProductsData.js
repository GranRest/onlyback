const products = [
  {
    name: "Arveja 500 G",
    description:
      "Cereal verde claro, sabor y olor característico de arveja y de textura lisa al tacto",
    img: "https://www.supermaxi.com/wp-content/uploads/2021/06/7861042500377.png",
    dimensions: "8",
    weight: "500 G",
    price: 1.69,
    createAt: "2023-11-01",
    modified_at: null,
    deleted_at: null,
    productCategory: {
      id: 6,
    },
    discount: {
      id: 3,
    },
    reviews: null,
    productInventory: {
      id: 22,
    },
    longdesc:
      "La fibra de la arveja es soluble en agua, promueven el buen funcionamiento intestinal y ayudan a eliminar las grasas saturadas, Aportan al organismo, vitaminas del complejo B y A, y betacarotenos, que actúan en contra de los radicales libres, encargados del envejecimiento prematuro.",
    sku: "1105251468",
  },
  {
    name: "Aceite De Soya Fino 900 Ml",
    description:
      "Aceite de soya Fino (900 ml) Aceite 100% de soya Contiene Omega 3",
    img: "https://www.supermaxi.com/wp-content/uploads/2021/06/7861042562672.png",
    dimensions: "8",
    weight: "900 Ml",
    price: 3.69,
    createAt: "2023-11-01",
    modified_at: null,
    deleted_at: null,
    productCategory: {
      id: 6,
    },
    discount: {
      id: 3,
    },
    reviews: null,
    productInventory: {
      id: 23,
    },
    longdesc:
      "100% puro. Acite natural libre de colesterol. Consulte la información nutricional para conocer el contenido de grasas y grasas saturadas.",
    sku: "1232251468",
  },
];

export default class ProductData {
  static getAllProducts() {
    return products;
  }
}
