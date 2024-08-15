import { useState } from "react";
import styled from "styled-components";
import Input from "../../core/design-system/Input";
import {
  BillForm,
  ItemContent,
  ItemTitle,
  ResumeItem,
  ResumeList,
} from "./CheckoutStyles";
import ResumeTitle from "./ResumeTitle";
import { useOrderData } from "../../core/context/orderData";
import { colors } from "../../core/utils/styles";

const Button = styled.button`
  width: 100% !important;
  color: #fff !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 5px 10px !important;
  background-color: ${colors.primaryColor} !important;
  border-radius: 4px !important;
  font-size: 13px !important;
  border: 0 !important;
  cursor: pointer !important;
`;

function UserResume({ userBillCompleted, setUserBillCompleted }) {
  const { orderData, updateOrderData } = useOrderData();

  const [billData, setBillData] = useState(orderData?.billData);

  const handleSubmitBillInfo = (e) => {
    e.preventDefault();
    updateOrderData((prev) => ({ ...prev, billData }));
    setUserBillCompleted(true);
  };

  return (
    <>
      <ResumeTitle
        title="Introduce tus datos:"
        hideLink={!userBillCompleted}
        handleLink={() => setUserBillCompleted(false)}
      />
      {userBillCompleted ? (
        <ResumeList>
          <ResumeItem>
            <ItemTitle>Nombre completo:</ItemTitle>
            <ItemContent>{orderData.billData.fullName}</ItemContent>
          </ResumeItem>
          <ResumeItem>
            <ItemTitle>Correo electrónico:</ItemTitle>
            <ItemContent>{orderData.billData.email}</ItemContent>
          </ResumeItem>
        </ResumeList>
      ) : (
        <BillForm onSubmit={handleSubmitBillInfo}>
          <Input
            isVisible
            isSmall
            title="Nombre y apellidos"
            value={billData?.fullName}
            onChange={(e) =>
              setBillData((prevState) => ({
                ...prevState,
                fullName: e.target.value,
              }))
            }
          />
          <Input
            isVisible
            isSmall
            type="email"
            title="Correo electrónico"
            value={billData?.email}
            onChange={(e) =>
              setBillData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
          <Button type="submit">Gurardar</Button>
        </BillForm>
      )}
    </>
  );
}

export default UserResume;
