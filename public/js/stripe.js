import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { showAlert } from './alert';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51RzYMVDWt47WmjXIftKo1YWaz8YcIJDdaJnvB8EuzWbtxMa9Hau2XLPohvFxLhDzKtQbLStPW0nX2UVnc4ViMKif00Ulos2MZT'
    );
  }
  return stripePromise;
};

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v2/bookings/checkout-session/${tourId}`
    );

    const stripe = await getStripe();
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
