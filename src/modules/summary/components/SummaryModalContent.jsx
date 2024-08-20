import styled from "styled-components";
import Title from "@modules/core/design-system/Title";
import { getCommunityByCode } from "@modules/core/utils/functions";
import { CICLOMOTOR_VALUE } from "@modules/core/utils/constants";
import { colors } from "@modules/core/utils/styles";

const LEGENDS = [
  {
    title: "Precio tablas",
    description:
      "Es el precio que se encuentra en las tablas establecidas en el BOE y especifican el valor de adquisición en euros de todos los vehículos que han sido puestos a la venta en algún momento.",
  },
  {
    title: "% Depreciación",
    description:
      "Los vehículos experimentan una depreciación a medida que envejecen. Dicha depreciación también está normalizada por el gobierno, aplicando el mismo porcentaje de depreciación a todos los vehículos.",
  },
  {
    title: "% ITP CCAA",
    description:
      "Cada comunidad autónoma aplica su porcentaje de transmisiones patrimoniales, que varía entre un 4% y un 8%.",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
width: 100%;
    display: flex;
    flex-direction-column;
    justify-content: center;
    align-items: center;
    gap: 1.5em;
    flex-direction: column;
    margin-bottom: 1em;
    max-width: 100%;
`;

const TaxContainer = styled.div`
  width: 100%;
  padding: 15px;
  background-color: ${colors.secondaryGrey};
  border-radius: 5px;
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${colors.black};
`;

const Breakdown = styled.ul`
  margin: 0;
  overflow: hidden;
  width: 100%;
  padding: 0;
`;

const BreakdownItem = styled.li`
  margin-top: 3px;
  width: 100%;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BreakdownItemText = styled.span`
  font-size: 15px;
  color: ${colors.black};
  list-style: none;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
`;

const BoldText = styled.span`
  font-size: 15px;
  color: ${colors.black};
  font-weight: 600;
  list-style: none;
`;

const LegendItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  gap: 0.2em;
`;

const NoWrapText = styled.span`
  white-space: nowrap;
`;

function SummaryModalContent({ data }) {

  const vehicleData = data.vehicleForm;
  const itpData = data.itp;

  const deprecation = (itpData.valorDepreciacion * 100).toFixed();
  const itpCCAA = itpData.imputacionItp * 100;
  const brand = vehicleData.brand;

  const { modelName } = vehicleData.vehicleType === 1 && vehicleData.model;
  const { value: motorbikeValue } = vehicleData.vehicleType === 2 && vehicleData.cc;

  let vehicle;
  let vehicleValue;
  if (vehicleData.vehicleType === 1) {
    vehicle = modelName ? `${brand} ${modelName}` : "---";
    vehicleValue = vehicleData.model.value ?? "---";
  } else if (vehicleData.vehicleType === 2 && motorbikeValue === CICLOMOTOR_VALUE) {
    vehicle = "Ciclomotor";
    vehicleValue = vehicleData.cc.value ?? "---";
  } else if (vehicleData.vehicleType === 2 && motorbikeValue !== CICLOMOTOR_VALUE) {
    vehicle = "Motocicleta";
    vehicleValue = vehicleData.cc.value ?? "---";
  } else if (vehicleData.vehicleType === 3) {
    vehicle = "Caravana/Remolque";
  }

  const totalITP = itpData.ITP;
  const buyerCommunity = `% ITP ${getCommunityByCode(vehicleData.buyerCommunity)}`;

  const breakdownItems = [
    { title: "Vehículo", content: vehicle },
    { title: "Precio tablas", content: vehicleValue },
    { title: "% Depreciación", content: deprecation ?? "---" },
    { title: buyerCommunity, content: itpCCAA ?? "---" },
  ];

  return (
    <Container>
      <Title>Impuesto de transmisiones</Title>
      <ContentWrapper>
        <Description>
          El Impuesto de Transmisiones Patrimoniales (ITP) es un gravamen que debe ser pagado por el
          adquirente al momento de realizar la transferencia de propiedad de un vehículo de un
          particular a otro.
        </Description>
        <Description>
          Este impuesto se determina mediante la aplicación de una tasa, que difiere dependiendo de
          la comunidad autónoma en la que reside el comprador, al valor que resulte mayor entre el
          convenido en la compraventa y el valor venal del automóvil, establecido en las tablas
          proporcionadas por la Agencia Tributaria.
        </Description>
      </ContentWrapper>
      <Title>Cálculo del impuesto</Title>
      <ContentWrapper>
        <TaxContainer>
          <Description>
            <span>( Precio tablas ) X </span>
            <NoWrapText>( % Depreciación ) X </NoWrapText>{" "}
            <NoWrapText>( % ITP CCAA ) = </NoWrapText>
            <b>ITP</b>
          </Description>
        </TaxContainer>
        <Breakdown>
          {breakdownItems.map((item) => (
            <BreakdownItem key={item.title}>
              <BreakdownItemText>{item.title}:</BreakdownItemText>
              <BreakdownItemText style={{ textAlign: "end" }}>{item.content}</BreakdownItemText>
            </BreakdownItem>
          ))}
          <BreakdownItem>
            <BoldText>Total ITP:</BoldText>
            <BoldText>{totalITP ?? 0}</BoldText>
          </BreakdownItem>
        </Breakdown>
      </ContentWrapper>
      <Title>Leyenda</Title>
      <ContentWrapper>
        {LEGENDS.map((legend) => (
          <LegendItem key={legend.title}>
            <BoldText>{legend.title}:</BoldText>
            <BreakdownItemText>{legend.description}</BreakdownItemText>
          </LegendItem>
        ))}
      </ContentWrapper>
    </Container>
  );
}

export default SummaryModalContent;
