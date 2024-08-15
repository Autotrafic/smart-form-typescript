import styled from 'styled-components';
import { colors } from '../../../utils/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  align-items: center;
  justify-content: center;
  margin: 0.3em 0 1.2em 0;

  @media (min-width: 476px) {
    margin: 0.5em 0 1em 0;
  }
`;

const TitleText = styled.span`
  color: ${colors.black};
  font-weight: 500;
  text-align: center;
  font-size: 18px;
  margin: 0;
`;

const BottomLine = styled.div`
  width: 64px;
  height: 5px;
  background-color: ${colors.primaryColor};
  border-radius: 2px;
`;

function Title({ children, ...props }) {
  return (
    <Container>
      <TitleText {...props}>{children}</TitleText>
      <BottomLine />
    </Container>
  );
}

export default Title;
