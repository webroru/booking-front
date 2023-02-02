<script setup>
  import { ElMessageBox } from 'element-plus';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';

  const bookingStore = useBookingStore();
  const { booking, payByCash } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;

  const open = () => {
    ElMessageBox.alert(info.cashPaymentInstruction, 'Info', {
      confirmButtonText: 'OK',
      dangerouslyUseHTMLString: true,
    });

    booking.paymentStatus = 'payByCash';
    payByCash(booking.orderId);
  };
</script>

<template>
  <el-link type="info" @click="open">I can't pay by Card</el-link>
</template>
