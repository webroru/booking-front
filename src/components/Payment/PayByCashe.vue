<script setup>
  import { ElMessageBox } from 'element-plus';
  import { useBookingStore } from '@/stores/booking';

  const bookingStore = useBookingStore();
  const { booking, payByCash } = bookingStore;

  const open = () => {
    ElMessageBox.alert('.... The guide how to pay by Cashe...', 'Info', {
      confirmButtonText: 'OK',
    });

    booking.paymentStatus = 'payByCashe';
    payByCash(booking.orderId);
  };
</script>

<template>
  <el-link type="info" @click="open">I can't pay by Card</el-link>
</template>
