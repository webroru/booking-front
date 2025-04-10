import apiClient from '@/stores/api/apiClient';

export async function searchBookingApi(string) {
  return await apiClient.get(`/api/booking?searchString=${string}`);
}

export async function updateBookingApi(orderId, data) {
  return await apiClient.post(`/api/booking/${orderId}`, data);
}

export async function acceptRuleApi(orderId, isRuleAccepted) {
  return await apiClient.post(`/api/acceptRule`, { orderId, isRuleAccepted });
}

export async function checkInApi(orderId, checkIn) {
  return await apiClient.put(`/api/booking/${orderId}/check-in`, { checkIn });
}

export async function checkOutApi(orderId) {
  return await apiClient.put(`/api/booking/${orderId}/check-out`);
}

export async function updateGuestsApi(orderId, data) {
  return await apiClient.put(`/api/booking/${orderId}/guests`, data);
}

export async function payByCashApi(orderId, isPayByCash) {
  return await apiClient.put(`/api/booking/${orderId}/pay-by-cash`, { isPayByCash });
}

export async function cancelBookingApi(orderId) {
  return await apiClient.put(`/api/booking/${orderId}/cancel`);
}

export async function sendMessageApi(orderId, message) {
  return await apiClient.post(`/api/booking/${orderId}/message`, { message });
}
