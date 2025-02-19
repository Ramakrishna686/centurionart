import api from './api';

export const createPaymentSession = async (items) => {
  try {
    const response = await api.post('/create-checkout-session', { items });
    return response.data;
  } catch (error) {
    throw new Error('Payment session creation failed');
  }
};
