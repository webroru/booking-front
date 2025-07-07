import apiClient from './apiClient';

export async function addPhotoApi(bookingId, data) {
  const formData = new FormData();
  formData.append('photo', data);

  return await apiClient.post(`/api/booking/${bookingId}/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

export async function removePhotoApi(bookingId, photoId) {
  return await apiClient.delete(`/api/booking/${bookingId}/photo/${photoId}`);
}
