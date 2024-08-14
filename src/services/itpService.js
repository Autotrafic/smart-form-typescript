import { formatSubmitDataForItp } from "../utils/formatter";
import { apiVehiclesRequest } from "../utils/request";

export const fetchItpPrice = async (formData) => {
  const orderData = formatSubmitDataForItp(formData);
  const itpData = await apiVehiclesRequest("itp", { orderData }, "POST");
  return itpData;
};
