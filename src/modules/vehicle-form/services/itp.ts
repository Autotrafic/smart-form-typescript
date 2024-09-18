import { autotraficApi } from '@modules/core/services';
import { formatSubmitDataForItp } from '../utils/formatter';
import { IVehicleFormData } from '../interfaces';
import { ITPResponse } from '../interfaces/import';

export const fetchItpPrice = async (formData: IVehicleFormData): Promise<ITPResponse> => {
  const orderData = formatSubmitDataForItp(formData);
  const itpData = await autotraficApi.vehicle.calculateItp(orderData);
  return itpData;
};
