<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';
  import Feedback from '@/components/Feedback.vue';

  const bookingStore = useBookingStore();
  const { booking, updateBooking } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
  const showFeedbackDialog = ref(false);
  const router = useRouter();

  const handleCheckout = async () => {
    booking.checkOut = true;
    await updateBooking(booking);
    await router.push('/');
  };
</script>

<template>
  <div v-html="info.checkoutInfo"></div>
  <el-row>
    <el-col :xs="24" :sm="16">
      <Feedback />
    </el-col>
  </el-row>
  <el-button type="primary" @click="handleCheckout">{{ $t('checkOutDetails.checkedOut') }}</el-button>

  <el-dialog v-model="showFeedbackDialog" :title="$t('checkOutDetails.feedback')" width="30%">
    <Feedback />
    <template #footer>
      <el-button @click="showFeedbackDialog = false">{{ $t('common.close') }}</el-button>
    </template>
  </el-dialog>
</template>
