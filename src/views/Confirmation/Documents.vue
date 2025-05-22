<script setup>
  import { useBookingStore } from '@/stores/booking';
  import Documents from '@/components/Documents/Documents.vue';
  import Guide from '@/components/Documents/Guide.vue';

  const store = useBookingStore();
  const { bookings } = store;
</script>

<template>
  <documents v-for="booking in bookings" :key="booking.orderId" :booking="booking" />
  <guide />
</template>
