import styled from "styled-components";
import { colors } from "../../utils/constants";

const Line = styled.hr`
  height: 1px !important;
  border: none !important;
  opacity: 0.6 !important;
  background-color: ${colors.placeholderGrey} !important;
  width: ${({ $isWide }) => ($isWide ? "100%" : "95%")} !important;
  margin: ${({ $isWide }) => ($isWide ? "10px auto 10px auto" : "15px 0px")} !important;
`;

function Separator({ isWide }) {
  return <Line $isWide={isWide} />;
}

export default Separator;
