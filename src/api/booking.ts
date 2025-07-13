import apiClient from './apiClient';
import type { Booking } from '@/interfaces/booking.ts';

interface MessageResponse {
  success: boolean;
}

export async function searchBookingApi(searchString: string): Promise<Booking[]> {
  const response = await apiClient.get<Booking[]>(`/api/booking?searchString=${encodeURIComponent(searchString)}`);
  return response.data;
}

export async function updateBookingApi(orderId: string, data: Partial<Booking>): Promise<Booking> {
  const response = await apiClient.put<Booking>(`/api/booking/${orderId}`, data);
  return response.data;
}

export async function sendMessageApi(orderId: string, message: string): Promise<MessageResponse> {
  const response = await apiClient.post<MessageResponse>(`/api/booking/${orderId}/message`, { message });
  return response.data;
}
