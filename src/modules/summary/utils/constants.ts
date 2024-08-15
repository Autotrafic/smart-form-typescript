const DEFAULT_PRICES = {
    TASAS_DGT: 55.70,
    IVA: 10.20,
    PROFIT: 68.75,
  };
  
  const CICLOMOTOR_PRICES = {
    TASAS_DGT: 27.85,
    IVA: 13.03,
    PROFIT: 55.07,
  };
  
  export const DEFAULT_SUMMARY_ITEMS = [
    { name: "Tasas DGT", price: DEFAULT_PRICES.TASAS_DGT },
    { name: "IVA", price: DEFAULT_PRICES.IVA },
    { name: "Gestión", price: DEFAULT_PRICES.PROFIT },
  ];
  
  export const CICLOMOTOR_SUMMARY_ITEMS = [
    { name: "Tasas DGT", price: CICLOMOTOR_PRICES.TASAS_DGT },
    { name: "IVA", price: CICLOMOTOR_PRICES.IVA },
    { name: "Gestión", price: CICLOMOTOR_PRICES.PROFIT },
  ];

  export const CROSS_PRODUCTS = [
    {
      title: "Añadir informe DGT",
      description: "¡Conoce las cargas y el historial del vehículo!",
      price: 11.95,
      type: 1,
      id: "informeDgt",
    },
    {
      title: "Añadir etiqueta ambiental",
      image: "https://www.autofacil.es/wp-content/uploads/2020/12/etiquetac.jpg",
      price: 7.95,
      type: 2,
      id: "etiquetaMedioambiental",
    },
  ];