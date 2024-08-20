import { autotraficApi } from '@modules/core/utils/request';
import { formatSubmitDataForItp } from '../utils/formatter';

export const fetchItpPrice = async (formData) => {
  const orderData = formatSubmitDataForItp(formData);
  const itpData = await autotraficApi.vehicle.calculateItp(orderData);
  return itpData;
};
