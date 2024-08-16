import { AutonomousCommunityValue } from '../../vehicle-form/interfaces/import/enums';

export const months = [
  { name: 'Enero', value: 1 },
  { name: 'Febrero', value: 2 },
  { name: 'Marzo', value: 3 },
  { name: 'Abril', value: 4 },
  { name: 'Mayo', value: 5 },
  { name: 'Junio', value: 6 },
  { name: 'Julio', value: 7 },
  { name: 'Agosto', value: 8 },
  { name: 'Sptiembre', value: 9 },
  { name: 'Octubre', value: 10 },
  { name: 'Noviembre', value: 11 },
  { name: 'Diciembre', value: 12 },
];

export const autonomousCommunities: AutonomousCommunity[] = [
  { name: 'Andalucía', value: AutonomousCommunityValue.ANDALUCIA },
  { name: 'Aragón', value: AutonomousCommunityValue.ARAGON },
  { name: 'Asturias', value: AutonomousCommunityValue.ASTURIAS },
  { name: 'Canarias', value: AutonomousCommunityValue.CANARIAS },
  { name: 'Cantabria', value: AutonomousCommunityValue.CANTABRIA },
  { name: 'Castilla y la Mancha', value: AutonomousCommunityValue.CASTILLA_LA_MANCHA },
  { name: 'Castilla y León', value: AutonomousCommunityValue.CASTILLA_LEON },
  { name: 'Cataluña', value: AutonomousCommunityValue.CATALUNA },
  { name: 'Extremadura', value: AutonomousCommunityValue.EXTREMADURA },
  { name: 'Galicia', value: AutonomousCommunityValue.GALICIA },
  { name: 'Islas Baleares', value: AutonomousCommunityValue.ISLAS_BALEARES },
  { name: 'La Rioja', value: AutonomousCommunityValue.LA_RIOJA },
  { name: 'Madrid', value: AutonomousCommunityValue.MADRID },
  { name: 'Murcia', value: AutonomousCommunityValue.MURCIA },
  { name: 'Navarra', value: AutonomousCommunityValue.NAVARRA },
  { name: 'País Vasco', value: AutonomousCommunityValue.PAIS_VASCO },
  { name: 'Valencia', value: AutonomousCommunityValue.VALENCIA },
];

interface AutonomousCommunity {
  name: string;
  value: AutonomousCommunityValue;
}
