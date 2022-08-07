<script setup>
  import { useBookingStore } from '@/stores/booking';

  const store = useBookingStore();
  const booking = store.booking;
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Property: {{ booking.propertyName }}</span>
        <span style="white-space: nowrap;">Room: {{ booking.room }}</span>
      </div>
    </template>
    <div class="text item">Check-in: {{ booking.checkInDate }}</div>
    <div class="text item">Check-out: {{ booking.checkOutDate }}</div>
    <div class="text item">Full Name: {{ booking.fullName }}</div>
    <div class="text item">Original Referrer: {{ booking.originalReferrer }}</div>
  </el-card>
</template>

<style scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
</style>
