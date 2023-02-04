<script setup>
  import { ElMessageBox } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';

  const bookingStore = useBookingStore();
  const { booking, payByCash } = bookingStore;
  const infoStore = useInfoStore();
  const { t } = useI18n();
  const { info } = infoStore;
  const message = `${t('payment.debt', { debt: booking.debt })}. ${info.cashPaymentInstruction}`;

  const open = () => {
    ElMessageBox.alert(message, 'Info', {
      confirmButtonText: 'OK',
      dangerouslyUseHTMLString: true,
    });

    booking.paymentStatus = 'payByCash';
    payByCash(booking.orderId);
  };
</script>

<template>
  <el-link type="info" @click="open">{{ $t('payment.cash') }}</el-link>
</template>
