import styled from "styled-components";
import FileInput from "../../reusable/FileInput";
import { colors } from "../../../utils/constants";
import { useState } from "react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../reusable/Input";
import PhoneNumberInput from "../../reusable/PhoneNumberInput";
import { processInputFile } from "../../../utils/formatter";

const InputsGroupStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0 100px;
  z-index: 1;
`;

const ImageTypeMessage = styled.p`
  font-size: 12px;
  margin: 3px 0 10px 0;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: ${(props) => (props.$errorShown ? "10px" : "30px")};
`;

const InputsLabel = styled.p`
  font-size: 14px;
  margin: 3px;
`;

const BottomButtonsStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NextButtonStyled = styled.button`
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
const BackButtonStyled = styled.button`
  padding: 10px 10px !important;
  border: 1px solid ${colors.primaryColor} !important;
  border-radius: 5px !important;
  color: ${colors.primaryColor} !important;
  background-color: white !important;
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

const SmallText = styled.p`
  font-size: 11px;
  margin: 0;
`;

export default function BuyerInputsDocuments({
  setStep,
  step,
  documentsData,
  handleChange,
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
    handleNextClick();
  };

  const handleNextClick = () => {
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
      handleChange((prev) => ({ ...prev, documentGroup: step + 1 }));
      setStep(step + 1);
    }
  };

  const handleBackClick = () => {
    handleChange((prev) => ({ ...prev, documentGroup: step - 1 }));
    setStep(step - 1);
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
                dniFrontalBuyer: processInputFile(
                  e.target.files[0],
                  "DNI Comprador Frontal"
                ),
              }))
            }
            propertyToModify="dniFrontalBuyer"
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
                dniBackBuyer: processInputFile(
                  e.target.files[0],
                  "DNI Comprador Trasero"
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
            value={documentsData.buyerPhone}
            handleChange={(phoneNumber) =>
              handleChange((prev) => ({ ...prev, buyerPhone: phoneNumber }))
            }
          />
        </div>

        <div>
          <InputsLabel>
            Dirección de envío del nuevo permiso <br />{" "}
            <SmallText>(Calle, Número - piso - puerta, Localidad)</SmallText>
          </InputsLabel>
          <Input
            isVisible
            style={{ margin: 0 }}
            required
            value={documentsData.shippingAdress}
            handleChange={(e) =>
              handleChange((prev) => ({
                ...prev,
                shippingAdress: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <InputsLabel>Código Postal</InputsLabel>
          <Input
            isVisible
            style={{ margin: 0 }}
            minLength="5"
            maxLength="5"
            type="number"
            width={"50%"}
            required
            value={documentsData.postalCode}
            handleChange={(e) =>
              handleChange((prev) => ({
                ...prev,
                postalCode: e.target.value,
              }))
            }
          />
        </div>
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
      <BottomButtonsStyled>
        <BackButtonStyled type="button" onClick={handleBackClick}>
          Atrás
        </BackButtonStyled>
        <NextButtonStyled type="submit">Siguiente</NextButtonStyled>
      </BottomButtonsStyled>
    </InputsGroupStyled>
  );
}
