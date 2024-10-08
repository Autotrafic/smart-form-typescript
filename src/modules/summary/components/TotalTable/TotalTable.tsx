import './total-table.css';
import { Fragment, useState } from 'react';
import { CICLOMOTOR_SUMMARY_ITEMS, CROSS_PRODUCTS, DEFAULT_SUMMARY_ITEMS } from '../../utils/constants';
import { TRANSFERENCE_CAR_PRICE, TRANSFERENCE_CICLOMOTOR_PRICE } from '@modules/core/utils/constants';
import Modal from '@modules/core/design-system/Modal';
import SummaryModalContent from '../SummaryModalContent';
import { useOrderData } from '@modules/core/context/orderData';
import Checkbox from '@modules/core/design-system/Checkbox';
import { checkIsCiclomotor } from '@modules/core/utils/functions';
import { CrossProduct, CrossSelected } from '@modules/summary/interfaces';

interface TotalTableProps {
  withExtras: boolean;
  addedPrice: number;
  setAddedPrice: (p: (prevState: number) => number) => void;
  setCrossSelected: (p: (prevState: CrossSelected) => CrossSelected) => void;
  isReferralValid: boolean;
}

export default function TotalTable({
  withExtras,
  addedPrice,
  setAddedPrice,
  setCrossSelected,
  isReferralValid,
}: TotalTableProps) {
  const { orderData } = useOrderData();

  const vehicleData = orderData.vehicleForm;
  const isCiclomotor = checkIsCiclomotor(vehicleData);
  const itp = orderData.itp;
  const feeForHighTicketOrder = orderData.prices.highTicketOrderFee;

  const [showModal, setShowModal] = useState(false);

  const handleProduct = (e: React.ChangeEvent<HTMLInputElement>, product: CrossProduct) => {
    const { id: productId, price: productPrice } = product;
    setCrossSelected((prev: CrossSelected) => ({ ...prev, [productId]: e.target.checked }));

    if (e.target.checked) {
      setAddedPrice((prevState: number) => prevState + productPrice);
    } else if (!e.target.checked && addedPrice) {
      setAddedPrice((prevState: number) => prevState - productPrice);
    }
  };

  return (
    <Fragment>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <SummaryModalContent orderData={orderData} />
      </Modal>
      <div className="total-transfer">
        <div className="total-transfer__header">
          <p className="total-transfer__title">Cambio de nombre:</p>
          <p className="total-transfer__price">
            {isCiclomotor
              ? `${TRANSFERENCE_CICLOMOTOR_PRICE} €`
              : `${(TRANSFERENCE_CAR_PRICE + feeForHighTicketOrder).toFixed(2)} €`}
          </p>
        </div>
        <ul className="total-transfer__items-container">
          <p className="section-title">Incluye:</p>
          {(isCiclomotor ? CICLOMOTOR_SUMMARY_ITEMS : DEFAULT_SUMMARY_ITEMS)?.map(({ name, price }) => {
            if (name === 'Gestión') price += feeForHighTicketOrder;

            return (
              <li key={name} className="total-transfer__subitem-container">
                <span className="total-transfer__item">{`${name}`}&nbsp;</span>
                <span className="total-transfer__item">{`- ${price.toFixed(2)} €`}</span>
              </li>
            );
          })}
          <li className="total-transfer__subitem-container">
            <span className="total-transfer__item">Envío a domicilio&nbsp;</span>
            <span className="total-transfer__item">- Gratuito</span>
          </li>
          <li className="total-transfer__header-spaced">
            <div className="total-transfer__item-wrapper">
              <span className="total-transfer__item-important">Impuesto de transmisiones&nbsp;</span>
              <span className="modal__link" onClick={() => setShowModal((prevState) => !prevState)}>
                Saber más
              </span>
            </div>

            <p className="total-transfer__price">{itp.ITP} &nbsp;€</p>
          </li>
          {withExtras && (
            <Fragment>
              <div className="total-transfer__line-wide" />
              <div className="total-transfer__cross-selling">
                <p className="section-title">Te recomendamos añadir:</p>
                {CROSS_PRODUCTS.map((product: CrossProduct) => (
                  <li className="total-transfer__item-container">
                    <label htmlFor={product.title} className="total-transfer__product-label">
                      <Checkbox
                        id={product.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProduct(e, product)}
                      />
                      <span className="total-transfer__product-name">{product.title}</span>
                    </label>
                    <span className="total-transfer__item">{`${product.price} €`}</span>
                  </li>
                ))}
              </div>
            </Fragment>
          )}
          <div className="total-transfer__line" />
          {isReferralValid && (
            <li className="total-transfer__item-container-price discount-title">
              <span className="total-transfer__total">Promoción HistorialVehículo</span>
              <span className="total-transfer__total">- 10€</span>
            </li>
          )}

          <li className="total-transfer__item-container-price">
            <span className="total-transfer__total-main">Total</span>
            <div className="total-transfer__total-wrapper">
              {isReferralValid && (
                <div className="discount-number-wrapper">
                  <div className="discount-crossline" />
                  <span className="total-transfer__total">{`${(+orderData?.prices?.totalPrice + addedPrice + 10).toFixed(
                    2
                  )} €`}</span>
                </div>
              )}
              <span className="total-transfer__total-number">{`${(+orderData?.prices?.totalPrice + addedPrice).toFixed(
                2
              )} €`}</span>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}
