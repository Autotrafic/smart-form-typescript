import { formatFuelToRedeable, formatToFullDate } from '@modules/core/utils/formatter';
import { ItemContent, ItemTitle, ResumeItem, ResumeList } from './CheckoutStyles';
import ResumeTitle from './ResumeTitle';
import { IVehicleFormData } from '@modules/vehicle-form/interfaces';
import { VehicleType } from '@modules/vehicle-form/interfaces/enums';

interface VehicleResumeProps {
  vehicleData: IVehicleFormData;
  handleLink: () => void;
}

interface DynamicItem {
  title: string;
  content: string;
}

function VehicleResume({ vehicleData, handleLink }: VehicleResumeProps) {
  const { vehicle } = vehicleData;
  let dynamicItems: DynamicItem[] = [];

  if (vehicle.type === VehicleType.CAR) {
    dynamicItems = [
      { title: 'Marca', content: vehicle.brand },
      { title: 'Modelo', content: vehicle.model.modelName },
      { title: 'Combustible', content: formatFuelToRedeable(vehicle.fuel) },
    ];
  } else if (vehicle.type === VehicleType.MOTORBIKE) {
    dynamicItems = [{ title: 'Cilindrada', content: vehicle.cc }];
  }

  const items = [
    { title: 'Tipo trámite', content: 'Transferencia de vehículo' },
    ...dynamicItems,
    { title: 'Fecha de matriculación', content: formatToFullDate(vehicleData.registrationDate) },
  ];

  return (
    <>
      <ResumeTitle title="Vehículo" handleLink={handleLink} />

      <ResumeList>
        {items.map((item) => (
          <ResumeItem key={item.title}>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemContent>{item.content}</ItemContent>
          </ResumeItem>
        ))}
      </ResumeList>
    </>
  );
}

export default VehicleResume;
