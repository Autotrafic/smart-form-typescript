import styled from 'styled-components';
import FileInput from '@modules/core/design-system/FileInput';
import { useState } from 'react';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uploadFilesToDrive } from '../../services/googleDrive';
import { useOrderData } from '@modules/core/context/orderData';
import Input from '@modules/core/design-system/Input';
import Spinner from '@modules/core/design-system/Spinner';
import LegalCheckbox from '@modules/core/components/LegalCheckbox';
import Modal from '@modules/core/design-system/Modal';
import Lottie from 'react-lottie';
import carAnimation from '@assets/car-animation.json';
import processInputFile, { processFilesForSubmit, processOrderDataForSubmit } from '../../utils/formatter';
import { colors } from '@modules/core/utils/styles';

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
  margin-bottom: ${(props) => (props.$errorShown ? '30px' : '60px')};
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
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  background-color: ${colors.primaryColor} !important;
  border: none !important;
  border-radius: 5px !important;
  color: #fff !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  width: 120px !important;
`;
const BackButtonStyled = styled.button`
  padding: 10px 10px;
  border: 1px solid ${colors.primaryColor};
  border-radius: 5px;
  color: ${colors.primaryColor};
  background-color: white;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
  width: 120px;
`;

const ErrorWarning = styled.div`
  border: 2px solid ${colors.errorRed};
  border-radius: 3px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
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

