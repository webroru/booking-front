import apiClient from './apiClient';

export async function searchBookingApi(string) {
  return await apiClient.get(`/api/booking?searchString=${string}`);
}

export async function updateBookingApi(orderId, data) {
  return await apiClient.put(`/api/booking/${orderId}`, data);
}

export async function cancelBookingApi(orderId) {
  return await apiClient.put(`/api/booking/${orderId}/cancel`);
}

export async function sendMessageApi(orderId, message) {
  return await apiClient.post(`/api/booking/${orderId}/message`, { message });
}
