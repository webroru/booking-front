<script setup>
  import { useBookingStore } from '@/stores/booking';
  import TaxItem from '@/components/Tax/TaxItem.vue';

  const store = useBookingStore();
  const { bookings } = store;
</script>

<template>
  <TaxItem v-for="booking in bookings" :key="booking.orderId" :booking="booking" />
</template>
