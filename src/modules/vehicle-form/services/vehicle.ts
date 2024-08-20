import type {
  ICarBrand,
  CarBrandsResponse,
  ICarModel,
  CarModelsResponse,
  IElectricMotorbike,
  ElectricMotorbikesResponse,
  FuelsResponse,
  IMotorbike,
  MotorbikesResponse,
} from '../interfaces/import';
import { Fuel } from '../interfaces/import/enums';

import { autotraficApi } from '@modules/core/utils/request';
import { sortDisplacements } from '../utils/functions';
import { formatFuelToRedeable } from '@modules/core/utils/formatter';
import { sortBrandsAlphabetically, sortModelsAlphabetically } from '../utils/formatter';

export async function fetchCarBrands() {
  const carBrands: CarBrandsResponse = await autotraficApi.vehicle.brands();
  const sortedBrands: CarBrandsResponse = sortBrandsAlphabetically(carBrands);
  return sortedBrands.map((carBrand: ICarBrand) => ({ name: carBrand.brandName, value: carBrand.brandName }));
}

export async function fetchCarFuels(carYear: number, brandName: string) {
  const fuels: FuelsResponse = await autotraficApi.vehicle.fuels({ carYear, brandName });
  return fuels.map((fuel: Fuel) => ({ name: formatFuelToRedeable(fuel), value: fuel }));
}

export async function fetchCarModels(carYear: number, brandName: string, fuel: Fuel) {
  const models: CarModelsResponse = await autotraficApi.vehicle.models({ carYear, brandName, fuel });
  const sortedModels: CarModelsResponse = sortModelsAlphabetically(models);
  return sortedModels.map((model: ICarModel) => ({ name: model.modelName, value: JSON.stringify(model) }));
}

export async function fetchFuelMotorbikeCCs() {
  const ccs: MotorbikesResponse = await autotraficApi.vehicle.fuelCCs();
  const sortedCCs: MotorbikesResponse = sortDisplacements(ccs);
  return sortedCCs.map((motorbike: IMotorbike) => ({ name: motorbike.cc, value: JSON.stringify(motorbike) }));
}

export async function fetchElectricMotorbikeCCs() {
  const ccs: ElectricMotorbikesResponse = await autotraficApi.vehicle.electricCCs();
  return ccs.map((motorbike: IElectricMotorbike) => ({ name: motorbike.power, value: motorbike.value }));
}