const WaitText = styled.div`
  color: ${colors.black} !important;
  margin-top: 15px !important;
  font-size: 16px !important;
  text-align: center;
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: carAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function VehicleInputsDocuments({ setStep, step, documentsData, handleChange }) {
  const { orderData, updateOrderData } = useOrderData();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({
    permisoCirculacion: null,
    fichaTecnica: null,
    contratoCompr: null,
  });

  const [showErrorMessage, setShowErrorMessage] = useState({
    permisoCirculacion: false,
    fichaTecnica: false,
    contratoCompr: false,
  });

  const handlePermisoCirc = (file) => {
    setFiles((prevState) => ({
      ...prevState,
      permisoCirculacion: file,
    }));
    setShowErrorMessage((prevState) => ({
      ...prevState,
      permisoCirculacion: false,
    }));
  };

  const handleFichaTecnica = (file) => {
    setFiles((prevState) => ({
      ...prevState,
      fichaTecnica: file,
    }));
    setShowErrorMessage((prevState) => ({
      ...prevState,
      fichaTecnica: false,
    }));
  };

  const handleContratoCompr = (file) => {
    setFiles((prevState) => ({
      ...prevState,
      contratoCompr: file,
    }));
    setShowErrorMessage((prevState) => ({
      ...prevState,
      contratoCompr: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const allDocumentsInfo = { ...documentsData, documentsVehicle: files };
      const allData = { ...orderData, documents: allDocumentsInfo };
      updateOrderData((prev) => ({ ...prev, documents: allDocumentsInfo }));

      const processedFiles = await processFilesForSubmit(allDocumentsInfo);
      const processedData = allData?.documents?.vehiclePlate ? processOrderDataForSubmit(allData) : null;

      await uploadFilesToDrive(processedFiles, processedData);
      console.log('orderdata', orderData);
      setLoading(false);
      // window.location.href = `https://transferencia.autotrafic.es/gracias-documentacion/${orderData.orderId}`;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    setLoading(false);
  };

  const handleNextClick = () => {
    if (!files.permisoCirculacion && !files.fichaTecnica && !files.contratoCompr) {
      setShowErrorMessage({
        permisoCirculacion: true,
        fichaTecnica: true,
        contratoCompr: true,
      });
    }
    if (!files.permisoCirculacion) {
      setShowErrorMessage((prevState) => ({
        ...prevState,
        permisoCirculacion: true,
      }));
    }
    if (!files.fichaTecnica) {
      setShowErrorMessage((prevState) => ({
        ...prevState,
        fichaTecnica: true,
      }));
    }
    if (!files.contratoCompr) {
      setShowErrorMessage((prevState) => ({
        ...prevState,
        contratoCompr: true,
      }));
    }

    if (files.permisoCirculacion && files.fichaTecnica && files.contratoCompr) {
      setShowErrorMessage(false);
      handleChange((prev) => ({ ...prev, documentsVehicle: files }));
    }
  };

  const handleBackClick = () => {
    handleChange((prev) => ({ ...prev, documentGroup: step - 1 }));
    setStep(step - 1);
  };

  return (
    <InputsGroupStyled onSubmit={handleSubmit}>
      <ImageTypeMessage>*Sólo se aceptan archivos de tipo imagen y PDF</ImageTypeMessage>
      <InputsContainer
        $errorShown={
          showErrorMessage.permisoCirculacion || showErrorMessage.fichaTecnica || showErrorMessage.contratoCompr || ''
        }
      >
        <div>
          <InputsLabel>Permiso de circulación</InputsLabel>
          <FileInput
            id="permiso-circ"
            file={files.permisoCirculacion}
            handleFile={handlePermisoCirc}
            handleChangeFile={(e) =>
              handleChange((prev) => ({
                ...prev,
                permisoCirculacion: processInputFile(e.target.files[0], 'Permiso de circulacion'),
              }))
            }
          />
        </div>
        <div>
          <InputsLabel>Ficha técnica</InputsLabel>
          <FileInput
            id="ficha-tec"
            file={files.fichaTecnica}
            handleFile={handleFichaTecnica}
            handleChangeFile={(e) =>
              handleChange((prev) => ({
                ...prev,
                fichaTecnica: processInputFile(e.target.files[0], 'Ficha tecnica'),
              }))
            }
          />
        </div>
        <div>
          <InputsLabel>Contrato de compraventa</InputsLabel>
          <FileInput
            id="contrato-compr"
            file={files.contratoCompr}
            handleFile={handleContratoCompr}
            handleChangeFile={(e) =>
              handleChange((prev) => ({
                ...prev,
                contratoCompr: processInputFile(e.target.files[0], 'Contrato compraventa'),
              }))
            }
          />
        </div>

        <div>
          <InputsLabel>Matrícula</InputsLabel>
          <Input
            isVisible
            style={{ margin: 0 }}
            minLength="7"
            maxLength="8"
            required
            value={documentsData.vehiclePlate}
            handleChange={(e) =>
              handleChange((prev) => ({
                ...prev,
                vehiclePlate: e.target.value.toUpperCase(),
              }))
            }
          />
        </div>
      </InputsContainer>
      {showErrorMessage.permisoCirculacion && showErrorMessage.fichaTecnica && showErrorMessage.contratoCompr && (
        <ErrorWarning>
          <ExclamationIcon icon={faTriangleExclamation} />
          <ErrorWarningText>Por favor, adjunta todos los documentos requeridos.</ErrorWarningText>
        </ErrorWarning>
      )}
      {showErrorMessage.permisoCirculacion && !showErrorMessage.fichaTecnica && !showErrorMessage.contratoCompr && (
        <ErrorWarning>
          <ExclamationIcon icon={faTriangleExclamation} />
          <ErrorWarningText>Por favor, adjunta una imagen del permiso de circulación.</ErrorWarningText>
        </ErrorWarning>
      )}
      {showErrorMessage.fichaTecnica && !showErrorMessage.permisoCirculacion && !showErrorMessage.contratoCompr && (
        <ErrorWarning>
          <ExclamationIcon icon={faTriangleExclamation} />
          <ErrorWarningText>Por favor, adjunta una imagen de la ficha técnica.</ErrorWarningText>
        </ErrorWarning>
      )}
      {showErrorMessage.contratoCompr && !showErrorMessage.permisoCirculacion && !showErrorMessage.fichaTecnica && (
        <ErrorWarning>
          <ExclamationIcon icon={faTriangleExclamation} />
          <ErrorWarningText>Por favor, adjunta una imagen del contrato de compraventa.</ErrorWarningText>
        </ErrorWarning>
      )}
      <LegalCheckbox value={termsAccepted} handleChange={(e) => setTermsAccepted(e.target.checked)} />
      <BottomButtonsStyled>
        <BackButtonStyled type="button" onClick={handleBackClick}>
          Atrás
        </BackButtonStyled>
        <NextButtonStyled type="submit" onClick={handleNextClick}>
          {loading ? <Spinner /> : 'Finalizar'}
        </NextButtonStyled>
      </BottomButtonsStyled>
      {loading && (
        <Modal showModal={loading}>
          <WaitText>Espere por favor, éste proceso puede tardar varios segundos...</WaitText>
          <Lottie options={defaultOptions} height={260} width={260} />
        </Modal>
      )}
    </InputsGroupStyled>
  );
}
