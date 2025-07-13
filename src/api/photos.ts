import apiClient from './apiClient';

export async function addPhotoApi(bookingId: number, photoBlob: File): Promise<{ id: number }> {
  const formData = new FormData();
  formData.append('photo', photoBlob);

  const response = await apiClient.post<{ id: number }> (
      `/api/booking/${bookingId}/photo`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
  );

  return response.data;
}

export async function removePhotoApi(bookingId: number | string, photoId: number | string): Promise<void> {
  await apiClient.delete(`/api/booking/${bookingId}/photo/${photoId}`);
}
