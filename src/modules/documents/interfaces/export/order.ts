export default interface IUpdateOrderNestedPropertiesBody {
  vehicle: { vechiclePlate: string };
  buyer?: { phoneNumber: string };
  seller?: { phoneNumber: string };
  user?: { shipmentAddress: string };
}
