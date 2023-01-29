import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { updateBookingApi, acceptRuleApi, updateGuestsApi } from './api/booking';

export const useBookingStore = defineStore('booking', () => {

  /**
   * @type {{
   *   fullName: string,
   *   checkInDate: string,
   *   checkOutDate: string,
   *   phone: string,
   *   orderId: number,
   *   propertyName: string,
   *   room: number,
   *   originalReferrer: string,
   *   guestsAmount: number,
   *   adults: number,
   *   children: number,
   *   babies: number,
   *   passCode: number,
   *   debt: number,
   *   extraPerson: number,
   *   capacity: number,
   *   overmax: number,
   *   extraGuests: number,
   *   isRuleAccepted,
   *   checkIn: bool,
   *   status: string,
   * }}
   */
  const booking = reactive({});

  const setBooking = (newBooking) => {
    Object.assign(booking, newBooking);
  };

  const updateBooking = (booking) => {
    setBooking(booking);
    updateBookingApi(booking);
  };

  const acceptRule = (orderId, isRuleAccepted) => {
    acceptRuleApi(orderId, isRuleAccepted);
  };

  const updateGuests = (booking) => {
    setBooking(booking);
    updateGuestsApi(booking.orderId, booking);
  };

  const resetBooking = () => {
    Object.keys(booking).forEach(key => {
      delete booking[key];
    });
  };

  return { booking, setBooking, updateBooking, resetBooking, acceptRule, updateGuests };
});
