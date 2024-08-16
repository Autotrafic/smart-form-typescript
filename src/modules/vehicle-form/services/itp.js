import { request } from '../../core/utils/request';
import { formatSubmitDataForItp } from '../utils/formatter';

export const fetchItpPrice = async (formData) => {
  const orderData = formatSubmitDataForItp(formData);
  const itpData = await request.vehicle.calculateItp(orderData);
  return itpData;
};
