import './styles.css';
import { useMultiStep } from '../../context/multiStep';
import { Steps } from '@modules/core/interfaces/enums';

function MultiStepHeader() {
  const { currentStep } = useMultiStep();

  return (
    <div className="multi-step">
      <ul className="multi-step-list">
        <li className={`multi-step-item ${currentStep === Steps.VEHICLE_FORM && 'current'}`}>
          <div className="item-wrap">
            <p className="item-title">1.</p>
            <p className="item-title">Vehículo</p>
          </div>
        </li>
        <li className={`multi-step-item ${currentStep === Steps.SUMMARY && 'current'}`}>
          <div className="item-wrap">
            <p className="item-title">2.</p>
            <p className="item-title">Precio</p>
          </div>
        </li>
        <li className={`multi-step-item ${currentStep === Steps.CHECKOUT && 'current'}`}>
          <div className="item-wrap">
            <p className="item-title">3.</p>
            <p className="item-title">Pago</p>
          </div>
        </li>
        <li className={`multi-step-item ${currentStep === Steps.CHECKOUT_MESSAGE && 'current'}`}>
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
