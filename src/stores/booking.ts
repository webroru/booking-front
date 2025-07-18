import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { searchBookingApi, updateBookingApi, sendMessageApi } from '@/api/booking';
import type { Booking } from '@/types/booking.ts';

export const useBookingStore = defineStore('booking', () => {
  const booking = reactive<Booking>({
    lastName: '',
    checkInDate: '',
    checkOutDate: '',
    phone: '',
    orderId: null,
    propertyName: '',
    room: null,
    unit: null,
    originalReferer: '',
    guestsAmount: null,
    passCode: null,
    debt: null,
    extraPerson: null,
    capacity: null,
    isRuleAccepted: false,
    checkIn: false,
    checkOut: false,
    paymentStatus: '',
    photos: [],
    groupId: null,
    invoiceItems: [],
    guests: [],
  });

  const bookings = reactive<Booking[]>([]);

  const setCurrentBooking = (newBooking: Booking): void => {
    Object.assign(booking, newBooking);
  };

  const setBookings = (newBookings: Booking[]): void => {
    bookings.splice(0);
    newBookings.forEach(b => bookings.push(b));
  };

  const searchBooking = async (searchString: string): Promise<Booking[]> => {
    return await searchBookingApi(searchString);
  };

  const updateBooking = async (updated: Booking): Promise<void> => {
    const response = await updateBookingApi(updated.orderId!, updated);
    bookings.forEach(b => {
      if (b.orderId === response.orderId) {
        Object.assign(b, response);
      }
    });
  };

  const resetBooking = (): void => {
    bookings.splice(0);
  };

  const sendMessage = async (orderId: number, text: string): Promise<void> => {
    await sendMessageApi(orderId.toString(), text);
  };

  return {
    booking,
    bookings,
    searchBooking,
    setCurrentBooking,
    setBookings,
    updateBooking,
    resetBooking,
    sendMessage,
  };
});
