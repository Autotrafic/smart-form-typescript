import styled from 'styled-components';
import Dropdown from '../design-system/Dropdown';
import COUNTRIES, { SPAIN } from '../utils/countries';
import { useState } from 'react';
import Input from '../design-system/Input';
import { processPhoneNumber } from '../utils/formatter';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CountryFlagContainer = styled.div`
  width: 61px;
`;

const CountryInputContainer = styled.div`
  flex: 1;
`;

interface PhoneNumberInputProps {
  value: string;
  handleChange: (s: string) => void;
  isVisible?: boolean;
}

function PhoneNumberInput({ value, handleChange, ...rest }: PhoneNumberInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(SPAIN);

  const formattedCountries = COUNTRIES.map((country) => {
    return { name: `${country.flag} ${country.name}`, value: country };
  });

  const handleChangeFlag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFlag = JSON.parse(e.target.value);

    setSelectedCountry(selectedFlag);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(`${selectedCountry.phoneCode} ${e.target.value}`);
  };
  
  return (
    <Container>
      <CountryFlagContainer>
        <Dropdown
          title={`${selectedCountry.flag} ${selectedCountry.name}`}
          options={formattedCountries}
          value={selectedCountry.flag}
          isFilled={!!selectedCountry.flag}
          handleChange={handleChangeFlag}
          defaultValue="ES"
          disabled={false}
          {...rest}
        />
      </CountryFlagContainer>
      <CountryInputContainer>
        <Input
          title={'Teléfono de contacto'}
          type='number'
          value={processPhoneNumber(value)}
          handleChange={handleChangePhoneNumber}
          fixedValue={selectedCountry?.phoneCode}
          isSmall={false}
          {...rest}
        />
      </CountryInputContainer>
    </Container>
  );
}

export default PhoneNumberInput;
