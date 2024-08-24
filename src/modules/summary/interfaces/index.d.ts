import { ECiclomotorPrices, EDefaultPrices } from './enums';

export interface ISummaryItem {
  name: 'Tasas DGT' | 'IVA' | 'Gestión';
  price: EDefaultPrices | ECiclomotorPrices;
}

export interface CrossSelected {
  etiquetaMedioambiental: boolean;
  informeDgt: boolean;
}

export interface CrossProduct {
  title: 'Añadir informe DGT' | 'Añadir etiqueta ambiental';
  price: number;
  type: 1 | 2;
  id: keyof CrossSelected;
  image?: string;
  description?: string;
}