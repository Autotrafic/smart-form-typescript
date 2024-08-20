import styled from "styled-components";
import { useState } from "react";
import { useDocuments } from "../context/documents";
import Title from "@modules/core/design-system/Title";
import DocumentsButtonGroup from "./utils/DocumentsButtonGroup";
import InputsGroupDocuments from "./multi-step-form";
import DocumentsLater from "./documents-later/DocumentsLater";

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

  @media (max-width: 476px) {
    padding: 1em 1.8em;
  }
`;

export default function Documents() {
  const { documentsData, updateDocumentsData } = useDocuments();
  const [step, setStep] = useState(1);
  const [isDocumentsLaterOpen, setIsDocumentsLaterOpen] = useState(false);

  return (
    <Container>
      {isDocumentsLaterOpen && (
        <DocumentsLater
          setIsDocumentsLaterOpen={setIsDocumentsLaterOpen}
          documentsData={documentsData}
        />
      )}

      <Title style={{ fontWeight: 600 }}>Documentos</Title>
      <DocumentsButtonGroup
        step={step}
        setStep={setStep}
        handleChange={updateDocumentsData}
      />
      <InputsGroupDocuments
        setStep={setStep}
        step={step}
        documentsData={documentsData}
        handleChange={updateDocumentsData}
        isDocumentsLaterOpen={isDocumentsLaterOpen}
        setIsDocumentsLaterOpen={setIsDocumentsLaterOpen}
      />
    </Container>
  );
}
