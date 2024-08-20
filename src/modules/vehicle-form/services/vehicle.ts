import type {
  ICarBrand,
  ICarBrandsResponse,
  ICarModel,
  ICarModelsResponse,
  IElectricMotorbike,
  IElectricMotorbikesResponse,
  IFuelsResponse,
  IMotorbike,
  IMotorbikesResponse,
  ICarBrandsResponseParsed,
  IFuelsResponseParsed,
  ICarModelsResponseParsed,
  IMotorbikesResponseParsed,
  IElectricMotorbikesResponseParsed,
} from '../interfaces/import';
import { Fuel } from '../interfaces/import/enums';

import { autotraficApi } from '@modules/core/utils/request';
import { sortDisplacements } from '../utils/functions';
import { formatFuelToRedeable } from '@modules/core/utils/formatter';
import { sortBrandsAlphabetically, sortModelsAlphabetically } from '../utils/formatter';

export async function fetchCarBrands(): Promise<ICarBrandsResponseParsed> {
  const carBrands: ICarBrandsResponse = await autotraficApi.vehicle.brands();
  const sortedBrands: ICarBrandsResponse = sortBrandsAlphabetically(carBrands);
  return sortedBrands.map((carBrand: ICarBrand) => ({ name: carBrand.brandName, value: carBrand.brandName }));
}

export async function fetchCarFuels(carYear: number, brandName: string): Promise<IFuelsResponseParsed> {
  const fuels: IFuelsResponse = await autotraficApi.vehicle.fuels({ carYear, brandName });
  return fuels.map((fuel: Fuel) => ({ name: formatFuelToRedeable(fuel), value: fuel }));
}

export async function fetchCarModels(carYear: number, brandName: string, fuel: Fuel): Promise<ICarModelsResponseParsed> {
  const models: ICarModelsResponse = await autotraficApi.vehicle.models({ carYear, brandName, fuel });
  const sortedModels: ICarModelsResponse = sortModelsAlphabetically(models);
  return sortedModels.map((model: ICarModel) => ({ name: model.modelName, value: JSON.stringify(model) }));
}

export async function fetchFuelMotorbikeCCs(): Promise<IMotorbikesResponseParsed> {
  const ccs: IMotorbikesResponse = await autotraficApi.vehicle.fuelCCs();
  const sortedCCs: IMotorbikesResponse = sortDisplacements(ccs);
  return sortedCCs.map((motorbike: IMotorbike) => ({ name: motorbike.cc, value: JSON.stringify(motorbike) }));
}

export async function fetchElectricMotorbikeCCs(): Promise<IElectricMotorbikesResponseParsed> {
  const ccs: IElectricMotorbikesResponse = await autotraficApi.vehicle.electricCCs();
  return ccs.map((motorbike: IElectricMotorbike) => ({
    name: JSON.stringify(motorbike.power),
    value: JSON.stringify(motorbike.value),
  }));
}
