import React, { useState } from "react";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "@modules/core/utils/styles";

const Container = styled.div`
  margin-top: 5px;
  padding-left: 1.5em;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer !important;
`;

const CollapseButton = styled.button`
  background-color: transparent !important;
  padding: 0; !important;
  border: none !important;
  cursor: pointer !important;
  margin-right: 10px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center;
  border-radius: 5px;
`;

const TitleBreakdown = styled.label`
  font-size: 15px;
  color: ${colors.black};
  cursor: pointer;
`;

const BreakdownList = styled.ul`
  padding-left: 1em;
  margin: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  ${(props) =>
    props.isVisible
      ? css`
          max-height: 500px;
        `
      : css`
          max-height: 0;
        `};
`;

const BreakDownItem = styled.li`
  margin-top: 3px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BreakdownItemTitle = styled.div``;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  color: ${colors.black};
  margin: 0;
  height: 18px;
`;

const BreakdownItemText = styled.span`
  font-size: 15px;
  color: ${colors.black};
  list-style: none;
  min-width: 60px;
  text-align: right;
`;

function SummaryBreakdown({ items }) {

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Container>
      <TitleContainer>
        <CollapseButton id="includes" onClick={toggleVisibility}>
          <Icon icon={isVisible ? faAngleDown : faAngleRight} size="lg" color={colors.black} />
        </CollapseButton>
        <TitleBreakdown htmlFor="includes">Viene incluído:</TitleBreakdown>
      </TitleContainer>
      <BreakdownList isVisible={isVisible}>
        {items.map((item) => (
          <BreakDownItem key={item.name}>
            <BreakdownItemTitle>
              <BreakdownItemText>{item.name}</BreakdownItemText>
            </BreakdownItemTitle>
            <BreakdownItemText>{item.price} €</BreakdownItemText>
          </BreakDownItem>
        ))}
      </BreakdownList>
    </Container>
  );
}

export default SummaryBreakdown;
