import { ECiclomotorPrices, EDefaultPrices } from './enums';

export interface ISummaryItem {
  name: 'Tasas DGT' | 'IVA' | 'Gestión';
  price: EDefaultPrices | ECiclomotorPrices;
}
