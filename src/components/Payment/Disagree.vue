<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';

  const bookingStore = useBookingStore();
  const { bookings, cancelBooking } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
  const show = ref(false);
  const checked = ref(false);
  const router = useRouter();

  const handle = () => {
    if (bookings.every(booking => booking.paymentStatus !== 'paid') && checked.value) {
      bookings.foreach(booking => cancelBooking(booking.orderId));
      router.push('/');
    }
  };

  const cancel = () => {
    bookings.forEach(booking => {
      booking.paymentStatus = checked.value ? 'cancel' : '';
    });
  };
</script>
``
<template>
  <el-link type="info" @click="show = true">{{ $t('payment.disagree') }}</el-link>
  <el-dialog v-model="show" :title="$t('payment.disagreeHeader')" width="30%" @close="handle">
    <div v-html="info.paymentDisagree"></div>
    <div>
      <el-checkbox v-model="checked"
        @change="cancel" :label="$t('payment.cancelAgree')" size="large" />
    </div>

    <template #footer>
      <el-button @click="show.value = false">{{ $t('common.close') }}</el-button>
    </template>
  </el-dialog>
</template>
