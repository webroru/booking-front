<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';

  const props = defineProps({
    debt: String,
  });

  const bookingStore = useBookingStore();
  const { bookings, updateBooking } = bookingStore;
  const infoStore = useInfoStore();
  const { t } = useI18n();
  const { info } = infoStore;
  const message = computed(()=> `${t('payment.debt', { debt: props.debt })}. ${info.cashPaymentInstruction}`);
  const show = ref(false);
  const checked = ref(false);

  const handle = () => {
    if (bookings.every(booking => booking.paymentStatus !== 'paid')) {
      bookings.forEach(async booking => {
        booking.paymentStatus = checked.value ? 'paid by cash' : '';
        await updateBooking(booking.orderId, booking);
      });
    }
  };
</script>

<template>
  <el-button type="primary"  @click="show = true">{{ $t('payment.cash') }}</el-button>
  <el-dialog v-model="show" :title="$t('payment.payByCash')">
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

<style>
@media only screen and (max-width: 768px) {
  .el-dialog {
    --el-dialog-width: 100%;
  }
}
</style>
