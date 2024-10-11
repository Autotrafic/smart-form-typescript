import { autotraficApi } from '.';
import { TAccountingBusiness, TAccountingType } from '../interfaces/enums';

export async function logWebQuery() {
  const business = TAccountingBusiness.AutoTrafic;
  const accountingType = TAccountingType.ConsultaWeb;

  await autotraficApi.log.accounting({ business, accountingType });
}

export async function logOrderPurchased() {
  const business = TAccountingBusiness.AutoTrafic;
  const accountingType = TAccountingType.PedidoAds;

  await autotraficApi.log.accounting({ business, accountingType });
}
