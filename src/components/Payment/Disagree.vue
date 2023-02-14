<script setup>
  import { ref, defineEmits } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';

  const bookingStore = useBookingStore();
  const { booking, cancelBooking } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
  const show = ref(false);
  const checked = ref(false);
  const emit = defineEmits(['backToInitial']);

  const handle = () => {
    if (booking.paymentStatus !== 'paid' && checked.value) {
      cancelBooking(booking.orderId);
      emit('backToInitial');
    }
  };
</script>

<template>
  <el-link type="info" @click="show = true">{{ $t('payment.disagree') }}</el-link>
  <el-dialog v-model="show" :title="$t('payment.disagreeHeader')" width="30%" @close="handle">
    <div v-html="info.paymentDisagree"></div>
    <div>
      <el-checkbox v-model="checked"
        @change="booking.paymentStatus = checked.value ? 'cancel' : ''" :label="$t('payment.cancelAgree')" size="large" />
    </div>

    <template #footer>
      <el-button @click="show.value = false">{{ $t('common.close') }}</el-button>
    </template>
  </el-dialog>
</template>
