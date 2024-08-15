import SellerInputsDocuments from "./SellerInputsDocuments";
import BuyerInputsDocuments from "./BuyerInputsDocuments";
import VehicleInputsDocuments from "./VehicleInputsDocuments";

export default function InputsGroupDocuments({
  setStep,
  step,
  documentsData,
  handleChange,
  setIsDocumentsLaterOpen,
}) {
  return (
    <>
      {step === 1 && (
        <SellerInputsDocuments
          setStep={setStep}
          step={step}
          documentsData={documentsData}
          handleChange={handleChange}
          setIsDocumentsLaterOpen={setIsDocumentsLaterOpen}
        />
      )}
      {step === 2 && (
        <BuyerInputsDocuments
          setStep={setStep}
          step={step}
          documentsData={documentsData}
          handleChange={handleChange}
        />
      )}

      {step === 3 && (
        <VehicleInputsDocuments
          setStep={setStep}
          step={step}
          documentsData={documentsData}
          handleChange={handleChange}
        />
      )}
    </>
  );
}
