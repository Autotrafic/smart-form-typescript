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
import { Fuel } from '../../core/interfaces/import/enums';

import { request } from '../../core/utils/request';
import { sortDisplacements } from '../utils/functions';
import { formatFuelToRedeable } from '../../core/utils/formatter';
import { sortBrandsAlphabetically, sortModelsAlphabetically } from '../utils/formatter';

export async function fetchCarBrands() {
  const carBrands: CarBrandsResponse = await request.vehicle.brands();
  const sortedBrands: CarBrandsResponse = sortBrandsAlphabetically(carBrands);
  return sortedBrands.map((carBrand: ICarBrand) => ({ name: carBrand.brandName, value: carBrand.brandName }));
}

export async function fetchCarFuels(carYear: number, brandName: string) {
  const fuels: FuelsResponse = await request.vehicle.fuels({ carYear, brandName });
  return fuels.map((fuel: Fuel) => ({ name: formatFuelToRedeable(fuel), value: fuel }));
}

export async function fetchCarModels(carYear: number, brandName: string, fuel: Fuel) {
  const models: CarModelsResponse = await request.vehicle.models({ carYear, brandName, fuel });
  const sortedModels: CarModelsResponse = sortModelsAlphabetically(models);
  return sortedModels.map((model: ICarModel) => ({ name: model.modelName, value: JSON.stringify(model) }));
}

export async function fetchFuelMotorbikeCCs() {
  const ccs: MotorbikesResponse = await request.vehicle.fuelCCs();
  const sortedCCs: MotorbikesResponse = sortDisplacements(ccs);
  return sortedCCs.map((motorbike: IMotorbike) => ({ name: motorbike.cc, value: JSON.stringify(motorbike) }));
}

export async function fetchElectricMotorbikeCCs() {
  const ccs: ElectricMotorbikesResponse = await request.vehicle.electricCCs();
  return ccs.map((motorbike: IElectricMotorbike) => ({ name: motorbike.power, value: motorbike.value }));
}
