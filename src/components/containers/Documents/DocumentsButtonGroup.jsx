import styled from "styled-components";
import DocumentsButton from "./DocumentsButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  gap: 0.3em;
  justify-content: center;
  align-items: center;
  @media (min-width: 476px) {
    gap: 0.8em;
    margin-bottom: 20px;
  }
`;

const ArrowRight = styled(FontAwesomeIcon)`
  color: #444444;
  width: 20px;
  height: 30px;
`;

export default function DocumentsButtonGroup({ handleChange, setStep, step }) {
  const handleChangeDocumentType = (value) => {
    handleChange((prev) => ({ ...prev, documentType: value }));
  };

  return (
    <div>
      <Container>
        <DocumentsButton
          type={1}
          selected={step === 1}
          handleChange={handleChangeDocumentType}
          setStep={setStep}
        />
        <ArrowRight icon={faArrowRight} />
        <DocumentsButton
          type={2}
          selected={step === 2}
          handleChange={handleChangeDocumentType}
          setStep={setStep}
        />
        <ArrowRight icon={faArrowRight} />
        <DocumentsButton
          type={3}
          selected={step === 3}
          handleChange={handleChangeDocumentType}
          setStep={setStep}
        />
      </Container>
    </div>
  );
}
