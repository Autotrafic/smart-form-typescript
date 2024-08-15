import styled from "styled-components";
import FileInput from "../../../core/design-system/FileInput";
import { useState } from "react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PhoneNumberInput from "../../../core/components/PhoneNumberInput";
import processInputFile from "../../utils/formatter";
import { colors } from "../../../core/utils/styles";

const InputsGroupStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0 100px;
`;

const ImageTypeMessage = styled.p`
  font-size: 12px;
  margin: 3px 0 10px 0;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: ${(props) => (props.$errorShown ? "40px" : "50px")};
`;

const SendDocumentsLaterContainer = styled.div`
  margin-top: 20px;
`;

const InputsLabel = styled.p`
  font-size: 14px;
  margin: 3px;
`;

const WithoutDocumentsButton = styled.div`
  background-color: white;
  border: 1px solid #e36d00;
  border-radius: 4px;
  color: #e36d00;
  padding: 5px 5px;
  font-size: 13px;
  width: 125px;
  &:hover {
    transition: 0.1s;
    border: 1.5px solid #e36d00;
    cursor: pointer;
  }
`;

const ButtonStyled = styled.button`
  align-self: flex-end !important;
  padding: 10px 10px !important;
  background-color: ${colors.primaryColor} !important;
  border: none !important;
  border-radius: 5px !important;
  color: #fff !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  display: inline-block !important;
  cursor: pointer !important;
  width: 120px !important;
`;

const ErrorWarning = styled.div`
  border: 2px solid ${colors.errorRed};
  border-radius: 3px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorWarningText = styled.p`
  font-size: 12px;
  margin: 5px 6px;
  color: ${colors.errorRed};
  font-weight: bold;
`;

const ExclamationIcon = styled(FontAwesomeIcon)`
  color: ${colors.errorRed};
  width: 18px;
  height: 18px;
  margin: 5px 4px 5px 8px;
`;

export default function SellerInputsDocuments({
  setStep,
  step,
  documentsData,
  handleChange,
  setIsDocumentsLaterOpen,
}) {
  const [files, setFiles] = useState({ dniFrontal: null, dniBack: null });
  const [showErrorMessage, setShowErrorMessage] = useState({
    dniFrontal: false,
    dniBack: false,
  });

  const handleFrontal = (file) => {
    setFiles((prevState) => ({
      ...prevState,
      dniFrontal: file,
    }));
    setShowErrorMessage((prevState) => ({
      ...prevState,
      dniFrontal: false,
    }));
  };

  const handleBack = (file) => {
    setFiles((prevState) => ({
      ...prevState,
      dniBack: file,
    }));
    setShowErrorMessage((prevState) => ({
      ...prevState,
      dniBack: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!files.dniFrontal && !files.dniBack) {
      setShowErrorMessage({ dniFrontal: true, dniBack: true });
    }
    if (!files.dniFrontal) {
      setShowErrorMessage((prevState) => ({
        ...prevState,
        dniFrontal: true,
      }));
    }
    if (!files.dniBack) {
      setShowErrorMessage((prevState) => ({
        ...prevState,
        dniBack: true,
      }));
    }

    if (files.dniFrontal && files.dniBack) {
      setShowErrorMessage(false);
      setStep(step + 1);
    }
  };

  return (
    <InputsGroupStyled onSubmit={handleSubmit}>
      <ImageTypeMessage>
        *Sólo se aceptan archivos de tipo imagen y PDF
      </ImageTypeMessage>
      <InputsContainer
        $errorShown={showErrorMessage.dniFrontal || showErrorMessage.dniBack || ""}
      >
        <div>
          <InputsLabel>DNI/NIE Parte frontal</InputsLabel>
          <FileInput
            id="dni-front"
            file={files.dniFrontal}
            handleFile={handleFrontal}
            handleChangeFile={(e) =>
              handleChange((prev) => ({
                ...prev,
                dniFrontalSeller: processInputFile(
                  e.target.files[0],
                  "DNI Vendedor Frontal"
                ),
              }))
            }
          />
        </div>
        <div>
          <InputsLabel>DNI/NIE Parte trasera</InputsLabel>
          <FileInput
            id="dni-back"
            file={files.dniBack}
            handleFile={handleBack}
            handleChangeFile={(e) =>
              handleChange((prev) => ({
                ...prev,
                dniBackSeller: processInputFile(
                  e.target.files[0],
                  "DNI Vendedor Trasero"
                ),
              }))
            }
          />
        </div>

        <div>
          <InputsLabel>Número de teléfono</InputsLabel>
          <PhoneNumberInput
            style={{ margin: 0 }}
            isVisible
            required
            value={documentsData.sellerPhone}
            handleChange={(phoneNumber) =>
              handleChange((prev) => ({ ...prev, sellerPhone: phoneNumber }))
            }
          />
        </div>
        <SendDocumentsLaterContainer>
          <InputsLabel>¿No puedes enviar los documentos ahora?</InputsLabel>

          <WithoutDocumentsButton onClick={() => setIsDocumentsLaterOpen(true)}>
            Enviar más tarde
          </WithoutDocumentsButton>
        </SendDocumentsLaterContainer>
      </InputsContainer>
      {showErrorMessage.dniFrontal && showErrorMessage.dniBack && (
        <ErrorWarning>
          <ExclamationIcon icon={faTriangleExclamation} />
          <ErrorWarningText>
            Por favor, adjunta todos los documentos requeridos.
          </ErrorWarningText>
        </ErrorWarning>
      )}
      {showErrorMessage.dniFrontal && !showErrorMessage.dniBack && (
        <ErrorWarning>
          <ExclamationIcon icon={faTriangleExclamation} />
          <ErrorWarningText>
            Por favor, adjunta una imagen de la parte frontal de tu DNI/NIE.
          </ErrorWarningText>
        </ErrorWarning>
      )}
      {showErrorMessage.dniBack && !showErrorMessage.dniFrontal && (
        <ErrorWarning>
          <ExclamationIcon icon={faTriangleExclamation} />
          <ErrorWarningText>
            Por favor, adjunta una imagen de la parte trasera de tu DNI/NIE.
          </ErrorWarningText>
        </ErrorWarning>
      )}

      <ButtonStyled type="submit">Siguiente</ButtonStyled>
    </InputsGroupStyled>
  );
}
