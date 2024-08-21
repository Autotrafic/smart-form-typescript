import { IVehicleFormData } from '@modules/vehicle-form/interfaces';
import { CICLOMOTOR_VALUE, ELEMENT_TO_SCROLL_ID } from './constants';
import { autonomousCommunities } from './data';
import { VehicleType } from '@modules/vehicle-form/interfaces/enums';

export function getCommunityByCode(code: string): string {
  const community = autonomousCommunities.find((c) => c.value === code);
  return community ? community.name : 'CCAA';
}

export const checkIsCiclomotor = (formData: IVehicleFormData): boolean => {
  const { vehicle } = formData;
  return vehicle.type === VehicleType.MOTORBIKE && vehicle.value === CICLOMOTOR_VALUE;
};

export function scrollToNextStep() {
  const elementToScroll = document.getElementById(ELEMENT_TO_SCROLL_ID);

  if (elementToScroll && window.innerWidth < 600) {
    elementToScroll.scrollIntoView({ behavior: 'smooth' });
  }
}
