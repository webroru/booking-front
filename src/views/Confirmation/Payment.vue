<script setup>
  import { useBookingStore } from '@/stores/booking';
  import Payment from '@/components/Payment/Payment.vue';
  import Invoice from '@/components/Payment/Invoice.vue';

  const bookingStore = useBookingStore();
  const { bookings } = bookingStore;
</script>

<template>
  <invoice v-for="booking in bookings" :key="booking.orderId" :booking="booking" />
  <payment />
</template>
