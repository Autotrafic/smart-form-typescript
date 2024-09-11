import styled from 'styled-components';
import Title from '@modules/core/design-system/Title';

export default function Documents() {
  return (
    <Container>
      <Title style={{ fontWeight: 600 }}>Documentos</Title>
      
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0.5em 1.4em 1.6em 1.4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6em;
  background-color: #f7f7f7;
  position: relative;
  overflow: hidden;
  min-height: 40rem;

  @media (max-width: 476px) {
    padding: 1em 1.8em;
  }
`;
