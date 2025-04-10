import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { searchBookingApi, updateBookingApi, acceptRuleApi, updateGuestsApi, payByCashApi, checkInApi, cancelBookingApi, sendMessageApi, checkOutApi } from './api/booking';

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
   *   checkIn: boolean,
   *   paymentStatus: string,
   *   lessDocs: boolean,
   *   photos: Array,
   *   groupId: number,
   *   invoiceItems: Array,
   *   guests: Array,
   * }}
   */
  const booking = reactive({});

  const bookings = reactive([]);

  const setBooking = (newBooking) => {
    bookings.forEach(booking => {
      if (booking.orderId === newBooking.orderId) {
        Object.assign(booking, newBooking);
      }
    });
  };

  const setBookings = (newBookings) => {
    bookings.splice(0);
    newBookings.forEach(booking => bookings.push(booking));
  };

  const searchBooking = async (string) => {
    return await searchBookingApi(string);
  };

  const updateBooking = async (orderId, booking) => {
    //setBooking(booking);
    await updateBookingApi(orderId, booking);
  };

  const acceptRule = (isRuleAccepted) => {
    bookings.forEach(booking => {
      booking.isRuleAccepted = isRuleAccepted;
      acceptRuleApi(booking.orderId, isRuleAccepted);
    });
  };

  const checkIn = (orderId, checkIn) => {
    checkInApi(orderId, checkIn);
  };

  const checkOut = (orderId) => {
    checkOutApi(orderId);
  };

  const updateGuests = async (booking) => {
    const newBooking = await updateGuestsApi(booking.orderId, booking);
    setBooking(newBooking);
  };

  const payByCash = (orderId, isPayByCash) => {
    payByCashApi(orderId, isPayByCash);
  };

  const resetBooking = () => {
    bookings.splice(0);
  };

  const cancelBooking = (orderId) => {
    cancelBookingApi(orderId);
  };

  const sendMessage = (orderId, text) => {
    sendMessageApi(orderId, text);
  };

  return {
    booking,
    bookings,
    searchBooking,
    setBooking,
    setBookings,
    updateBooking,
    resetBooking,
    acceptRule,
    updateGuests,
    payByCash,
    checkIn,
    cancelBooking,
    sendMessage,
    checkOut,
  };
});
