<script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';

  const bookingStore = useBookingStore();
  const { booking, payByCash } = bookingStore;
  const infoStore = useInfoStore();
  const { t } = useI18n();
  const { info } = infoStore;
  const message = `${t('payment.debt', { debt: booking.debt })}. ${info.cashPaymentInstruction}`;
  const show = ref(false);
  const checked = ref(false);

  const handle = () => {
    if (booking.paymentStatus !== 'paid') {
      booking.paymentStatus = checked.value ? 'payByCash' : '';
      payByCash(booking.orderId, booking.paymentStatus === 'payByCash');
    }
  };
</script>

<template>
  <el-link type="info" @click="show = true">{{ $t('payment.cash') }}</el-link>
  <el-dialog v-model="show" :title="$t('payment.payByCash')" width="30%">
    <div v-html="message"></div>
    <div>
      <el-checkbox v-model="checked"
        @change="handle" :label="$t('payment.cashAgree')" size="large" />
    </div>

    <template #footer>
      <el-button @click="show = false">{{ $t('common.close') }}</el-button>
    </template>
  </el-dialog>
</template>
