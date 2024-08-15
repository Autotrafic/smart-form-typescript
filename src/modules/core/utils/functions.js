import { CICLOMOTOR_VALUE, ELEMENT_TO_SCROLL_ID } from '../utils/constants';
import { autonomousCommunities } from './data';

export function getCommunityByCode(code) {
  const community = autonomousCommunities.find((c) => c.value === code);
  return community ? community.name : 'CCAA';
}

export const checkIsCiclomotor = (vehicleData) => {
  return vehicleData.vehicleType === 2 && vehicleData.cc.value === CICLOMOTOR_VALUE;
};

export function scrollToNextStep() {
  const elementToScroll = document.getElementById(ELEMENT_TO_SCROLL_ID);

  if (elementToScroll && window.innerWidth < 600) {
    elementToScroll.scrollIntoView({ behavior: 'smooth' });
  }
}
