import type {
  CarBrand,
  CarBrandsResponse,
  CarModel,
  CarModelsResponse,
  ElectricMotorbike,
  ElectricMotorbikesResponse,
  FuelsResponse,
  Motorbike,
  MotorbikesResponse,
} from '../interfaces/import';
import { Fuel } from '../interfaces/import/enums';
import { apiVehiclesRequest } from '../../core/utils/request';
import { sortDisplacements } from '../utils/functions';
import { formatFuelToRedeable } from '../../core/utils/formatter';
import { sortBrandsAlphabetically, sortModelsAlphabetically } from '../utils/formatter';

export async function fetchCarBrands() {
  const carBrands: CarBrandsResponse = await apiVehiclesRequest('brands');
  const sortedBrands: CarBrandsResponse = sortBrandsAlphabetically(carBrands);
  return sortedBrands.map((carBrand: CarBrand) => ({ name: carBrand.brandName, value: carBrand.brandName }));
}

export async function fetchCarFuels(carYear: number, brandName: string) {
  const fuels: FuelsResponse = await apiVehiclesRequest(`fuels`, { carYear, brandName }, 'POST');
  return fuels.map((fuel: Fuel) => ({ name: formatFuelToRedeable(fuel), value: fuel }));
}

export async function fetchCarModels(carYear: number, brandName: string, fuel: Fuel) {
  const models: CarModelsResponse = await apiVehiclesRequest(`models`, { carYear, brandName, fuel }, 'POST');
  const sortedModels: CarModelsResponse = sortModelsAlphabetically(models);
  return sortedModels.map((model: CarModel) => ({ name: model.modelName, value: JSON.stringify(model) }));
}

export async function fetchFuelMotorbikeCCs() {
  const ccs: MotorbikesResponse = await apiVehiclesRequest('fuel-ccs');
  const sortedCCs: MotorbikesResponse = sortDisplacements(ccs);
  return sortedCCs.map((motorbike: Motorbike) => ({ name: motorbike.cc, value: JSON.stringify(motorbike) }));
}

export async function fetchElectricMotorbikeCCs() {
  const ccs: ElectricMotorbikesResponse = await apiVehiclesRequest('electric-ccs');
  return ccs.map((motorbike: ElectricMotorbike) => ({ name: motorbike.power, value: motorbike.value }));
}
