import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { searchBookingApi, updateBookingApi, acceptRuleApi, updateGuestsApi, payByCashApi, checkInApi, cancelBookingApi, sendMessageApi, checkOutApi } from '@/api/booking';

export const useBookingStore = defineStore('booking', () => {

  const booking = reactive({
    lastName: '',
    checkInDate: '',
    checkOutDate: '',
    phone: '',
    orderId: null,
    propertyName: '',
    room: null,
    originalReferer: '',
    guestsAmount: null,
    adults: null,
    children: null,
    babies: null,
    passCode: null,
    debt: null,
    extraPerson: null,
    capacity: null,
    overmax: null,
    isRuleAccepted: false,
    checkIn: false,
    paymentStatus: '',
    lessDocs: false,
    photos: [],
    groupId: null,
    invoiceItems: [],
    guests: [],
  });

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
    return (await searchBookingApi(string)).data;
  };

  const updateBooking = async (orderId, booking) => {
    await updateBookingApi(orderId, booking);
  };

  const acceptRule = (isRuleAccepted) => {
    bookings.forEach(async booking => {
      booking.isRuleAccepted = isRuleAccepted;
      await acceptRuleApi(booking.orderId, isRuleAccepted);
    });
  };

  const checkIn = async (orderId, checkIn) => {
    await checkInApi(orderId, checkIn);
  };

  const checkOut = async (orderId) => {
    await checkOutApi(orderId);
  };

  const updateGuests = async (booking) => {
    const newBooking = await updateGuestsApi(booking.orderId, booking);
    setBooking(newBooking);
  };

  const payByCash = async (orderId, isPayByCash) => {
    await payByCashApi(orderId, isPayByCash);
  };

  const resetBooking = () => {
    bookings.splice(0);
  };

  const cancelBooking = async (orderId) => {
    await cancelBookingApi(orderId);
  };

  const sendMessage = async (orderId, text) => {
    await sendMessageApi(orderId, text);
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
