<script setup>
  import { ElMessageBox } from 'element-plus';
  import { useBookingStore } from '@/stores/booking';

  const bookingStore = useBookingStore();
  const { booking, updateBooking } = bookingStore;

  const open = () => {
    ElMessageBox.alert('.... The guide how to pay by Cashe...', 'Info', {
      confirmButtonText: 'OK',
    });

    booking.status = 'payByCashe';
    updateBooking(booking);
  };
</script>

<template>
  <el-link type="info" @click="open">I can't pay by Card</el-link>
</template>
