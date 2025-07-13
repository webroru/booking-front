import apiClient from './apiClient';
import type { Info } from '@/interfaces/info.ts';

export async function getInfoApi(locale: string): Promise<Info> {
  const response =  await apiClient.get<Info>('/api/info', {
    headers: {
      'Accept-Language': locale,
    },
  });

  return response.data;
}

export async function sendToEmailApi(bookingIds: string[], email: string): Promise<void> {
  return await apiClient.post('/api/send-to-email', { bookingIds, email });
}
