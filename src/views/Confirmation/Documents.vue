<script setup>
  import { useBookingStore } from '@/stores/booking';
  import Documents from '@/components/Documents/Documents.vue';
  import Guide from '@/components/Documents/Guide.vue';

  const store = useBookingStore();
  const { bookings } = store;
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="24" :md="16">
      <guide />
    </el-col>
    <el-col :xs="24" :md="8">
      <documents v-for="booking in bookings" :key="booking.orderId" :booking="booking" />
    </el-col>
  </el-row>
</template>
