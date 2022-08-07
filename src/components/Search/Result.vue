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
  <el-descriptions :title="booking.fullName" @click="setBooking(booking)" border :column="3" class="item">
    <el-descriptions-item label="Property">{{ booking.propertyName }}</el-descriptions-item>
    <el-descriptions-item label="Room">{{ booking.room }}</el-descriptions-item>
    <el-descriptions-item label="Check-in">{{ booking.checkInDate }}</el-descriptions-item>
    <el-descriptions-item label="Check-out">{{ booking.checkOutDate }}</el-descriptions-item>
    <el-descriptions-item label="Original Referrer">{{ booking.originalReferrer }}</el-descriptions-item>
  </el-descriptions>
  <el-divider />
</template>
