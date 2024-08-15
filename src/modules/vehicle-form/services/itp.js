import { apiVehiclesRequest } from "../../core/utils/request";
import { formatSubmitDataForItp } from "../utils/formatter";

export const fetchItpPrice = async (formData) => {
  const orderData = formatSubmitDataForItp(formData);
  const itpData = await apiVehiclesRequest("itp", { orderData }, "POST");
  return itpData;
};
