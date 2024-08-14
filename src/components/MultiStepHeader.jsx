import "./styles.css";
import { useMultiStep } from "../context/multiStep";

function MultiStepHeader() {
  const { currentStep } = useMultiStep();

  return (
    <>
      <div class="multi-step">
        <ul class="multi-step-list">
          <li class={`multi-step-item ${currentStep === 1 && "current"}`}>
            <div class="item-wrap">
              <p class="item-title">1.</p>
              <p class="item-title">Vehículo</p>
            </div>
          </li>
          <li class={`multi-step-item ${currentStep === 2 && "current"}`}>
            <div class="item-wrap">
              <p class="item-title">2.</p>
              <p class="item-title">Precio</p>
            </div>
          </li>
          <li
            class={`multi-step-item ${
              (currentStep === 3 || currentStep === 4) && "current"
            }`}
          >
            <div class="item-wrap">
              <p class="item-title">3.</p>
              <p class="item-title">Pago</p>
            </div>
          </li>
          <li
            class={`multi-step-item ${
              (currentStep === 5 || currentStep === 6) && "current"
            }`}
          >
            <div class="item-wrap">
              <p class="item-title item-title-documents">4.</p>
              <p class="item-title item-title-documents">Documentos</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MultiStepHeader;
