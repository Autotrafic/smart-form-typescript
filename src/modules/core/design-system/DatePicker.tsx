import React, { useEffect } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { colors } from '../utils/styles';
import { months } from '../utils/data';
import { IVehicleFormData } from '@modules/vehicle-form/interfaces';
import { DayInMonth } from '../interfaces';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1.5em;
`;

const Label = styled.div`
  margin-bottom: 0.4em;
  color: ${colors.black};
  font-size: 14px;
`;

interface DatePickerProps {
  formData: IVehicleFormData;
  updateFormData: (setStateFunc: (prevOrder: IVehicleFormData) => IVehicleFormData) => void;
}

function DatePicker({ updateFormData, formData, ...props }: DatePickerProps) {
  const { day, month, year } = formData.date;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({ name: currentYear - i, value: currentYear - i }));

  const updateDaysInMonth = (month: string, year: string): DayInMonth[] => {
    const days = new Date(Number(year), Number(month), 0).getDate();

    return Array.from({ length: days }, (_, i) => {
      return { name: i + 1, value: i + 1 };
    });
  };

  useEffect(() => {
    if (month && year) {
      const daysInMonth: DayInMonth[] = updateDaysInMonth(month, year);
      updateFormData((prev: IVehicleFormData) => ({ ...prev, daysInMonth: daysInMonth }));

      if (!daysInMonth.some((dayInMonth: DayInMonth) => dayInMonth.value === Number(day))) {
        updateFormData((prev: IVehicleFormData) => ({ ...prev, date: { ...prev.date, day: '' } }));
      }
    }
  }, [month, year]);

  useEffect(() => {
    if (month && year && day)
      updateFormData((prev: IVehicleFormData) => ({
        ...prev,
        registrationDate: `${day}/${month}/${year}`,
      }));
  }, [month, year, day]);

  return (
    <div>
      <Label>Fecha de matriculación:</Label>
      <Container>
        <Dropdown
          title="Año"
          options={years}
          value={year && year}
          isFilled={!!year}
          handleChange={(e) =>
            updateFormData((prev: IVehicleFormData) => ({ ...prev, date: { ...prev.date, year: e.target.value } }))
          }
          isVisible
          disabled={false}
          {...props}
        />
        <Dropdown
          title="Mes"
          options={months}
          value={month && month}
          isFilled={!!month}
          handleChange={(e) =>
            updateFormData((prev: IVehicleFormData) => ({ ...prev, date: { ...prev.date, month: e.target.value } }))
          }
          isVisible
          fontSize="12px"
          disabled={false}
          {...props}
        />
        <Dropdown
          title="Día"
          options={formData.daysInMonth}
          value={day && day}
          isFilled={!!day}
          disabled={false}
          handleChange={(e) =>
            updateFormData((prev: IVehicleFormData) => ({ ...prev, date: { ...prev.date, day: e.target.value } }))
          }
          isVisible
          {...props}
        />
      </Container>
    </div>
  );
}

export default DatePicker;
