import "./styles.css";
import { useMultiStep } from "../../context/multiStep";

function MultiStepHeader() {
  const { currentStep } = useMultiStep();

  return (
      <div className="multi-step">
        <ul className="multi-step-list">
          <li className={`multi-step-item ${currentStep === 1 && "current"}`}>
            <div className="item-wrap">
              <p className="item-title">1.</p>
              <p className="item-title">Vehículo</p>
            </div>
          </li>
          <li className={`multi-step-item ${currentStep === 2 && "current"}`}>
            <div className="item-wrap">
              <p className="item-title">2.</p>
              <p className="item-title">Precio</p>
            </div>
          </li>
          <li
            className={`multi-step-item ${
              (currentStep === 3 || currentStep === 4) && "current"
            }`}
          >
            <div className="item-wrap">
              <p className="item-title">3.</p>
              <p className="item-title">Pago</p>
            </div>
          </li>
          <li
            className={`multi-step-item ${
              (currentStep === 5 || currentStep === 6) && "current"
            }`}
          >
            <div className="item-wrap">
              <p className="item-title item-title-documents">4.</p>
              <p className="item-title item-title-documents">Documentos</p>
            </div>
          </li>
        </ul>
      </div>
  );
}

export default MultiStepHeader;
