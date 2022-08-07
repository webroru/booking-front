import { defineStore } from 'pinia';
import { reactive } from 'vue';

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
   * }}
   */
  const booking = reactive({});

  const setBooking = (newBooking) => {
    Object.assign(booking, newBooking);
  };

  const resetBooking = () => {
    Object.keys(booking).forEach(key => {
      delete booking[key]
    });
  };

  return { booking, setBooking, resetBooking };
});
