import styled from 'styled-components';
import { colors } from '../../../utils/constants';
import { PRIVACY_URL, TERMS_URL } from '../../../utils/links';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2em;
  margin-bottom: 0.5em;
`;

const Checkbox = styled.input`
  width: 20px !important;
  height: 21px !important;
  background-color: #fff !important;
  padding: 0 !important;
  margin: 0 !important;
`;

const LegalPhrase = styled.span`
  font-size: 13px;
  color: ${colors.primaryGrey};
`;

const Link = styled.a`
  text-decoration: none;
  font-size: 13px;
  cursor: pointer;
  color: ${colors.primaryColor} !important;
`;

function LegalCheckbox({ value, handleChange }) {
  return (
    <Container>
      <Checkbox type="checkbox" id="legal" required checked={!!value} onChange={handleChange} />
      <label htmlFor="legal">
        <LegalPhrase>He leído y acepto los </LegalPhrase>
        <Link href={TERMS_URL} target="_blank">
          términos de uso
        </Link>
        <LegalPhrase> y </LegalPhrase>
        <Link href={PRIVACY_URL} target="_blank">
          privacidad
        </Link>
      </label>
    </Container>
  );
}

export default LegalCheckbox;
