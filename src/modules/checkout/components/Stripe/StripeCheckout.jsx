import "./stripe-checkout.css";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";
import { createPaymentIntent } from "../../services/stripeService";
import LegalCheckbox from "../../../core/components/LegalCheckbox";
import { Chat, MasterCardLogo, ShipmentTruck, Verified, VisaLogo } from "../../../../assets/svgs";
import Separator from "../../../core/design-system/Separator";
import Loader from "../../../core/design-system/Loader";
import { useOrderData } from "../../../core/context/orderData";
import { registerOrder } from "../../../core/services/orderService";
import { TRANSFERENCE_CAR_PRICE } from "../../../core/utils/constants";

const PAYMENT_METHOD = {
  KLARNA: "klarna",
  CARD: "card",
};

function StripeCheckout({ moveToNextStep, billDataFilled }) {
  const { orderData } = useOrderData();

  const [errorMessage, setErrorMessage] = useState("");
  const [cardChecks, setCardChecks] = useState({
    cardExpiry: false,
    cardNumber: false,
    cardCvc: false,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = orderData?.prices?.totalPrice || TRANSFERENCE_CAR_PRICE;

  const handleError = (event) => {
    if (event?.error) {
      setErrorMessage(event.error.message);
    } else {
      setErrorMessage("");
    }
    const { elementType, complete } = event;
    if (complete) {
      setCardChecks((prevState) => ({
        ...prevState,
        [elementType]: true,
      }));
    } else {
      setCardChecks((prevState) => ({
        ...prevState,
        [elementType]: false,
      }));
    }
  };

  const checkErrorBillData = () => {
    if (billDataFilled) {
      setErrorMessage("");
      return false;
    } else {
      setErrorMessage("Por favor, pulsa el botón Guardar en tus datos de facturación.");
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (checkErrorBillData()) return;

    setPaymentLoading(true);

    const preparedPrice = +(totalPrice * 100).toFixed();
    const { fullName, email } = orderData.billData;
    const {phoneNumber} = orderData.vehicleForm;

    const userData = { fullName, email, phoneNumber };

    const { clientSecret } = await createPaymentIntent(preparedPrice, userData);
    await stripePayHandler(clientSecret);
  };

  const stripePayHandler = async (clientSecret) => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardNumberElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (result.error) {
      setPaymentLoading(false);
      setErrorMessage(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        await registerOrder(orderData);
        setPaymentLoading(false);
        moveToNextStep();
      }
    }
  };

  const disableButton = useMemo(() => {
    const { cardExpiry, cardNumber, cardCvc } = cardChecks;
    return !(cardExpiry && cardNumber && cardCvc);
  }, [cardChecks.cardCvc, cardChecks.cardExpiry, cardChecks.cardNumber]);

  return (
    <div className="stripe-container">
      <form className="stripe-box" onSubmit={onSubmit}>
        <div className="stripe-box__banner">
          <span className="stripe-box__banner-logos">
            <Verified />
            <p className="stripe-box__banner-logos-text">Garantía de devolución</p>
          </span>
          <span className="stripe-box__banner-logos">
            <ShipmentTruck />
            <p className="stripe-box__banner-logos-text">Envío gratuito</p>
          </span>
          <span className="stripe-box__banner-logos">
            <Chat />
            <p className="stripe-box__banner-logos-text">Atención 24/7</p>
          </span>
        </div>
        <Separator isWide />
        <div className="stripe-title">
          <span>
            <input
              checked
              className="stripe-box__radio"
              id={`${PAYMENT_METHOD.CARD}-label`}
              type="radio"
              aria-label={`${PAYMENT_METHOD.CARD}-label`}
            />
            <span>Tarjeta de crédito:</span>
          </span>
          <div className="card-type-container">
            <MasterCardLogo width={45} height={25} />
            <VisaLogo width={45} height={25} />
          </div>
        </div>
        <span className="stripe-box__card-payment">
          <CardNumberElement onChange={(event) => handleError(event)} options={{ placeholder: "Número de tarjeta" }} className="stripe__card" />
          <CardExpiryElement
            onChange={(event) => handleError(event)}
            options={{ placeholder: "Fecha de exp." }}
            className="stripe__card stripe__card-expiry"
          />
          <CardCvcElement onChange={(event) => handleError(event)} options={{ placeholder: "CVC / CVV" }} className="stripe__card stripe__card-cvc" />
          {errorMessage && (
            <div className="stripe__error-container">
              <span className="stripe__error-message">{errorMessage}</span>
            </div>
          )}
          <LegalCheckbox value={termsAccepted} handleChange={(e) => setTermsAccepted(e.target.checked)} />
        </span>

        <div className="stripe__button-container">
          <button disabled={isPaymentLoading || disableButton} className="checkout-button" type="submit">
            {isPaymentLoading ? <Loader /> : `Tramitar  ${totalPrice} €`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StripeCheckout;
