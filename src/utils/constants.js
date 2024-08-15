const prodApiUrl = "https://api.autotrafic.es";
const localApiUrl = "http://localhost:3100";

export const BASE_API_URL = prodApiUrl;

export const TRANSFERENCE_CAR_PRICE = 129.95;
export const TRANSFERENCE_CICLOMOTOR_PRICE = 94.95;

export const NOTIFICATIONS_EMAIL = "notificaciones.autotrafic@gmail.com";
export const AUTOTRAFIC_EMAIL = "gestoria.autotrafic@gmail.com";

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

export const CICLOMOTOR_VALUE = 800;

export const ELEMENT_TO_SCROLL_ID = "form-section";



export const STEPS = {
  VEHICLE_DATA: 1,
  SUMMARY: 2,
  CHECKOUT: 3,
  CHECKOUT_MESSAGE: 4,
  DOCUMENTS: 5,
  FINAL_MESSAGE: 6,
  DOCUMENTS_LATER_MESSAGE: 7,
};

export const VEHICLES = {
  CAR: 1,
  MOTORBIKE: 2,
  CARAVAN: 3,
};

export const colors = {
  black: "#111111",
  primaryColor: "#4154F1",
  secondaryColor: "#8080FF",
  primaryGrey: "#787878",
  secondaryGrey: "rgb(230, 230, 230, 40)",
  placeholderGrey: "rgb(118, 118, 118)",
  lightGrey: "#ccc",
  primaryGreen: "#30C03A",
  errorRed: "#CA2020",
};

export const months = [
  { name: "Enero", value: 1 },
  { name: "Febrero", value: 2 },
  { name: "Marzo", value: 3 },
  { name: "Abril", value: 4 },
  { name: "Mayo", value: 5 },
  { name: "Junio", value: 6 },
  { name: "Julio", value: 7 },
  { name: "Agosto", value: 8 },
  { name: "Sptiembre", value: 9 },
  { name: "Octubre", value: 10 },
  { name: "Noviembre", value: 11 },
  { name: "Diciembre", value: 12 },
];

export const demoOptions = [
  { name: "Uno", value: 1 },
  { name: "Dos", value: 2 },
  { name: "Tres", value: 3 },
  { name: "Cuatro", value: 4 },
  { name: "Cinco", value: 5 },
];

export const autonomousCommunities = [
  { name: "Andalucía", value: "AND" },
  { name: "Aragón", value: "ARA" },
  { name: "Asturias", value: "AST" },
  { name: "Canarias", value: "CANA" },
  { name: "Cantabria", value: "CANT" },
  { name: "Castilla y la Mancha", value: "CASM" },
  { name: "Castilla y León", value: "CASL" },
  { name: "Cataluña", value: "CAT" },
  { name: "Extremadura", value: "EXT" },
  { name: "Galicia", value: "GAL" },
  { name: "Islas Baleares", value: "BAL" },
  { name: "La Rioja", value: "RIO" },
  { name: "Madrid", value: "MAD" },
  { name: "Murcia", value: "MUR" },
  { name: "Navarra", value: "NAV" },
  { name: "País Vasco", value: "PVA" },
  { name: "Valencia", value: "VAL" },
];
