import { TAccountingBusiness, TAccountingType } from '../enums';

export interface LogAccountingBody {
  business: TAccountingBusiness;
  accountingType: TAccountingType;
}
