import './stripe-checkout.css';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useMemo, useState } from 'react';
import { createPaymentIntent } from '../../services/stripe';
import LegalCheckbox from '@modules/core/components/LegalCheckbox';
import { Chat, MasterCardLogo, ShipmentTruck, Verified, VisaLogo } from '@assets/svgs';
import Separator from '@modules/core/design-system/Separator';
import Loader from '@modules/core/design-system/Loader';
import { useOrderData } from '@modules/core/context/orderData';
import { createTotalumOrder, registerOrder } from '@modules/core/services/order';
import { TRANSFERENCE_CAR_PRICE } from '@modules/core/utils/constants';
import { cardChecksInitialState } from '@modules/checkout/utils/initialStates';
import { CardChecks, StripeCardNumberElement, StripeElementEvent } from '@modules/checkout/interfaces';
import { sendConfirmationOrderEmail } from '@modules/core/utils/email';
import { sendSlackNotification, sendWhatsAppConfirmation } from '@modules/checkout/services/notifications';
import { logOrderPurchased } from '@modules/core/services/log';

const PAYMENT_METHOD = {
  KLARNA: 'klarna',
  CARD: 'card',
};

interface StripeCheckout {
  moveToNextStep: () => void;
  isBillDataFilled: boolean;
  setIsUserBillCompleted: (completed: boolean) => void;
}

function StripeCheckout({ moveToNextStep, isBillDataFilled, setIsUserBillCompleted }: StripeCheckout) {
  const { orderData } = useOrderData();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [cardChecks, setCardChecks] = useState<CardChecks>(cardChecksInitialState);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isPaymentLoading, setPaymentLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = orderData.prices.totalPrice || TRANSFERENCE_CAR_PRICE;

  const handleError = (event: StripeElementEvent) => {
    if (event.error) {
      setErrorMessage(event.error.message);
    } else {
      setErrorMessage('');
    }
    const { elementType, complete } = event;
    if (complete) {
      setCardChecks((prevState: CardChecks) => ({
        ...prevState,
        [elementType]: true,
      }));
    } else {
      setCardChecks((prevState: CardChecks) => ({
        ...prevState,
        [elementType]: false,
      }));
    }
  };

  const checkErrorBillData = () => {
    if (isBillDataFilled) {
      setErrorMessage('');
      return false;
    } else {
      setErrorMessage('Por favor, pulsa el botón Guardar en tus datos de facturación.');
      setPaymentLoading(false);
      return true;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (checkErrorBillData()) return;

      setPaymentLoading(true);

      const preparedPrice = +(totalPrice * 100).toFixed();
      const { fullName, email } = orderData.billData;
      const { phoneNumber } = orderData.vehicleForm;

      const userData = { fullName, email, phoneNumber };

      const clientSecret = await createPaymentIntent(preparedPrice, userData);
      await stripePayHandler(clientSecret);
    } catch (error: any) {
      setPaymentLoading(false);
      if (error.publicMessage) {
        setErrorMessage(error.publicMessage);
        setIsUserBillCompleted(false);
      }
    }
  };

  const stripePayHandler = async (clientSecret: string) => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardNumberElement) as StripeCardNumberElement;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (result.error) {
      setPaymentLoading(false);
      setErrorMessage(result.error.message ?? '');
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        const slackMessage = `✅ Se ha realizado un pedido por la web. ID: ${orderData.orderId} Tel: ${orderData.vehicleForm.phoneNumber}`;
        const registerOrderData = { ...orderData, paymentIntentId: result.paymentIntent.id };

        try {
          await registerOrder(registerOrderData);
          await createTotalumOrder(registerOrderData.orderId);
          await logOrderPurchased();
          await sendWhatsAppConfirmation(registerOrderData);
          await sendSlackNotification(slackMessage, 'orders');

          sendConfirmationOrderEmail(registerOrderData);
          setPaymentLoading(false);
          moveToNextStep();
        } catch (error) {
          console.error(error);
          await sendSlackNotification(`Error mientras paga el usuario por la web. Pago aceptado. ${error}`);
          setPaymentLoading(false);
          moveToNextStep();
        }
      } else if (result.paymentIntent.status === 'requires_payment_method') {
        const slackMessage = `No se ha podido realizar el pago de Stripe. Falta método de pago. \n----\n Client secret: ${clientSecret} \n--\n${JSON.stringify(
          {
            payment_method: {
              card,
            },
          }
        )}`;
        await sendSlackNotification(slackMessage)
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
          <CardNumberElement
            onChange={(event) => handleError(event)}
            options={{ placeholder: 'Número de tarjeta' }}
            className="stripe__card"
          />
          <CardExpiryElement
            onChange={(event) => handleError(event)}
            options={{ placeholder: 'Fecha de exp.' }}
            className="stripe__card stripe__card-expiry"
          />
          <CardCvcElement
            onChange={(event) => handleError(event)}
            options={{ placeholder: 'CVC / CVV' }}
            className="stripe__card stripe__card-cvc"
          />
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
