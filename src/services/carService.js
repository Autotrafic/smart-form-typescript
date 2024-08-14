import { apiVehiclesRequest } from "../utils/request";
import {
  formatFuelToRedeable,
  sortModelsAlphabetically,
  sortBrandsAlphabetically,
} from "../utils/formatter";

export const fetchCarBrands = async () => {
  const carBrands = await apiVehiclesRequest("brands");
  const sortedBrands = sortBrandsAlphabetically(carBrands);
  return sortedBrands.map((carBrand) => ({ name: carBrand.brandName, value: carBrand.brandName }));
};

export const fetchCarFuels = async (carYear, brandName) => {
  const fuels = await apiVehiclesRequest(`fuels`, { carYear, brandName }, "POST");
  return fuels.map((fuel) => ({ name: formatFuelToRedeable(fuel), value: fuel }));
};

export const fetchCarModels = async (carYear, brandName, fuel) => {
  const models = await apiVehiclesRequest(`models`, { carYear, brandName, fuel }, "POST");
  const sortedModels = sortModelsAlphabetically(models);
  return sortedModels.map((model) => ({ name: model.modelName, value: JSON.stringify(model) }));
};
