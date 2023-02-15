import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { updateBookingApi, acceptRuleApi, updateGuestsApi, payByCashApi, checkInApi, cancelBookingApi, sendMessageApi, checkOutApi } from './api/booking';

export const useBookingStore = defineStore('booking', () => {

  /**
   * @type {{
   *   firstName: string,
   *   lastName: string,
   *   checkInDate: string,
   *   checkOutDate: string,
   *   phone: string,
   *   orderId: number,
   *   propertyName: string,
   *   room: number,
   *   originalReferer: string,
   *   guestsAmount: number,
   *   adults: number,
   *   children: number,
   *   babies: number,
   *   passCode: number,
   *   debt: number,
   *   extraPerson: number,
   *   capacity: number,
   *   overmax: number,
   *   isRuleAccepted,
   *   checkIn: bool,
   *   paymentStatus: string,
   *   lessDocs: bool,
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

  const checkIn = (orderId, checkIn) => {
    checkInApi(orderId, checkIn);
  };

  const checkOut = (orderId) => {
    checkOutApi(orderId);
  };

  const updateGuests = (booking) => {
    setBooking(booking);
    updateGuestsApi(booking.orderId, booking);
  };

  const payByCash = (orderId, isPayByCash) => {
    payByCashApi(orderId, isPayByCash);
  };

  const resetBooking = () => {
    Object.keys(booking).forEach(key => {
      delete booking[key];
    });
  };

  const cancelBooking = (orderId) => {
    cancelBookingApi(orderId);
  };

  const sendMessage = (orderId, text) => {
    sendMessageApi(orderId, text);
  };

  return { booking, setBooking, updateBooking, resetBooking, acceptRule, updateGuests, payByCash, checkIn, cancelBooking, sendMessage, checkOut };
});
