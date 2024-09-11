export default interface IUpdateOrderNestedPropertiesBody {
  generalData: {
    vehicle: { vechiclePlate: string };
    buyer?: { phoneNumber: string };
    seller?: { phoneNumber: string };
    user?: { shipmentAddress: { street: string; city: string; postalCode: string } };
  };
}
