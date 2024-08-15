import React, { useEffect } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { colors } from '../utils/styles';
import { months } from '../utils/data';

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

function DatePicker({ updateFormData, value, ...props }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => {
    return { name: currentYear - i, value: currentYear - i };
  });

  const updateDaysInMonth = (month, year) => {
    const days = new Date(year, month, 0).getDate();
    return Array.from({ length: days }, (_, i) => {
      return { name: i + 1, value: i + 1 };
    });
  };

  useEffect(() => {
    // updateFormData((prev) => {
    //   console.log(prev);
    // });
    if (value.date.month && value.date.year) {
      const days = updateDaysInMonth(value.date.month, value.date.year);
      updateFormData((prev) => (prev ? { ...prev, daysInMonth: days } : { daysInMonth: days }));
      if (!days.some((day) => day.value === Number(value.date.day))) {
        updateFormData((prev) => (prev ? { ...prev, date: { ...prev.date, day: '' } } : { day: '' }));
      }
    }
  }, [value.date.month, value.date.year]);

  useEffect(() => {
    if (value.date.month && value.date.year && value.date.day)
      updateFormData((prev) => ({
        ...prev,
        registrationDate: `${value.date.day}/${value.date.month}/${value.date.year}`,
      }));
  }, [value.date.month, value.date.year, value.date.day]);

  return (
    <div>
      <Label>Fecha de matriculación:</Label>
      <Container>
        <Dropdown
          title="Año"
          options={years}
          value={value.date.year && value.date.year}
          handleChange={(value) =>
            updateFormData((prev) => (prev ? { ...prev, date: { ...prev.date, year: value } } : { year: value }))
          }
          {...props}
        />
        <Dropdown
          title="Mes"
          options={months}
          value={value.date.month && value.date.month}
          handleChange={(value) =>
            updateFormData((prev) => (prev ? { ...prev, date: { ...prev.date, month: value } } : { month: value }))
          }
          fontSize="12px"
          {...props}
        />
        <Dropdown
          title="Día"
          options={value?.daysInMonth}
          value={value.date.day && +value.date.day}
          handleChange={(value) =>
            updateFormData((prev) => (prev ? { ...prev, date: { ...prev.date, day: value } } : { day: value }))
          }
          {...props}
        />
      </Container>
    </div>
  );
}

export default DatePicker;
