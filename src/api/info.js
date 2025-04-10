import apiClient from './apiClient';

export async function getInfoApi (locale) {
  return await apiClient.get('/api/info', {
    headers: {
      'Accept-Language': locale,
    },
  });
}

export async function sendToEmailApi (bookingIds, email) {
  return await apiClient.post('/api/send-to-email', {bookingIds, email});
}
