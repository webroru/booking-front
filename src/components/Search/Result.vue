<script setup>
  import { useBookingStore } from '@/stores/booking';
  
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    booking: Object,
  });
  const store = useBookingStore();
  const { setBooking } = store;
</script>

<template>
    <div>
      <el-link :underline="false" @click="setBooking(booking)">{{ booking.fullName }}, Booring Order № {{ booking.orderId }}</el-link>
    </div>
  <el-divider />
</template>
