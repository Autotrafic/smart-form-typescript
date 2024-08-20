import { formatFuelToRedeable, formatToFullDate } from "@modules/core/utils/formatter";
import { ItemContent, ItemTitle, ResumeItem, ResumeList } from "./CheckoutStyles";
import ResumeTitle from "./ResumeTitle";

function VehicleResume({ vehicleData, handleLink }) {
  let dynamicItems = [];

  if (vehicleData?.vehicleType === 1) {
    dynamicItems = [
      { title: "Marca", content: vehicleData?.brand },
      { title: "Modelo", content: vehicleData?.model?.modelName },
      { title: "Combustible", content: formatFuelToRedeable(vehicleData?.fuel) },
    ];
  } else if (vehicleData?.vehicleType === 2) {
    dynamicItems = [{ title: "Cilindrada", content: vehicleData.cc.cc }];
  }

  const items = [
    { title: "Tipo trámite", content: "Transferencia de vehículo" },
    ...dynamicItems,
    { title: "Fecha de matriculación", content: formatToFullDate(vehicleData?.registrationDate) },
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
