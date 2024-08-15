import styled from "styled-components";
import { colors, styles } from "../../core/utils/styles";

const Container = styled.div`
  margin-bottom: 0.9em;
`;

const Title = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: ${colors.black};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Link = styled.span`
  ${styles.link}
`;

const Line = styled.div`
  width: 40px;
  height: 2px;
  border-radius: 2px;
  background-color: ${colors.primaryColor};
  margin-top: 2px;
`;

function ResumeTitle({ title, hideLink, handleLink }) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        {!hideLink && <Link onClick={handleLink}>Editar</Link>}
      </Header>
      <Line />
    </Container>
  );
}

export default ResumeTitle;
