import { formDataInitialState } from '@modules/vehicle-form/utils/initialStates';
import { IMultiStepContext } from '../interfaces';
import { Steps } from '../interfaces/enums';
import { IOrder, ICrossSelling, IITP, IOrderPrices, IBillData, IOrderDataContext } from '../interfaces/order';
import { TRANSFERENCE_CAR_PRICE } from './constants';
import { createId } from '@paralleldrive/cuid2';

export const multiStepContextInitialState: IMultiStepContext = {
  updateCurrentStep(newStep) {},
  currentStep: Steps.VEHICLE_FORM,
};

const itpInitialState: IITP = {
  ITP: 0,
  valorFiscal: 0,
  imputacionItp: 0,
  valorDepreciacion: 0,
};

const orderPricesInitialState: IOrderPrices = {
  basePrice: TRANSFERENCE_CAR_PRICE,
  totalPrice: TRANSFERENCE_CAR_PRICE,
  highTicketOrderFee: 0,
  referralDiscount: 0,
};

const crossSellingInitialState: ICrossSelling = {
  etiquetaMedioambiental: false,
  informeDgt: false,
};

const billDataInitialState: IBillData = {
  fullName: '',
  email: '',
};

export const defaultOrderData: IOrder = {
  orderId: createId(),
  isProduction: true,
  isReferralValid: false,
  vehicleForm: formDataInitialState,
  itp: itpInitialState,
  prices: orderPricesInitialState,
  crossSelling: crossSellingInitialState,
  billData: billDataInitialState,
};

export const orderDataContextInitialState: IOrderDataContext = {
  updateOrderData() {},
  orderData: defaultOrderData,
  isBillDataFilled: false,
};
