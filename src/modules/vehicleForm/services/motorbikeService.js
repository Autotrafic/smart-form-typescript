import { sortDisplacements } from "../../../utils/formatter";
import { apiVehiclesRequest } from "../../../utils/request";

export const fetchFuelMotorbikeCCs = async () => {
  const ccs = await apiVehiclesRequest("fuel-ccs");
  const sortedCCs = sortDisplacements(ccs);
  return sortedCCs.map((cc) => ({ name: cc.cc, value: JSON.stringify(cc) }));
};

export const fetchElectricMotorbikeCCs = async () => {
  const ccs = await apiVehiclesRequest("electric-ccs");
  return ccs.map((cc) => ({ name: cc.power, value: cc.value }));
};
