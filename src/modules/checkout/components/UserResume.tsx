import { useState } from 'react';
import styled from 'styled-components';
import Input from '@modules/core/design-system/Input';
import { BillForm, ItemContent, ItemTitle, ResumeItem, ResumeList } from './CheckoutStyles';
import ResumeTitle from './ResumeTitle';
import { useOrderData } from '@modules/core/context/orderData';
import { colors } from '@modules/core/utils/styles';

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

interface UserResume {
  isUserBillCompleted: boolean;
  setIsUserBillCompleted: (newValue: boolean) => void;
}

function UserResume({ isUserBillCompleted, setIsUserBillCompleted }: UserResume) {
  const { orderData, updateOrderData } = useOrderData();

  const [billData, setBillData] = useState(orderData?.billData);

  const handleSubmitBillInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateOrderData((prev) => ({ ...prev, billData }));
    setIsUserBillCompleted(true);
  };

  return (
    <>
      <ResumeTitle
        title="Introduce tus datos:"
        hideLink={!isUserBillCompleted}
        handleLink={() => setIsUserBillCompleted(false)}
      />
      {isUserBillCompleted ? (
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
            type="text"
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBillData((prevState) => ({
                ...prevState,
                fullName: e.target.value,
              }))
            }
          />
          <Input
            isVisible
            isSmall
            type="text"
            title="Correo electrónico"
            value={billData?.email}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
