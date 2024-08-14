import styled from "styled-components";
import Dropdown from "./Dropdown";
import COUNTRIES, { SPAIN } from "../../utils/countries";
import { useState } from "react";
import Input from "./Input";
import { processPhoneNumber } from "../../utils/formatter";

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

function PhoneNumberInput({ value, handleChange, ...rest }) {
  const [selectedCountry, setSelectedCountry] = useState(SPAIN);

  const formattedCountries = COUNTRIES.map((country) => {
    return { name: `${country.flag} ${country.name}`, value: country };
  });

  const handleChangeFlag = (value) => {
    const selectedFlag = JSON.parse(value);

    setSelectedCountry(selectedFlag);
  };

  const handleChangePhoneNumber = (e) => {
    handleChange(`${selectedCountry.phoneCode} ${e.target.value}`);
  };

  return (
    <Container>
      <CountryFlagContainer>
        <Dropdown
          title={`${selectedCountry.flag} ${selectedCountry.name}`}
          options={formattedCountries}
          value={selectedCountry.flag}
          handleChange={handleChangeFlag}
          defaultValue="ES"
          {...rest}
        />
      </CountryFlagContainer>
      <CountryInputContainer>
        <Input
          title={"Teléfono de contacto"}
          type={"number"}
          value={processPhoneNumber(value)}
          handleChange={handleChangePhoneNumber}
          fixedValue={selectedCountry?.phoneCode}
          {...rest}
        />
      </CountryInputContainer>
    </Container>
  );
}

export default PhoneNumberInput;
