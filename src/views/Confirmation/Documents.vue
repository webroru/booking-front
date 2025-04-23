<script setup>
  import { useBookingStore } from '@/stores/booking';
  import Documents from '@/components/Documents/Documents.vue';

  const store = useBookingStore();
  const { bookings } = store;
</script>

<template>
  <documents v-for="booking in bookings" :key="booking.orderId" :booking="booking" />
</template>
